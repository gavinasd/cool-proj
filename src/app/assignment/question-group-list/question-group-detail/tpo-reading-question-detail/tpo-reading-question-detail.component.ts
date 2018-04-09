import {
	Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef,
	AfterViewChecked
} from '@angular/core';
import {TPOReadingQuestion} from "../../../../models/Questions/TPOReadingQuestion";
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {Convert09ToAZPipe} from "../../../../shared/pipes/convert09-to-az.pipe";
import {Question} from "../../../../models/Questions/Question";
import index from "@angular/cli/lib/cli";
import {QuestionType} from "../../../../shared/enums/QuestionType";

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

	public checkboxAnswers:boolean[] = [false,false,false,false];

	selectedAnswers:number[]=[-1,-1,-1];
	private scrollQuestionId:string; //用来保存已经滚过的题目，不至于重复滚动

	categoryAnswers:number[][];

	constructor(public convert09ToAZ:Convert09ToAZPipe) {
		super();
	}


	ngOnInit() {
	}


	ngOnChanges(changes: SimpleChanges): void {
		this.answer = this.lastAnswer;
		this.tpoReadingQuestion = <TPOReadingQuestion>this.question;

		this.setupCheckboxAnswer();
		if(this.question.questionType == QuestionType.TPO_READING_TOPIC_TYPE){
			if(this.answer.length != 3){
				this.answer = '   ';
			}
			this.selectedAnswers = this.parseAnswerForTopicQuestion(this.answer);
		}
		if(this.question.questionType == QuestionType.TPO_READING_CATEGORY_TYPE) {
			this.categoryAnswers = this.parseAnswerForCategoryQuestion(this.answer);

		}
		if(this.groupContent.length > 0) {
			this.passage = JSON.parse(this.groupContent).passage;
		}
	}

	ngAfterViewChecked(): void {
		if(this.tpoReadingQuestion.questionId == this.scrollQuestionId){
			return;
		}
		this.scroll();
		this.scrollQuestionId = this.tpoReadingQuestion.questionId;
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

	setupCheckboxAnswer(){
		if(this.question && this.question.questionType == QuestionType.TPO_READING_MULTIPLE_TYPE){
			this.checkboxAnswers = this.getCheckboxAnswer(this.answer);
		}
	}

	changeCheckboxAnswer(){
		this.answer = this.checkboxAnswers.map((checked, index)=>{
			if(checked){
				return this.convert09ToAZ.transform(index);
			}
			else{
				return '';
			}
		}).reduce((answer, content)=>{
			return answer+content;
		});

		super.changeAnswer();
	}

	parseAnswerForCategoryQuestion(answer: string) {
		if(!answer || answer.length == 0){
			return Array.from({length: this.tpoReadingQuestion.categoryList.length})
				.map(()=>new Array());
		} else {
			return answer.split("-").map(answers => {
				return answers.split("").map(value => this.convertAZTo09(value));
			});
		}

	}

	dropCategoryAnswer(categoryIndex:number, data : any){
		const indexToSelect = data.dragData;
		this.categoryAnswers[categoryIndex].push(indexToSelect);
		this.categoryAnswers[categoryIndex] = this.categoryAnswers[categoryIndex].sort();
		this.answer = this.getAnswerForCategory();
		super.changeAnswer();
	}

	removeCategoryAnswer(categoryIndex: number, indexToRemove){
		const answers = this.categoryAnswers[categoryIndex].filter(value => value !== indexToRemove);
		this.categoryAnswers[categoryIndex] = answers;
		this.answer = this.getAnswerForCategory();
		super.changeAnswer();
	}

	getAnswerForCategory(): string{
		let answerForCategory = "";
		for(let i = 0; i < this.categoryAnswers.length; i++) {
			const answers = this.categoryAnswers[i];
			for(let answer of answers) {
				answerForCategory += this.convert09ToAZ.transform(answer);
			}
			if(i !== this.categoryAnswers.length - 1){
				answerForCategory += "-";
			}
		}
		return answerForCategory;
	}

	draggableFroCategory(index: number): boolean{
		return this.categoryAnswers.filter(answers => answers.includes(index)).length == 0;
	}

	getCheckboxAnswer(answer: string): boolean[]{
		let answers:boolean[] = Array.from({length: 6});
		if(answer.includes('A')){
			answers[0] = true;
		}
		if(answer.includes('B')){
			answers[1] = true;
		}
		if(answer.includes('C')){
			answers[2] = true;
		}
		if(answer.includes('D')){
			answers[3] = true;
		}
		if(answer.includes('E')){
			answers[4] = true;
		}
		if(answer.includes('F')){
			answers[5] = true;
		}
		return answers;
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


	convertAZTo09(value: string): number{
		return value.charCodeAt(0)-65;
	}
}
