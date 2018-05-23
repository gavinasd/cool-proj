import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {IndependentWritingQuestion} from "../../../models/Questions/IndependentWritingQuestion";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-independent-writing-question-dialog',
  templateUrl: './edit-independent-writing-question-dialog.component.html',
  styleUrls: ['./edit-independent-writing-question-dialog.component.css']
})
export class EditIndependentWritingQuestionDialogComponent implements OnInit {

	public QuestionEditorOptions;
	public AnswerEditorOptions;

	public question:IndependentWritingQuestion;


	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<EditIndependentWritingQuestionDialogComponent>,
	            public assignmentService:AssignmentService) { }

	ngOnInit() {
		this.question = new IndependentWritingQuestion(this.dialogData);
		this.QuestionEditorOptions = Object.create(environment.studentEditorOptions);
		this.QuestionEditorOptions.height = '150px';

		this.AnswerEditorOptions = Object.create(environment.studentEditorOptions);
		this.AnswerEditorOptions.height = '200px';
	}

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		if(JSON.stringify(this.question) !== JSON.stringify(this.dialogData)){
			this.dialogRef.close(this.question);
			return;
		}
		this.dialogRef.close();
	}

}
