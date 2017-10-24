import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../../models/Questions/QuestionGroup";
import {environment} from "../../../../../environments/environment";
import {NgForm} from "@angular/forms";
import {AssignmentService} from "../../../../services/assignment.service";
import {HttpService} from "../../../../services/http.service";
import {ToastService} from "../../../../services/toast.service";
import {TPOSpeakingQuestion} from "../../../../models/Questions/TPOSpeakingQuestion";

@Component({
  selector: 'app-edit-tpospeaking-question',
  templateUrl: './edit-tpospeaking-question.component.html',
  styleUrls: ['./edit-tpospeaking-question.component.css']
})
export class EditTpospeakingQuestionComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() groupId: string;
	public questionIndex:number;
	public passageEditorOptions:any;
	public passage:string;
	protected questionGroup:QuestionGroup;

	constructor(private assignmentService:AssignmentService,
	            private httpService:HttpService,
	            private toastService:ToastService) {
		this.passageEditorOptions = Object.create(environment.studentEditorOptions);
		this.passageEditorOptions.placeholderText = '请输入阅读材料';
		this.passageEditorOptions.height = 300;
	}

	ngOnInit() {
	}

	addQuestion(form:NgForm):boolean{
		const recordUrl = form.value.tpoIndex + '/' + this.questionIndex;

		let question = new TPOSpeakingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : this.getQuestionType(this.questionIndex),
			question : form.value.question,
			passage: (this.questionIndex == 3 || this.questionIndex == 4)?this.passage:'',
			recordUrl : recordUrl,
			answer:'',
			explanation: '',
			score:5
		});

		console.log(question);
		this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
			.subscribe(
				(resp)=> {
					console.log(resp);
					this.toastService.success("成功提交");
					this.passage='';
					form.reset();
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}

	getQuestionType(questionIndex:number):string{
		let questionType ='';
		if(this.questionIndex == 1 || this.questionIndex == 2){
			questionType = this.assignmentService.getTpoSpeakingQ1Q2Type();
		}
		else if(this.questionIndex == 3 || this.questionIndex == 4){
			questionType = this.assignmentService.getTpoSpeakingQ3Q4Type();
		}
		else{
			questionType = this.assignmentService.getTpoSpeakingQ5Q6Type();
		}

		return questionType;
	}
}
