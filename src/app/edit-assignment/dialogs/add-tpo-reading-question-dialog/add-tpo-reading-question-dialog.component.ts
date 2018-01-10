import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";
import {HttpService} from "../../../core/services/http.service";
import {NgForm} from "@angular/forms";
import {AssignmentService} from "../../../core/services/assignment.service";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";

@Component({
  selector: 'app-add-tpo-reading-question-dialog',
  templateUrl: './add-tpo-reading-question-dialog.component.html',
  styleUrls: ['./add-tpo-reading-question-dialog.component.css']
})
export class AddTpoReadingQuestionDialogComponent implements OnInit {
	public questionType:string;          //用来接收题目的类型
	public questionIndex:number;          //插入到第几题
	public categoryList:string[];
	public categoryOptions:string[];

	constructor(private httpService: HttpService,
                public assignmentService: AssignmentService,
                @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
                public dialogRef: MatDialogRef<AddTpoReadingQuestionDialogComponent>) {}

    ngOnInit() {
		this.questionIndex = this.dialogData + 1;
		this.questionType = this.assignmentService.getTPOReadingSingleChoice();
    }

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(form:NgForm){
		let question = new TPOReadingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : this.questionType,
			paragraph: form.value.paragraph,
			question : (this.questionType == this.assignmentService.getTPOReadingCategoryType())
				?this.getQuestionForCategoryType(form): form.value.question,
			options : this.getOptionList(form),
			answer:form.value.answer,
			score:this.getScoreForQuestionType(this.questionType)
		});
		this.dialogRef.close({
			'question': question,
			'index': this.questionIndex - 1
		});
	}

	getScoreForQuestionType(questionType: string) : number{
		if(questionType == this.assignmentService.getTPOReadingCategoryType()) {
			return 3;
		} else if (questionType == this.assignmentService.getTPOReadingTopic()) {
			return 2;
		} else {
			return 1;
		}
	}

	getQuestionForCategoryType(form: NgForm): string {
		return JSON.stringify({
			'question': form.value.question,
			'categoryList': this.categoryList
		})
	}

	getOptionList(form:NgForm):String[]{
		switch (this.questionType) {
			case this.assignmentService.getTPOReadingTopic():
				return [form.value.option1,form.value.option2,form.value.option3,
					form.value.option4,form.value.option5,form.value.option6];
			case this.assignmentService.getTPOReadingCategoryType():
				return this.categoryOptions;
			default:
				return [form.value.option1,form.value.option2,form.value.option3,form.value.option4];

		}
	}

	initCategoryList(num: number){
		this.categoryList = Array.from({length: num});
	}

	initCategoryOptions(num: number){
		this.categoryOptions = Array.from({length: num});
	}

	trackByIndex(index: number, value: number) {
		return index;
	}
}
