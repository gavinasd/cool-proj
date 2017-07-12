import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {VocabularyQuestion} from "../../../../models/Questions/VocabularyQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";

@Component({
  selector: 'app-vocabulary-question-detail',
  templateUrl: './vocabulary-question-detail.component.html',
  styleUrls: ['./vocabulary-question-detail.component.css']
})
export class VocabularyQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges {
	answer:string;
	wordList:any[];
	question:VocabularyQuestion;

	constructor() {
		super();
	}

	ngOnInit() {
		super.ngOnInit();
	}


	ngOnChanges(changes: SimpleChanges): void {
		super.setContentPage(1);    //单词练习，只需要展示一页的单词列表即可
		super.ngOnChanges(changes);
		super.getCurrentQuestion().subscribe((question:VocabularyQuestion)=>{
			if(question) {
				this.question = question;
				this.answer = super.getLastAnswer(question.id);
			}
		});
		if(super.getGroupContent() && super.getGroupContent().length > 0){
			this.wordList = JSON.parse(this.group.content);
		}
	}

	//学生的回答发生了改变
	changeAnswer(){
		console.log('answer',this.answer);
		super.updateLastAnswer();
	}


}

