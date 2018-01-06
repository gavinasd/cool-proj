import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question} from "../../../models/Questions/Question";
import {Mode} from "../../../models/assignments/Assignment";

@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.css']
})
export class QuestionGroupDetailComponent implements OnInit {
	@Input() assignmentName:string;     //这个变量是专门用来传递给header使用的
	@Input() classId:string;
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
	@Output() OnNext:EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() OnPre:EventEmitter<boolean> = new EventEmitter<boolean>();
	public ModeType = Mode;
	public answer:string;
	public showPreButton:boolean = true;
	public showNextButton:boolean = true;
	public disableNextButton:boolean = false;

	constructor() {
	}

	ngOnInit() {
	}

	pre(){
		this.OnPre.emit(true);
	}

	next(){
		this.OnNext.emit(true);
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
