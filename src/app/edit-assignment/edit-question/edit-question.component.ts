import { Component, OnInit } from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Question, TPOReadingQuestion} from "../../models/models";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: 'edit-question.component.html',
  styleUrls: ['edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
	private assignmentId:string;
	private question:any = new Question();
	types:any[] = [
		{name:'TPO阅读', value:'tpo_reading'},
		{name:'选择题',value:'choose_question'}];

	constructor(private route:ActivatedRoute,
				private toastService:ToastService,
				private httpService:HttpService,
				private assignmentService:AssignmentService) {
		this.route.params.forEach((param:Params)=>{
			this.assignmentId = param['assignmentId'];
		});
	}

	ngOnInit() {}

	onSubmit(form:any):boolean{
		let question = new TPOReadingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : form.questionType,
			passage : form.passage,
			question : form.question,
			options : [form.option1,form.option2,form.option3,form.option4],
			answer:form.answer
		});

		console.log(question);
		this.assignmentService.addQuestion(this.assignmentId,question)
			.subscribe(
				(resp)=> {
					console.log(resp);
					this.toastService.success("成功提交");
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}

}

class QuestionType{
	name:string;
	value:string;
}
