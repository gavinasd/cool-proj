import { Component, OnInit } from '@angular/core';
import {Assignment} from "../../../../models/assignments/Assignment";
import {AssignmentService} from "../../../../services/assignment.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-assignment-dialog',
  templateUrl: './add-assignment-dialog.component.html',
  styleUrls: ['./add-assignment-dialog.component.css']
})
export class AddAssignmentDialogComponent implements OnInit {
	public allAssignment:Assignment[];
	public assignmentList:Assignment[];
	public type:string;
	public assignmentTypes=[
		{
			value:'vocabulary',
			name:'词汇'
		},
		{
			value: 'tpo_reading',
			name:'TPO阅读'
		},
		{
			value: 'tpo_listening',
			name: 'TPO听力'
		},
		{
			value:'tpo_speaking',
			name: 'TPO口语'
		},
		{
			value:'independent_writing',
			name:'独立写作'
		},
		{
			value:'integrated_writing',
			name:'综合写作'
		}
	];

	constructor(private assignmentService:AssignmentService,public dialogRef: MdDialogRef<AddAssignmentDialogComponent>) { }

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList:Assignment[]) => {
			this.allAssignment = assignmentList;
		});
	}

	public changeType(){
		this.assignmentList = this.allAssignment.filter(assignment => assignment.type == this.type);
	}

}
