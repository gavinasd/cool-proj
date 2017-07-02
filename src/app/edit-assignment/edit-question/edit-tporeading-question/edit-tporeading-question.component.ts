import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AssignmentService} from "../../../services/assignment.service";
import {HttpService} from "../../../services/http.service";
import {ToastService} from "../../../services/toast.service";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";
import {Question} from "../../../models/Questions/Question";

@Component({
  selector: 'app-edit-tporeading-question',
  templateUrl: 'edit-tporeading-question.component.html',
  styleUrls: ['edit-tporeading-question.component.css']
})
export class EditTporeadingQuestionComponent implements OnInit {
	@Input() assignmentId;
	@Input() groupId;
	protected questionGroup:QuestionGroup;
	content:string;

	constructor(private assignmentService:AssignmentService,
				private httpService:HttpService,
				private toastService:ToastService) {

	}

	ngOnInit() {
		this.assignmentService.getQuestionGroupById(this.assignmentId, this.groupId)
			.subscribe((group:QuestionGroup)=>{
				this.questionGroup = group;
				this.content = this.questionGroup.content;
			});
	}

	addContent(form:NgForm){
		this.content = form.value.passageContent;
		this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.groupId, this.content)
			.subscribe((assignment)=>{
				console.log(assignment);
				//清空input
				form.resetForm();
			});
	}

	addQuestion(form:NgForm):boolean{
		let question = new TPOReadingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : Question.TPO_READING_TYPE,
			passage:form.value.passage,
			question : form.value.question,
			options : [form.value.option1,form.value.option2,
				form.value.option3,form.value.option4],
			answer:form.value.answer
		});

		console.log(question);
		this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
			.subscribe(
				(resp)=> {
					console.log(resp);
					this.toastService.success("成功提交");
					form.reset();
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}
}
