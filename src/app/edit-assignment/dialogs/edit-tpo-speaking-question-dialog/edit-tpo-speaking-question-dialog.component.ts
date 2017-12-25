import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOSpeakingQuestion} from "../../../models/Questions/TPOSpeakingQuestion";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-tpo-speaking-question-dialog',
  templateUrl: './edit-tpo-speaking-question-dialog.component.html',
  styleUrls: ['./edit-tpo-speaking-question-dialog.component.css']
})
export class EditTpoSpeakingQuestionDialogComponent implements OnInit {
	public question:TPOSpeakingQuestion;
	public passageEditorOptions:any;
	public tpoIndex: number;
	public questionIndex: number;

	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<EditTpoSpeakingQuestionDialogComponent>,
	            public assignmentService:AssignmentService) { }


	ngOnInit(): void {
		this.question = new TPOSpeakingQuestion(this.dialogData);
		this.tpoIndex = +this.question.recordUrl.split('/')[0] || 1;
		this.questionIndex = +this.question.recordUrl.split('/')[1] || 1;
		this.passageEditorOptions = Object.create(environment.studentEditorOptions);
		this.passageEditorOptions.placeholderText = '请输入阅读材料';
		this.passageEditorOptions.height = 300;
	}

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		this.question.recordUrl = this.tpoIndex + '/' + this.questionIndex;
		this.question.questionType = this.getQuestionType();
		this.question.passage =  (this.questionIndex == 3 || this.questionIndex == 4)?this.question.passage:'';
		if(JSON.stringify(this.question) !== JSON.stringify(this.dialogData)){
			this.dialogRef.close(this.question);
			return;
		}
		this.dialogRef.close();
	}

	getQuestionType():string{
		let questionType ='';
		if(this.questionIndex == 1 || this.questionIndex == 2){
			questionType = this.assignmentService.getTpoSpeakingQ1Q2Type();
		}
		else if(this.questionIndex == 3 || this.questionIndex == 4){
			questionType = this.assignmentService.getTpoSpeakingQ3Q4Type();
		}
		else{
			questionType = this.assignmentService.getTpoSpeakingQ5Q6Type();
		}

		return questionType;
	}
}
