import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AssignmentService} from "../../../services/assignment.service";
import {VocabularyQuestion} from "../../../models/Questions/VocabularyQuestion";
import {HttpService} from "../../../services/http.service";
import {ToastService} from "../../../services/toast.service";
import {Question} from "../../../models/Questions/Question";
import {NgForm} from "@angular/forms";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";

@Component({
  selector: 'app-edit-vocabulary-question',
  templateUrl: './edit-vocabulary-question.component.html',
  styleUrls: ['./edit-vocabulary-question.component.css']
})export class EditVocabularyQuestionComponent implements OnInit {
	@Input() assignmentId;
	@Input() groupId;
	protected questionGroup:QuestionGroup;
	wordList:Vocabulary[] = [];

	constructor(private assignmentService:AssignmentService,
	            private httpService:HttpService,
				private toastService:ToastService
	) { }

	ngOnInit() {
		this.assignmentService.getQuestionGroupById(this.assignmentId, this.groupId)
			.subscribe((group:QuestionGroup)=>{
				this.questionGroup = group;
				this.wordList = JSON.parse(this.questionGroup.content);
			});
	}

	addOneWord(form:NgForm){
		let newWord:Vocabulary = new Vocabulary(form.value.english, form.value.chinese);
		this.wordList.push(newWord);
		this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.groupId,
			JSON.stringify(this.wordList))
			.subscribe((assignment)=>{
				console.log(assignment);
				//清空input
				form.resetForm();
			});
	}

	addQuestion(form:NgForm):boolean{
		let question = new VocabularyQuestion({
			creator:this.httpService.getCurrentId(),
			questionType : Question.VOCABULARY_TYPE,
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

	public play(word:string){
		let audio = new Audio('http://dict.youdao.com/dictvoice?type=2&audio='+word);
		audio.play();
	}
}

class Vocabulary{
	constructor(public english:string, public chinese:string){

	}
}


