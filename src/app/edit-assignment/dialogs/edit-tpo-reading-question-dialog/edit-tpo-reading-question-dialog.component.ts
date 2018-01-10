import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";
import {AssignmentService} from "../../../core/services/assignment.service";

@Component({
  selector: 'app-edit-tpo-reading-question-dialog',
  templateUrl: './edit-tpo-reading-question-dialog.component.html',
  styleUrls: ['./edit-tpo-reading-question-dialog.component.css']
})
export class EditTpoReadingQuestionDialogComponent implements OnInit {
	public question:TPOReadingQuestion;
	public categoryList: String[];
	public categoryLength:number = 0;
	public optionsLength:number = 0;
	public questionForCategory: string;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
                public dialogRef: MatDialogRef<EditTpoReadingQuestionDialogComponent>,
                public assignmentService:AssignmentService) { }

    ngOnInit() {
    	this.question = new TPOReadingQuestion(this.dialogData);
    	if(this.question.questionType == this.assignmentService.getTPOReadingCategoryType()) {
    		this.questionForCategory = JSON.parse(this.question.question).question;
    		this.categoryList = JSON.parse(this.question.question).categoryList;
    		this.categoryLength = this.categoryList.length;
    		this.optionsLength = this.question.options.length;
	    }
    }

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		if(this.question.questionType == this.assignmentService.getTPOReadingCategoryType()){
			this.question.question = JSON.stringify({
				'question': this.questionForCategory,
				'categoryList': this.categoryList
			});
		}

		if(JSON.stringify(this.question) !== JSON.stringify(this.dialogData)){
			this.dialogRef.close(this.question);
			return;
		}
		this.dialogRef.close();
	}

	initCategoryList(categoryLength: number){
		this.categoryList = Array.from({length: categoryLength});
	}

	initCategoryOptions(optionsLength: number){
		this.question.options = Array.from({length: optionsLength});
	}

	trackByIndex(index: number, value: number) {
		return index;
	}
}
