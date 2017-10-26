import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {AssignmentService} from "../../../../core/services/assignment.service";

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit{
	public types:any[] = [
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

	constructor(private assignmentService:AssignmentService,
	            public dialogRef: MdDialogRef<AddQuestionDialogComponent>) {}


	ngOnInit() {}
}
