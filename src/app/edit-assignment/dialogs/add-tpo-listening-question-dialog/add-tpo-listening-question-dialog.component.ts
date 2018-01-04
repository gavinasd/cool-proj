import {Component, DoCheck, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgForm} from "@angular/forms";
import {HttpService} from "../../../core/services/http.service";
import {ToastService} from "../../../core/services/toast.service";
import {environment} from "../../../../environments/environment";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";

@Component({
  selector: 'app-add-tpo-listening-question-dialog',
  templateUrl: './add-tpo-listening-question-dialog.component.html',
  styleUrls: ['./add-tpo-listening-question-dialog.component.css']
})
export class AddTpoListeningQuestionDialogComponent implements OnInit {
	public questionType: string;
	public explanationEditorOptions;
	public explanation:string;
	public questionIndex:number;          //插入到第几题
	public options:number[];
	public tableRows:string[];
	public tableCols:string[];
	public sequenceChoices:string[];

	constructor(private dialogRef: MatDialogRef<AddTpoListeningQuestionDialogComponent>,
	            private httpService: HttpService,
	            @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            private toastService: ToastService) {
		this.explanationEditorOptions = Object.create(environment.studentEditorOptions);
		this.explanationEditorOptions.placeholderText = '请输入题目解释';
		this.explanationEditorOptions.height = 100;
	}

	ngOnInit() {
		this.questionIndex = this.dialogData + 1;
	}

	initTableRows(num: number){
		this.tableRows = Array.from({length: num-1});
	}

	initTableCols(num: number){
		this.tableCols = Array.from({length: num - 1});
	}

	trackByIndex(index: number, value: number) {
		return index;
	}

	initSequenceChoice(num: number) {
		this.sequenceChoices = Array.from({length: num});
	}

	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(form:NgForm){
		let question: TPOListeningQuestion;
		if(this.questionType == 'tpo_listening_table_choice'){
			question = this.assembleTpoListeningTableQuestion(form);
		} else if (this.questionType == 'tpo_listening_sequence_type'){
			question = this.assembleTpoListeningSequenceQuestion(form);
		} else {
			question = this.assembleTpoNormalQuestion(form);
		}

		this.dialogRef.close({
			'question': question,
			'index': this.questionIndex - 1
		});
	}

	assembleTpoListeningTableQuestion(form: NgForm): TPOListeningQuestion{
		let data = form.value.questionRecord.split('/');
		if(data.length != 3){
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0] + '/sound/listening_question'+data[1]+'_'+data[2]+'.mp3';

		let question = new TPOListeningQuestion({
			creator: this.httpService.getCurrentId(),
			questionType: this.questionType,
			question: JSON.stringify({
				'question': form.value.question,
				'tableRows': this.tableRows
			}),
			recordUrl: recordUrl,
			options: this.tableCols,
			answer: form.value.answer,
			explanation: this.explanation,
			score:2
		});
		return question;
	}

	assembleTpoListeningSequenceQuestion(form: NgForm): TPOListeningQuestion{
		let data = form.value.questionRecord.split('/');
		if(data.length != 3){
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0] + '/sound/listening_question'+data[1]+'_'+data[2]+'.mp3';

		let question = new TPOListeningQuestion({
			creator: this.httpService.getCurrentId(),
			questionType: this.questionType,
			question: form.value.question,
			recordUrl: recordUrl,
			options: this.sequenceChoices,
			answer: form.value.answer,
			explanation: this.explanation,
			score:1
		});
		return question;
	}

	assembleTpoNormalQuestion(form: NgForm): TPOListeningQuestion{
		let data = form.value.questionRecord.split('/');
		if(data.length != 3){
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0] + '/sound/listening_question'+data[1]+'_'+data[2]+'.mp3';

		let question = new TPOListeningQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : form.value.questionType,
			question : form.value.question,
			recordUrl : recordUrl,
			options : [form.value.option1,form.value.option2,
				form.value.option3,form.value.option4],
			answer:form.value.answer,
			explanation: this.explanation,
			score:1
		});
		return question;
	}

}
