import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {TPOReadingQuestion} from "../../../models/Questions/TPOReadingQuestion";

@Component({
  selector: 'app-tpo-reading-item',
  templateUrl: './tpo-reading-item.component.html',
  styleUrls: ['./tpo-reading-item.component.css']
})
export class TpoReadingItemComponent implements OnInit {
	@Input() group:QuestionGroup;
	questionList:TPOReadingQuestion[];

	constructor() { }

	ngOnInit() {
		this.questionList = <TPOReadingQuestion[]> this.group.questionList;

	}

}
