import {Component, Inject, OnInit, Optional} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpService} from "../../../core/services/http.service";
import {AssignmentService} from "../../../core/services/assignment.service";
import {NgForm} from "@angular/forms";
import {TPOSpeakingQuestion} from "../../../models/Questions/TPOSpeakingQuestion";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
  selector: 'app-add-tpo-speaking-question-dialog',
  templateUrl: './add-tpo-speaking-question-dialog.component.html',
  styleUrls: ['./add-tpo-speaking-question-dialog.component.css']
})
export class AddTpoSpeakingQuestionDialogComponent implements OnInit {
	public passageEditorOptions:any;
	public passage:string;
	public questionIndex:number;          //插入到第几题

	constructor(public dialogRef: MatDialogRef<AddTpoSpeakingQuestionDialogComponent>,
	            @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            private httpService:HttpService,
	            public assignmentService:AssignmentService) {
		this.passageEditorOptions = Object.create(environment.studentEditorOptions);
		this.passageEditorOptions.placeholderText = '请输入阅读材料';
		this.passageEditorOptions.height = 300;
	}

	ngOnInit() {
		this.questionIndex = this.dialogData + 1;
	}

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(form:NgForm){
		const recordUrl = form.value.tpoIndex + '/' + this.questionIndex;

		let question = new TPOSpeakingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : this.getQuestionType(),
			question : form.value.question,
			passage: (this.questionIndex == 3 || this.questionIndex == 4)?this.passage:'',
			recordUrl : recordUrl,
			answer:'',
			explanation: '',
			score:5
		});
		this.dialogRef.close({
			'question': question,
			'index': this.questionIndex - 1
		});	}

	getQuestionType():string{
		let questionType;
		if(this.questionIndex == 1 || this.questionIndex == 2){
			questionType = QuestionType.TPO_SPEAKING_Q1Q2_TYPE;
		}
		else if(this.questionIndex == 3 || this.questionIndex == 4){
			questionType = QuestionType.TPO_SPEAKING_Q3Q4_TYPE;
		}
		else{
			questionType = QuestionType.TPO_SPEAKING_Q5Q6_TYPE;
		}

		return questionType;
	}

}
