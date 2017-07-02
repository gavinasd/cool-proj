import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {Question} from "../../../models/Questions/Question";
import {VocabularyQuestion} from "../../../models/Questions/VocabularyQuestion";

@Component({
	selector: 'app-vocabulary-item',
	templateUrl: './vocabulary-item.component.html',
	styleUrls: ['./vocabulary-item.component.css']
})
export class VocabularyItemComponent implements OnInit {
	@Input() group:QuestionGroup;
	wordList:any[];
	questionList:VocabularyQuestion[];

	constructor() { }

	ngOnInit() {
		this.wordList = JSON.parse(this.group.content);
		this.questionList = <VocabularyQuestion[]> this.group.questionList;
	}

}
