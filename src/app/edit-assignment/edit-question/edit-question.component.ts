import { Component, OnInit } from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {Question} from "../../models/Questions/Question";
import {TPOReadingQuestion} from "../../models/Questions/TPOReadingQuestion";
import {Assignment} from "../../models/assignments/Assignment";

@Component({
  selector: 'app-edit-question',
  templateUrl: 'edit-question.component.html',
  styleUrls: ['edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
	public assignmentId:string;
	public questionGroupId:string;
	public questionType:string;
	private question:any = new Question({});

	constructor(private route:ActivatedRoute,
				private toastService:ToastService,
				private httpService:HttpService,
				public assignmentService:AssignmentService) {
		this.route.params.forEach((param:Params)=>{
			this.assignmentId = param['assignmentId'];
			this.questionGroupId = param['questionGroupId'];
			this.questionType = param['type'];
		});
	}

	ngOnInit() {
	}

	onChangeQuestionType(){

	}

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
		this.assignmentService.addQuestionToGroup(this.assignmentId, this.questionGroupId, question)
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
