import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";
import {HttpService} from "../../../core/services/http.service";
import {NgForm} from "@angular/forms";
import {AssignmentService} from "../../../core/services/assignment.service";

@Component({
  selector: 'app-add-tpo-reading-question-dialog',
  templateUrl: './add-tpo-reading-question-dialog.component.html',
  styleUrls: ['./add-tpo-reading-question-dialog.component.css']
})
export class AddTpoReadingQuestionDialogComponent implements OnInit {
	public questionType:string;          //用来接收题目的类型
	public questionIndex:number;          //插入到第几题

	constructor(private httpService: HttpService,
                public assignmentService: AssignmentService,
                @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
                public dialogRef: MatDialogRef<AddTpoReadingQuestionDialogComponent>) {}

    ngOnInit() {
		this.questionIndex = this.dialogData + 1;
    }

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(form:NgForm){
		let question = new TPOReadingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : this.questionType,
			paragraph: form.value.paragraph,
			question : form.value.question,
			options : this.getOptionList(form),
			answer:form.value.answer,
			score:this.questionType == this.assignmentService.getTPOReadingTopic()?2:1
		});
		this.dialogRef.close({
			'question': question,
			'index': this.questionIndex - 1
		});
	}

	getOptionList(form:NgForm):String[]{
		return this.questionType == this.assignmentService.getTPOReadingTopic()?
			[form.value.option1,form.value.option2,form.value.option3,form.value.option4,form.value.option5,form.value.option6]:
			[form.value.option1,form.value.option2,form.value.option3,form.value.option4];
	}
}
