import { Component, OnInit } from '@angular/core';
import {Assignment} from "../models/assignments/Assignment";
import {AssignmentService} from "../services/assignment.service";
import {NgForm} from "@angular/forms";
import {Question} from "../models/Questions/Question";
import {QuestionGroup} from "../models/Questions/QuestionGroup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
    assignmentList:Assignment[];
    selectAssignmentId:string = '';

	constructor(public assignmentService:AssignmentService, private router:Router) {
	}

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList:Assignment[])=>{
			this.assignmentList = assignmentList;
		});
	}

	selectAssignment(assignmentId:string){
	    this.selectAssignmentId = assignmentId;
    }

    createAssignment(form:NgForm){
		let assignmentName = form.value.assignmentName;

		this.assignmentService.createAssignment(assignmentName)
			.subscribe((newAssignment:Assignment)=>{
				this.assignmentList.push(newAssignment);
			});
    }

	addQuestionGroupToAssignment(form:NgForm){
		this.assignmentService.addQuestionGroupToAssignment(this.selectAssignmentId, form.value.type)
			.subscribe((questionGroup:QuestionGroup)=>{
				form.reset();
				document.getElementById('closeModal2').click();

				let group = new QuestionGroup(questionGroup);
				this.router.navigate(['/question/edit/' + this.selectAssignmentId
							+ '/' + group.id + '/' + group.type]);
		});
    }

}
