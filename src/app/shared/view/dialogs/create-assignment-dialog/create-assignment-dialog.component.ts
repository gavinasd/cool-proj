import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-assignment-dialog',
  templateUrl: './create-assignment-dialog.component.html',
  styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent{

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
			value:'tpo_listening',
			name:'TPO听力'
		},
		{
			value:'tpo_speaking',
			name:'TPO口语'
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

	constructor(public dialogRef: MatDialogRef<CreateAssignmentDialogComponent>) {}

}
