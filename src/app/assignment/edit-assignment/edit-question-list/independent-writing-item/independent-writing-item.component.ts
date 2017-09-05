import {Component, Input, OnInit} from '@angular/core';
import {IndependentWritingQuestion} from "../../../../models/Questions/IndependentWritingQuestion";
import {QuestionGroup} from "../../../../models/Questions/QuestionGroup";

@Component({
  selector: 'app-independent-writing-item',
  templateUrl: './independent-writing-item.component.html',
  styleUrls: ['./independent-writing-item.component.css']
})
export class IndependentWritingItemComponent implements OnInit {
	@Input() group:QuestionGroup;
	questionList:IndependentWritingQuestion[];

	constructor() { }

	ngOnInit() {
		this.questionList = <IndependentWritingQuestion[]> this.group.questionList;
	}
}
