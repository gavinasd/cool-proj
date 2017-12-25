import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastService} from "../../../core/services/toast.service";
import {HttpService} from "../../../core/services/http.service";
import {AssignmentService} from "../../../core/services/assignment.service";
import {environment} from "../../../../environments/environment";
import {TPOListeningQuestion} from "../../../models/Questions/TPOListeningQuestion";

@Component({
  selector: 'app-edit-tpolistening-question',
  templateUrl: './edit-tpolistening-question.component.html',
  styleUrls: ['./edit-tpolistening-question.component.css']
})
export class EditTpolisteningQuestionComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() groupId: string;
	public questionType: string;
	public passageEditorOptions:any;
	public explanationEditorOptions:any;
	public passage:string;
	public explanation:string;

	constructor(private assignmentService:AssignmentService,
	            private httpService:HttpService,
	            private toastService:ToastService) {
		this.passageEditorOptions = Object.create(environment.studentEditorOptions);
		this.passageEditorOptions.placeholderText = '请输入听力材料原文';
		this.passageEditorOptions.height = 300;

		this.explanationEditorOptions = Object.create(environment.studentEditorOptions);
		this.explanationEditorOptions.placeholderText = '请输入题目解释';
		this.explanationEditorOptions.height = 100;
	}

	ngOnInit() {}

	addContent(form:NgForm){
		let data = form.value.passageRecord.split('/');
		if(data.length != 3){
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0]
			+ '/sound/listening_passage'+data[1]+'_'+data[2]+'.mp3';
		const body = JSON.stringify({
			'recordUrl':recordUrl,
			'passage': this.passage
		});

		this.assignmentService
			.updateQuestionGroupContent(this.assignmentId, this.groupId, body)
			.subscribe((assignment)=>{
				this.toastService.success("成功提交");
				//清空input
				form.resetForm();
				this.passage = '';
			});
	}

	addQuestion(form:NgForm):boolean{
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

		console.log(question);
		this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
			.subscribe(
				(resp)=> {
					console.log(resp);
					this.toastService.success("成功提交");
					this.explanation='';
					form.reset();
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}

}
