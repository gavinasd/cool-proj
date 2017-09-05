import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {AssignmentService} from "../../../../services/assignment.service";

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit{
	public types:any[] = [];

	constructor(private assignmentService:AssignmentService,
	            public dialogRef: MdDialogRef<AddQuestionDialogComponent>) {}


	ngOnInit() {
		this.types = this.assignmentService.getQuestionTypes();
	}
}
