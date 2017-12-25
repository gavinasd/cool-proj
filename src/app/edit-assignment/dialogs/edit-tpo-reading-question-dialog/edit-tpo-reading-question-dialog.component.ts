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
    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
                public dialogRef: MatDialogRef<EditTpoReadingQuestionDialogComponent>,
                public assignmentService:AssignmentService) { }

    ngOnInit() {
    	this.question = new TPOReadingQuestion(this.dialogData);
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
