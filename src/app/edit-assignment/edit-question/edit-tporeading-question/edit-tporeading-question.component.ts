import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {environment} from "../../../../environments/environment";
import {AssignmentService} from "../../../core/services/assignment.service";
import {HttpService} from "../../../core/services/http.service";
import {ToastService} from "../../../core/services/toast.service";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";

@Component({
  selector: 'app-edit-tporeading-question',
  templateUrl: './edit-tporeading-question.component.html',
  styleUrls: ['./edit-tporeading-question.component.css']
})
export class EditTporeadingQuestionComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() groupId: string;
	protected questionGroup:QuestionGroup;
	editorPassage:string;                //用来接收Editor里面的内容
	public questionType:string;          //用来接收题目的类型

	public EditorOptions = environment.studentEditorOptions;

	constructor(public assignmentService:AssignmentService,
				private httpService:HttpService,
				private toastService:ToastService) {
		this.questionType = assignmentService.getTPOReadingSingleChoice();
	}

	ngOnInit() {
		this.EditorOptions.height = 300;
		this.EditorOptions.placeholderText = '输入文章段落';
		this.assignmentService.getQuestionGroupById(this.assignmentId, this.groupId)
			.subscribe((group: QuestionGroup) => {
				this.questionGroup = group;
			});
	}

	addQuestion(form:NgForm):boolean{
		let question = new TPOReadingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : this.questionType,
			passage: this.editorPassage,
			question : form.value.question,
			options : this.getOptionList(form),
			answer:form.value.answer,
			score:this.questionType == this.assignmentService.getTPOReadingTopic()?2:1
		});

		console.log(question);
		this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
			.subscribe(
				(resp)=> {
					console.log(resp);
					this.toastService.success("成功提交");
					this.editorPassage = '';
					this.questionType = this.assignmentService.getTPOReadingSingleChoice();
					form.reset();
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}

	getOptionList(form:NgForm):String[]{
		return this.questionType == this.assignmentService.getTPOReadingTopic()?
			[form.value.option1,form.value.option2,form.value.option3,form.value.option4,form.value.option5,form.value.option6]:
			[form.value.option1,form.value.option2,form.value.option3,form.value.option4];
	}
}
