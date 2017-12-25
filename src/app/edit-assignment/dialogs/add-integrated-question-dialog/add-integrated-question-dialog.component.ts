import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";
import {IntegratedWritingQuestion} from "../../../models/Questions/IntegratedWritingQuestion";
import {Question} from "../../../models/Questions/Question";
import {HttpService} from "../../../core/services/http.service";

@Component({
  selector: 'app-add-integrated-question-dialog',
  templateUrl: './add-integrated-question-dialog.component.html',
  styleUrls: ['./add-integrated-question-dialog.component.css']
})
export class AddIntegratedQuestionDialogComponent implements OnInit {

	public studentOptions;
	public passage:string = '';
	public recordUrl:string = '';
	answer:string;                  //用来接收Editor里面的answer内容,其实就是一篇范文
	public recordUrlList:String[] = Array(36).fill(0).map((x,i) => {
		return 'tpo-integrated-writing-' + (i+1);
	});

    constructor(private httpService: HttpService,
    	        public dialogRef: MatDialogRef<AddIntegratedQuestionDialogComponent>,
                public assignmentService:AssignmentService) {
	    this.studentOptions = Object.create(environment.studentEditorOptions);
	    this.studentOptions.height = 200;
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
			questionType : Question.INTEGRATED_WRITING_TYPE,
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
