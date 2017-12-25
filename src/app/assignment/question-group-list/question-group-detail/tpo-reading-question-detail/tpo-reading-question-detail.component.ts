import {
	Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef,
	AfterViewChecked
} from '@angular/core';
import {TPOReadingQuestion} from "../../../../models/Questions/TPOReadingQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {Convert09ToAZPipe} from "../../../../shared/pipes/convert09-to-az.pipe";

@Component({
  selector: 'app-tpo-reading-question-detail',
  templateUrl: './tpo-reading-question-detail.component.html',
  styleUrls: ['./tpo-reading-question-detail.component.css']
})
export class TpoReadingQuestionDetailComponent extends QuestionGroupDetailComponent
	implements OnInit,OnChanges,AfterViewChecked {
	public tpoReadingQuestion: TPOReadingQuestion;
	public passage: string = '';

	@ViewChild('passageContainer') passageContainer:ElementRef;
	@Input() viewMode:string = 'question';

	selectedAnswers:number[]=[-1,-1,-1];
	private scrollQuestionId:string; //用来保存已经滚过的题目，不至于重复滚动

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
		if(this.groupContent.length > 0) {
			this.passage = JSON.parse(this.groupContent).passage;
		}
		this.tpoReadingQuestion = <TPOReadingQuestion>this.question;
	}

	ngAfterViewChecked(): void {
		if(this.tpoReadingQuestion.id == this.scrollQuestionId){
			return;
		}
		this.scroll();
		this.scrollQuestionId = this.tpoReadingQuestion.id;
	}

	scroll():void{
		if(!this.passageContainer){
			return;
		}
		let paragraphNum = 0;
		let scrollTop = 0;
		for(let e of this.passageContainer.nativeElement.children){
			while(e.childNodes[0].className == 'star'){
				e.removeChild(e.childNodes[0]);
			}
		}
		for(let e of this.passageContainer.nativeElement.children){
			if(e.innerText.length > 1){
				if(paragraphNum >= this.tpoReadingQuestion.paragraph){
					let newItem=document.createElement("span");
					let textnode=document.createTextNode("♦ ");
					newItem.style.fontSize = '19px';
					newItem.className='star';
					newItem.appendChild(textnode);

					if(e.childNodes[0].className !='star'){
						e.insertBefore(newItem, e.childNodes[0]);
					}
					break;
				}

				paragraphNum ++ ;
			}
			scrollTop += e.offsetHeight
				+ parseInt(getComputedStyle(e).marginTop) + parseInt(getComputedStyle(e).marginBottom);
		}

		if(this.tpoReadingQuestion.paragraph == 1){
			this.passageContainer.nativeElement.scrollTop = 0;
		} else {
			this.passageContainer.nativeElement.scrollTop = scrollTop - 10;
		}

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
