import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../../models/Questions/QuestionGroup";
import {AssignmentService} from "../../../../services/assignment.service";
import {HttpService} from "../../../../services/http.service";
import {ToastService} from "../../../../services/toast.service";
import {NgForm} from "@angular/forms";
import {Question} from "../../../../models/Questions/Question";
import {IndependentWritingQuestion} from "../../../../models/Questions/IndependentWritingQuestion";

@Component({
  selector: 'app-edit-independent-writing-question',
  templateUrl: './edit-independent-writing-question.component.html',
  styleUrls: ['./edit-independent-writing-question.component.css']
})
export class EditIndependentWritingQuestionComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() groupId: string;
	protected questionGroup:QuestionGroup;
	question:string;                //用来接收Editor里面的question内容
	answer:string;                  //用来接收Editor里面的answer内容,其实就是一篇范文

	public EditorOptions: Object= {
		wordPasteModal:false,
		placeHolder:'请输入',
	};

	constructor(private assignmentService:AssignmentService,
	            private httpService:HttpService,
	            private toastService:ToastService) {

	}

	ngOnInit() {
		this.assignmentService.getQuestionGroupById(this.assignmentId, this.groupId)
			.subscribe((group: QuestionGroup) => {
				this.questionGroup = group;
			});
	}

	addQuestion(form:NgForm):boolean{
		let question = new IndependentWritingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : Question.INDEPENDENT_WRITING_TYPE,
			question : this.question,
			answer: this.answer,
			score: 5
		});

		console.log(question);
		this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
			.subscribe(
				(resp)=> {
					console.log(resp);
					this.toastService.success("成功提交");
					this.question = '';
					this.answer = '';
					form.reset();
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}

}