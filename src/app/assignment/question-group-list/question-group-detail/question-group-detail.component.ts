import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../models/Questions/Question";
import {Mode} from "../../../models/assignments/Assignment";

@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.css']
})
export class QuestionGroupDetailComponent implements OnInit {
	@Input() mode:Mode;
	@Input() groupContent:string;
	@Input() question:Question;
	@Input() lastAnswer:string;
	@Input() markingScore:number;
	@Input() shouldShowContent:boolean;
	@Input() questionIndex:number;
	@Input() questionListLength:number;
	@Output() OnChangeAnswer:EventEmitter<string> = new EventEmitter<string>();
	@Output() OnMarkScore:EventEmitter<number> = new EventEmitter<number>();
	public ModeType = Mode;
	public answer:string;

	constructor() {
	}

	ngOnInit() {
	}


	changeAnswer(){
		this.OnChangeAnswer.emit(this.answer);
	}

	markScore(score: number){
		this.OnMarkScore.emit(score);
	}

	public homeworkMode():boolean{
		return this.mode == this.ModeType.HomeWork;
	}

	public markingMode():boolean{
		return this.mode == this.ModeType.Marking;
	}

	public reviewMode():boolean{
		return this.mode == this.ModeType.Review;
	}

	public correct():boolean {
		return this.markingScore == this.question.score;
	}

	getPagerContent(){
		if(!this.shouldShowContent) {
				return 'Question ' + (this.questionIndex + 1) + ' of ' +
				(this.questionListLength);
		}
		else{
			return '';
		}
	}

}
