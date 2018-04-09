import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";
import {IntegratedWritingQuestion} from "../../../models/Questions/IntegratedWritingQuestion";
import {Question} from "../../../models/Questions/Question";
import {HttpService} from "../../../core/services/http.service";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
  selector: 'app-add-integrated-question-dialog',
  templateUrl: './add-integrated-question-dialog.component.html',
  styleUrls: ['./add-integrated-question-dialog.component.css']
})
export class AddIntegratedQuestionDialogComponent implements OnInit {

	public questionEditorOptions;
	public passageEditorOptions;
	public passage:string = '';
	public recordUrl:string = '';
	answer:string;                  //用来接收Editor里面的answer内容,其实就是一篇范文
	public recordUrlList:String[] = Array(36).fill(0).map((x,i) => {
		return 'tpo-integrated-writing-' + (i+1);
	});

    constructor(private httpService: HttpService,
    	        public dialogRef: MatDialogRef<AddIntegratedQuestionDialogComponent>,
                public assignmentService:AssignmentService) {
	    this.questionEditorOptions = Object.create(environment.studentEditorOptions);
	    this.questionEditorOptions.placeholderText = '请输入阅读材料';
	    this.questionEditorOptions.height = 400;

	    this.passageEditorOptions = Object.create(environment.studentEditorOptions);
	    this.passageEditorOptions.placeholderText = '请输入范文';
	    this.passageEditorOptions.height = 400;
    }

    ngOnInit() {
    }

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		const formData = this.getFormData();
		this.dialogRef.close(formData);
	}

	getFormData(){
		const question = new IntegratedWritingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : QuestionType.INTEGRATED_WRITING_TYPE,
			question : '',
			answer: this.answer,
			score: 5
		});
		return JSON.stringify({
			question: question,
			passage:this.passage,
			recordUrl:this.recordUrl,
		});
	}

}
