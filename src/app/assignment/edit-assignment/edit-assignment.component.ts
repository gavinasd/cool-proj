import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Assignment} from "../../models/assignments/Assignment";
import {AssignmentService} from "../../services/assignment.service";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {CreateAssignmentDialogComponent} from "../../shared/view/dialogs/create-assignment-dialog/create-assignment-dialog.component";
import {AddQuestionDialogComponent} from "../../shared/view/dialogs/add-question-dialog/add-question-dialog.component";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
    assignmentList:Assignment[];
    selectAssignmentId:string = '';

	constructor(public assignmentService:AssignmentService, private router:Router,private dialog: MdDialog) {
	}

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList:Assignment[])=>{
			this.assignmentList = assignmentList;
		});
	}

	selectAssignment(assignmentId:string){
	    this.selectAssignmentId = assignmentId;
    }

    openCreateAssignmentDialog(){
	    let config = new MdDialogConfig();
	    config.width = '400px';
	    this.dialog.open(CreateAssignmentDialogComponent, config).afterClosed()
		    .filter(result => !!result)
		    .subscribe(data => {
			    this.createAssignment(data);
		    });
    }

    openAddQuestionDialog(){
	    let config = new MdDialogConfig();
	    config.width = '400px';
	    this.dialog.open(AddQuestionDialogComponent, config).afterClosed()
		    .filter(result => !!result)
		    .subscribe(data => {
			    this.addQuestionGroupToAssignment(data);
		    });
    }

    createAssignment(form:any){
		const assignmentName = form.assignmentName;
		const assignmentType = form.type;

		this.assignmentService.createAssignment(assignmentName, assignmentType)
			.subscribe((newAssignment:Assignment)=>{
				this.assignmentList.push(newAssignment);
			});
    }

	addQuestionGroupToAssignment(form:any){
		this.assignmentService.addQuestionGroupToAssignment(this.selectAssignmentId, form.type)
			.subscribe((questionGroup:QuestionGroup)=>{
				let group = new QuestionGroup(questionGroup);
				this.router.navigate(['/question/edit/' + this.selectAssignmentId
							+ '/' + group.id + '/' + group.type]);
		});
    }

}
