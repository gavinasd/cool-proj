import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {Question, TPOReadingQuestion} from "../../models/models";

@Component({
	selector: 'app-question-detail',
	templateUrl: 'question-detail.component.html',
	styleUrls: ['question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit,OnDestroy {
    @Output() onAnswerChange = new EventEmitter<string>();
	question:any = new Question();
	answer:string = "";

	constructor(private assignmentService:AssignmentService) {}

	ngOnDestroy(): void {
		this.assignmentService.reset();
	}

	ngOnInit() {
		this.assignmentService.question.subscribe((quest:any)=>{
		        let question = quest.question;
				console.log(quest);
				console.log(question);
				switch (question.questionType){
					case Question.TPO_READING_TYPE:
						this.question = new TPOReadingQuestion(question,quest.content);
						console.log(this.question);
						break;
					default:
						console.log("default");
						this.question = question;
				}

		});
	}

	changeAnswer(content:string){
		this.answer = content;
		this.onAnswerChange.emit(this.answer);
	}
}
