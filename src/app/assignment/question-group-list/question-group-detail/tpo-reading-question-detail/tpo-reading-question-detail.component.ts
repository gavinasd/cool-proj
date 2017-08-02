import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {TPOReadingQuestion} from "../../../../models/Questions/TPOReadingQuestion";
import {Mode} from "../../../../models/assignments/Assignment";
import {Question} from "../../../../models/Questions/Question";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";

@Component({
  selector: 'app-tpo-reading-question-detail',
  templateUrl: './tpo-reading-question-detail.component.html',
  styleUrls: ['./tpo-reading-question-detail.component.css']
})
export class TpoReadingQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges {
	constructor() {
		super();
	}


	ngOnInit() {
	}


	ngOnChanges(changes: SimpleChanges): void {
		this.answer = this.lastAnswer;
		this.question = <TPOReadingQuestion>this.question;
	}

}
