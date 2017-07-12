import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {TPOReadingQuestion} from "../../../../models/Questions/TPOReadingQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";

@Component({
  selector: 'app-tpo-reading-question-detail',
  templateUrl: './tpo-reading-question-detail.component.html',
  styleUrls: ['./tpo-reading-question-detail.component.css']
})
export class TpoReadingQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges {
	answer:string;
	passage:string;
	question:TPOReadingQuestion;

	constructor() {
		super();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		super.setContentPage(0);    //TPO练习，不需要需要展示一页的文章题目，然后即可开始做题
		super.ngOnChanges(changes);
		super.getCurrentQuestion().subscribe((question:TPOReadingQuestion)=>{
			if(question) {
				this.question = question;
				this.answer = super.getLastAnswer(question.id);
			}
		});
		if(super.getGroupContent() && super.getGroupContent().length > 0){
			this.passage = JSON.parse(super.getGroupContent());
		}
	}

	//学生的回答发生了改变
	changeAnswer(){
		super.updateLastAnswer();
	}

}
