import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-tpo-listening-question-dialog',
  templateUrl: './edit-tpo-listening-question-dialog.component.html',
  styleUrls: ['./edit-tpo-listening-question-dialog.component.css']
})
export class EditTpoListeningQuestionDialogComponent implements OnInit {
	public explanationEditorOptions;
	public question:TPOListeningQuestion;
	public questionForTable:string;
	public tableRows:string[];
	public rowsLength:number = 0;
	public optionsLength:number = 0;

	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<EditTpoListeningQuestionDialogComponent>,
	            public assignmentService:AssignmentService) {
		this.explanationEditorOptions = Object.create(environment.studentEditorOptions);
		this.explanationEditorOptions.placeholderText = '请输入题目解释';
		this.explanationEditorOptions.height = 100;
	}

	ngOnInit() {
		this.question = new TPOListeningQuestion(this.dialogData);

		if(this.question.questionType == 'tpo_listening_table_choice'){
			this.questionForTable = JSON.parse(this.question.question).question;
			this.tableRows = JSON.parse(this.question.question).tableRows;
			this.rowsLength = this.tableRows.length + 1;
			this.optionsLength = this.question.options.length + 1;
		}
		if (this.question.questionType == 'tpo_listening_sequence_type') {
			this.optionsLength = this.question.options.length;
		}
	}

	initTableRows(){
		this.tableRows = Array.from({length: this.rowsLength-1});
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

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		if(this.question.questionType == 'tpo_listening_table_choice'){
			this.question.question = JSON.stringify({
				'question': this.questionForTable,
				'tableRows': this.tableRows
			});
		}

		if(JSON.stringify(this.question) !== JSON.stringify(this.dialogData)){
			this.dialogRef.close(this.question);
			return;
		}
		this.dialogRef.close();
	}

}
