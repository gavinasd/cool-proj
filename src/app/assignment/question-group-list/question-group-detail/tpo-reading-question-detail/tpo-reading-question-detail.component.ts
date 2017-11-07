import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TPOReadingQuestion} from "../../../../models/Questions/TPOReadingQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {Convert09ToAZPipe} from "../../../../shared/pipes/convert09-to-az.pipe";

@Component({
  selector: 'app-tpo-reading-question-detail',
  templateUrl: './tpo-reading-question-detail.component.html',
  styleUrls: ['./tpo-reading-question-detail.component.css']
})
export class TpoReadingQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges {
	public tpoReadingQuestion: TPOReadingQuestion;
	@Input() viewMode:string = 'question';

	selectedAnswers:number[]=[-1,-1,-1];

	constructor(public convert09ToAZ:Convert09ToAZPipe) {
		super();
	}


	ngOnInit() {
	}


	ngOnChanges(changes: SimpleChanges): void {
		this.answer = this.lastAnswer;
		if(this.question.questionType == 'tpo_reading_topic'){
			if(this.answer.length != 3){
				this.answer = '   ';
			}
			this.selectedAnswers = this.parseAnswerForTopicQuestion(this.answer);
		}

		this.tpoReadingQuestion = <TPOReadingQuestion>this.question;
	}

	changeView(){
		if(this.viewMode == 'question'){
			this.viewMode = 'text';
		}
		else{
			this.viewMode = 'question';
		}
	}

	dropAnswer(indexToReplace, data : any){
		const indexToSelect = data.dragData;
		this.selectedAnswers[indexToReplace] = indexToSelect;
		this.answer = this.getAnswerForTopicQuestion();
		super.changeAnswer();
	}

	removeAnswer(indexToRemove){
		this.selectedAnswers[indexToRemove] = -1;
		this.answer = this.getAnswerForTopicQuestion();
		super.changeAnswer();
	}

	getAnswerForTopicQuestion(){
		return this.selectedAnswers
			.map((answerIndex)=>{
				if(answerIndex < 0){
					return ' ';
				}
				else{
					return this.convert09ToAZ.transform(answerIndex);
				}})
			.reduce((preValue, currentValue)=>{
				return preValue + currentValue;
			});
	}

	parseAnswerForTopicQuestion(answer:string):number[]{
		let answers:number[];
		answers = answer.split('').map((value)=>{
			if(value == ' '){
				return -1;
			}
			else if(value == 'A'){
				return 0;
			}
			else if(value == 'B'){
				return 1;
			}
			else if(value == 'C'){
				return 2;
			}
			else if(value == 'D'){
				return 3;
			}
			else if(value == 'E'){
				return 4;
			}
			else if(value == 'F'){
				return 5;
			}
		});
		return answers;
	}

}
