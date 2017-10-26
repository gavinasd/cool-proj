import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AssignmentService} from "../../../core/services/assignment.service";
import {HttpService} from "../../../core/services/http.service";
import {ToastService} from "../../../core/services/toast.service";
import {Question} from "../../../models/Questions/Question";
import {IntegratedWritingQuestion} from "../../../models/Questions/IntegratedWritingQuestion";

@Component({
  selector: 'app-edit-integrated-writing-question',
  templateUrl: './edit-integrated-writing-question.component.html',
  styleUrls: ['./edit-integrated-writing-question.component.css']
})
export class EditIntegratedWritingQuestionComponent implements OnInit {
	@Input() assignmentId: string;
	@Input() groupId: string;
	passage:string;                 //用来接收Editor里面的passage内容,其实就是综合写作里面的阅读材料
	recordUrl:string;
	answer:string;                  //用来接收Editor里面的answer内容,其实就是一篇范文
	public recordUrlList:String[];
	public teacherOptions = environment.teacherEditorOptions;

	constructor(private assignmentService:AssignmentService,
                private httpService:HttpService,
                private toastService:ToastService) { }

    ngOnInit() {
		this.recordUrlList = Array(36).fill(0).map((x,i) => {
			return 'tpo-integrated-writing-' + (i+1);
		});

		this.teacherOptions.height = 300;

    }

    submit(){
		this.addQuestionContent();
		this.addQuestion();
    }

    addQuestionContent(){
		let body = JSON.stringify({
			'passage':this.passage,
			'recordUrl':this.recordUrl
		});

		this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.groupId, body)
			.subscribe((assignment)=>{
				this.passage = '';
			});
    }

	addQuestion():boolean{
		let question = new IntegratedWritingQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : Question.INTEGRATED_WRITING_TYPE,
			question : '',
			answer: this.answer,
			score: 5
		});

		this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
			.subscribe(
				(resp)=> {
					this.toastService.success("成功提交");
					this.answer = '';
				},
				(error:string)=>this.toastService.error(error)

			);
		return false;
	}

}
