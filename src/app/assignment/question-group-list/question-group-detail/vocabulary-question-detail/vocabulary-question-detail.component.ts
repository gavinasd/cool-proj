import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {VocabularyQuestion} from "../../../../models/Questions/VocabularyQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {Question} from "../../../../models/Questions/Question";

@Component({
  selector: 'app-vocabulary-question-detail',
  templateUrl: './vocabulary-question-detail.component.html',
  styleUrls: ['./vocabulary-question-detail.component.css']
})
export class VocabularyQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges {

	@Input() showContent: boolean;
	wordList:any[];

	constructor() {
		super();
	}

	ngOnInit() {
	}


	ngOnChanges(changes: SimpleChanges): void {
		this.answer = this.lastAnswer;
		if(this.groupContent.length > 0) {
			this.wordList = JSON.parse(this.groupContent);
		}
		this.question = <VocabularyQuestion>this.question;
	}


}

