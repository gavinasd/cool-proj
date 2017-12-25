import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {AssignmentService} from "../../../core/services/assignment.service";
import {HttpService} from "../../../core/services/http.service";
import {ToastService} from "../../../core/services/toast.service";
import {Question} from "../../../models/Questions/Question";
import {IndependentWritingQuestion} from "../../../models/Questions/IndependentWritingQuestion";
import {environment} from "../../../../environments/environment";

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

	public EditorOptions = environment.teacherEditorOptions;


	constructor(private assignmentService:AssignmentService,
	            private httpService:HttpService,
	            private toastService:ToastService) {
		this.EditorOptions.height = 250;
		this.EditorOptions.placeholderText = '请输入';
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
