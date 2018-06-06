import {Component, DoCheck, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgForm} from "@angular/forms";
import {HttpService} from "../../../core/services/http.service";
import {ToastService} from "../../../core/services/toast.service";
import {environment} from "../../../../environments/environment";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";
import {QuestionType} from "../../../shared/enums/QuestionType";

@Component({
	selector: 'app-add-tpo-listening-question-dialog',
	templateUrl: './add-tpo-listening-question-dialog.component.html',
	styleUrls: ['./add-tpo-listening-question-dialog.component.css']
})
export class AddTpoListeningQuestionDialogComponent implements OnInit {
	public questionType: QuestionType;
	public explanation: string;
	public questionIndex: number;          //插入到第几题
	public recordUrl: string = '';
	public options: string[] = Array.from({length: 4});
	public tableRows: string[];
	public tableCols: string[];
	public sequenceChoices: string[];
	public QuestionType: any = QuestionType;

	constructor(private dialogRef: MatDialogRef<AddTpoListeningQuestionDialogComponent>,
	            private httpService: HttpService,
	            @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            private toastService: ToastService) {
	}

	ngOnInit() {
		this.questionType = QuestionType.TPO_LISTENING_SINGLE_CHOICE_TYPE;

		this.questionIndex = this.dialogData.questionIndex + 1;
		if (this.dialogData.record) {
			this.recordUrl = this.dialogData.record[0] + '/' +
				this.dialogData.record[1] + '/' +
				(this.dialogData.record[2] + 1);
		}
	}

	initTableRows(num: number) {
		this.tableRows = Array.from({length: num - 1});
	}

	initTableCols(num: number) {
		this.tableCols = Array.from({length: num - 1});
	}

	trackByIndex(index: number, value: number) {
		return index;
	}

	initSequenceChoice(num: number) {
		this.sequenceChoices = Array.from({length: num});
	}

	initOptions(num: number) {
		this.options = Array.from({length: num});
	}

	closeDialog() {
		this.dialogRef.close();
	}

	closeDialogAndSave(form: NgForm) {
		let question: TPOListeningQuestion;
		if (this.questionType == QuestionType.TPO_LISTENING_TABLE_CHOICE_TYPE) {
			question = this.assembleTpoListeningTableQuestion(form);
		} else if (this.questionType == QuestionType.TPO_LISTENING_SEQUENCE_TYPE) {
			question = this.assembleTpoListeningSequenceQuestion(form);
		} else {
			question = this.assembleTpoNormalQuestion(form);
		}

		this.dialogRef.close({
			'question': question,
			'index': this.questionIndex - 1
		});
	}

	assembleTpoListeningTableQuestion(form: NgForm): TPOListeningQuestion {
		let data = this.recordUrl.split('/');
		if (data.length != 3) {
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0] + '/sound/listening_question' + data[1] + '_' + data[2] + '.mp3';

		let question = new TPOListeningQuestion({
			creator: this.httpService.getCurrentId(),
			questionType: this.questionType,
			question: form.value.question,
			recordUrl: recordUrl,
			options: this.tableCols,
			answer: form.value.answer,
			explanation: this.explanation,
			score: 2,
			tableRows: this.tableRows
		});
		return question;
	}

	assembleTpoListeningSequenceQuestion(form: NgForm): TPOListeningQuestion {
		let data = this.recordUrl.split('/');
		if (data.length != 3) {
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0] + '/sound/listening_question' + data[1] + '_' + data[2] + '.mp3';

		let question = new TPOListeningQuestion({
			creator: this.httpService.getCurrentId(),
			questionType: this.questionType,
			question: form.value.question,
			recordUrl: recordUrl,
			options: this.sequenceChoices,
			answer: form.value.answer,
			explanation: this.explanation,
			score: 1
		});
		return question;
	}

	assembleTpoNormalQuestion(form: NgForm): TPOListeningQuestion {
		let data = this.recordUrl.split('/');
		if (data.length != 3) {
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0] + '/sound/listening_question' + data[1] + '_' + data[2] + '.mp3';

		let question = new TPOListeningQuestion({
			creator: this.httpService.getCurrentId(),
			questionType: form.value.questionType,
			question: form.value.question,
			recordUrl: recordUrl,
			options: this.options,
			answer: form.value.answer,
			explanation: this.explanation,
			score: 1
		});
		return question;
	}

}
