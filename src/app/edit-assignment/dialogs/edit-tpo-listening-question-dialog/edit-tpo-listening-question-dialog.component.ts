import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
  selector: 'app-edit-tpo-listening-question-dialog',
  templateUrl: './edit-tpo-listening-question-dialog.component.html',
  styleUrls: ['./edit-tpo-listening-question-dialog.component.css']
})
export class EditTpoListeningQuestionDialogComponent implements OnInit {
	public explanationEditorOptions;
	public question:TPOListeningQuestion;
	public rowsLength:number = 0;
	public optionsLength:number = 0;
	public QuestionType:any = QuestionType;

	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<EditTpoListeningQuestionDialogComponent>,
	            public assignmentService:AssignmentService) {
		this.explanationEditorOptions = Object.create(environment.studentEditorOptions);
		this.explanationEditorOptions.placeholder = '请输入题目解释';
		this.explanationEditorOptions.height = '100px';
	}

	ngOnInit() {
		this.question = new TPOListeningQuestion(this.dialogData);

		if(this.question.questionType == QuestionType.TPO_LISTENING_TABLE_CHOICE_TYPE){
			this.rowsLength = this.question.tableRows.length + 1;
			this.optionsLength = this.question.options.length + 1;
		}
		if (this.question.questionType == QuestionType.TPO_LISTENING_SEQUENCE_TYPE) {
			this.optionsLength = this.question.options.length;
		}
	}

	initTableRows(){
		this.question.tableRows = Array.from({length: this.rowsLength-1});
	}

	initTableCols(){
		this.question.options = Array.from({length: this.optionsLength - 1});
	}

	trackByIndex(index: number, value: number) {
		return index;
	}

	initSequenceChoice() {
		this.question.options = Array.from({length: this.optionsLength});
	}

	initOptions(num: number) {
		this.question.options = Array.from({length: num});
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
