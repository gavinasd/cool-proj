import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";
import {HttpService} from "../../../core/services/http.service";
import {NgForm} from "@angular/forms";
import {AssignmentService} from "../../../core/services/assignment.service";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
	selector: 'app-add-tpo-reading-question-dialog',
	templateUrl: './add-tpo-reading-question-dialog.component.html',
	styleUrls: ['./add-tpo-reading-question-dialog.component.css']
})
export class AddTpoReadingQuestionDialogComponent implements OnInit {
	public questionType: QuestionType;          //用来接收题目的类型
	public questionIndex: number;          //插入到第几题
	public categoryList: string[];
	public categoryOptions: string[];
	public QuestionType:any = QuestionType;

	constructor(private httpService: HttpService,
	            public assignmentService: AssignmentService,
	            @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<AddTpoReadingQuestionDialogComponent>) {
	}

	ngOnInit() {
		this.questionIndex = this.dialogData + 1;
		this.questionType = QuestionType.TPO_READING_SINGLE_TYPE;
	}

	closeDialog() {
		this.dialogRef.close();
	}

	closeDialogAndSave(form: NgForm) {
		let question = new TPOReadingQuestion({
			creator: this.httpService.getCurrentId(),
			questionType: this.questionType,
			paragraph: form.value.paragraph,
			question: form.value.question,
			options: this.getOptionList(form),
			answer: form.value.answer,
			score: this.getScoreForQuestionType(this.questionType),
			categoryList: this.categoryList
		});
		this.dialogRef.close({
			'question': question,
			'index': this.questionIndex - 1
		});
	}

	getScoreForQuestionType(questionType: QuestionType): number {
		if (questionType == QuestionType.TPO_READING_CATEGORY_TYPE) {
			return 3;
		} else if (questionType == QuestionType.TPO_READING_TOPIC_TYPE) {
			return 2;
		} else {
			return 1;
		}
	}


	getOptionList(form: NgForm): String[] {
		switch (this.questionType) {
			case QuestionType.TPO_READING_TOPIC_TYPE:
				return [form.value.option1, form.value.option2, form.value.option3,
					form.value.option4, form.value.option5, form.value.option6];
			case QuestionType.TPO_READING_CATEGORY_TYPE:
				return this.categoryOptions;
			default:
				return [form.value.option1, form.value.option2, form.value.option3, form.value.option4];

		}
	}

	initCategoryList(num: number) {
		this.categoryList = Array.from({length: num});
	}

	initCategoryOptions(num: number) {
		this.categoryOptions = Array.from({length: num});
	}

	trackByIndex(index: number, value: number) {
		return index;
	}
}
