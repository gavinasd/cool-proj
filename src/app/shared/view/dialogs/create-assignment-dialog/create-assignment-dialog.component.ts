import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-assignment-dialog',
  templateUrl: './create-assignment-dialog.component.html',
  styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent{

	public assignmentTypes=[
		{
			value: 'tpo_reading',
			name:'TPO阅读'
		},
		{
			value:'vocabulary',
			name:'词汇'
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

	constructor(public dialogRef: MdDialogRef<CreateAssignmentDialogComponent>) {}

}
