import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {IntegratedWritingQuestion} from "../../../models/Questions/IntegratedWritingQuestion";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-integrated-writing-question-dialog',
  templateUrl: './edit-integrated-writing-question-dialog.component.html',
  styleUrls: ['./edit-integrated-writing-question-dialog.component.css']
})
export class EditIntegratedWritingQuestionDialogComponent implements OnInit {

	public studentOptions;

	public passage:string = '';
	public recordUrl:string = '';
	public question:IntegratedWritingQuestion;
	public recordUrlList:String[] = Array(36).fill(0).map((x,i) => {
		return 'tpo-integrated-writing-' + (i+1);
	});


	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<EditIntegratedWritingQuestionDialogComponent>,
	            public assignmentService:AssignmentService) { }

	ngOnInit() {
		this.passage = JSON.parse(this.dialogData).passage;
		this.recordUrl = JSON.parse(this.dialogData).recordUrl;
		this.question = <IntegratedWritingQuestion>JSON.parse(this.dialogData).question;
		this.studentOptions = Object.create(environment.studentEditorOptions);
		this.studentOptions.height = 200;
	}

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(){
		const formData = this.getFormData();
		if(formData != this.dialogData){
			this.dialogRef.close(formData);
			return;
		}
		this.dialogRef.close();
	}

	getFormData(){
		return JSON.stringify({
			passage:this.passage,
			recordUrl:this.recordUrl,
			question:this.question
		});
	}

}
