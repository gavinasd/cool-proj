import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Assignment} from "../models/assignments/Assignment";
import {AssignmentService} from "../core/services/assignment.service";
import {QuestionGroup} from "../models/Questions/QuestionGroup";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateAssignmentDialogComponent} from "../shared/view/dialogs/create-assignment-dialog/create-assignment-dialog.component";
import {filter} from "rxjs/operators";
import {AddTpoReadingGroupDialogComponent} from "./dialogs/add-tpo-reading-group-dialog/add-tpo-reading-group-dialog.component";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
    assignmentList:Assignment[];
    selectAssignmentId:string = '';

	constructor(public assignmentService:AssignmentService, private router:Router,private dialog: MatDialog) {
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
	    let config = new MatDialogConfig();
	    config.width = '400px';
	    this.dialog.open(CreateAssignmentDialogComponent, config).afterClosed()
		    .pipe(
		        filter(result => !!result)
		    ).subscribe(data => {
			    this.createAssignment(data);
		    });
    }

    createAssignment(form:any){
		const assignmentName = form.assignmentName;
		const assignmentType = form.type;

		this.assignmentService.createAssignment(assignmentName, assignmentType)
			.subscribe((newAssignment:Assignment)=>{
				this.assignmentList.push(new Assignment(newAssignment));
			});
    }

}
