import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {TPOReadingQuestion} from "../../../../models/Questions/TPOReadingQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";

@Component({
  selector: 'app-tpo-reading-question-detail',
  templateUrl: './tpo-reading-question-detail.component.html',
  styleUrls: ['./tpo-reading-question-detail.component.css']
})
export class TpoReadingQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges {
	public tpoReadingQuestion: TPOReadingQuestion;

	constructor() {
		super();
	}


	ngOnInit() {
	}


	ngOnChanges(changes: SimpleChanges): void {
		this.answer = this.lastAnswer;
		this.tpoReadingQuestion = <TPOReadingQuestion>this.question;
	}

}
