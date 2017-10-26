import {Component, Input, OnInit} from '@angular/core';
import {VocabularyQuestion} from "../../../models/Questions/VocabularyQuestion";
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";

@Component({
	selector: 'edit-app-vocabulary-item',
	templateUrl: './edit-vocabulary-item.component.html',
	styleUrls: ['./edit-vocabulary-item.component.css']
})
export class EditVocabularyItemComponent implements OnInit {
	@Input() group:QuestionGroup;
	wordList:any[];
	questionList:VocabularyQuestion[];

	constructor() { }

	ngOnInit() {
		if(this.group.content) {
			this.wordList = JSON.parse(this.group.content);
		}
		this.questionList = <VocabularyQuestion[]> this.group.questionList;
	}

}
