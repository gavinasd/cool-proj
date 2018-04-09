import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MatDialogRef} from "@angular/material";
import {AssignmentService} from "../../../core/services/assignment.service";
import {Question} from "../../../models/Questions/Question";
import {HttpService} from "../../../core/services/http.service";
import {IndependentWritingQuestion} from "../../../models/Questions/IndependentWritingQuestion";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
  selector: 'app-add-independent-question-dialog',
  templateUrl: './add-independent-question-dialog.component.html',
  styleUrls: ['./add-independent-question-dialog.component.css']
})
export class AddIndependentQuestionDialogComponent implements OnInit {

	public QuestionEditorOptions;
	public AnswerEditorOptions;
	question:string;                //用来接收Editor里面的question内容
	answer:string;                  //用来接收Editor里面的answer内容,其实就是一篇范文

	constructor( public dialogRef: MatDialogRef<AddIndependentQuestionDialogComponent>,
	             private httpService:HttpService,
	             public assignmentService:AssignmentService) {
		this.QuestionEditorOptions = Object.create(environment.studentEditorOptions);
		this.QuestionEditorOptions.height = 150;

		this.AnswerEditorOptions = Object.create(environment.studentEditorOptions);
		this.AnswerEditorOptions.height = 200;
	}

	ngOnInit() {
	}

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		let question = new IndependentWritingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : QuestionType.INDEPENDENT_WRITING_TYPE,
			question : this.question,
			answer: this.answer,
			score: 5
		});

		this.dialogRef.close(question);
	}

}
