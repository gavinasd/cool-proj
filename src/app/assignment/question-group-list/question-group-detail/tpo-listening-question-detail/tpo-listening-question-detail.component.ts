import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {TPOListeningQuestion} from "../../../../models/Questions/TPOListeningQuestion";
import {AssignmentService} from "../../../../core/services/assignment.service";
import {Convert09ToAZPipe} from "../../../../shared/pipes/convert09-to-az.pipe";
import {Mode} from "../../../../models/assignments/Assignment";

@Component({
  selector: 'app-tpo-listening-question-detail',
  templateUrl: './tpo-listening-question-detail.component.html',
  styleUrls: ['./tpo-listening-question-detail.component.css']
})
export class TpoListeningQuestionDetailComponent
	extends QuestionGroupDetailComponent implements OnInit,OnChanges,OnDestroy {
	public tpoListeningQuestion: TPOListeningQuestion;
	public recordUrl:string;
	public passage:string;
	public previousQuestionId:String = '';
	public checkboxAnswers:boolean[] = [false,false,false,false];
	public sequenceAnswers:boolean[];
	private myAudio:any;
	@Input() contentIndex:number;

	constructor(public assignmentService:AssignmentService, public convert09ToAZ:Convert09ToAZPipe) {
		super();
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(this.groupContent.length > 0) {
			this.recordUrl = JSON.parse(this.groupContent).recordUrl;
			this.passage = JSON.parse(this.groupContent).passage;
		}
		this.answer = this.lastAnswer;
		this.setupCheckboxAnswer();
		this.setupSequenceAnswer();
		this.setupHeader();

		if(this.contentIndex == 0){
			this.stopPlayRecord();
			this.previousQuestionId = '';
		}

		if(this.contentIndex != 0
			&& this.question && this.question.id !== this.previousQuestionId) {
			this.previousQuestionId = this.question.id;
			this.tpoListeningQuestion = <TPOListeningQuestion>this.question;
			if(super.homeworkMode()){
				this.playRecord();
			}
		}
	}

	ngOnDestroy(): void {
		this.stopPlayRecord();
	}

	getQuestionForTableChoiceQuestion(question: string):string{
		return JSON.parse(question).question || '';
	}

	getRowsForTableChoiceQuestion(question: string): string[]{
		return JSON.parse(question).tableRows || [];
	}

	changeTableChoiceAnswer(value: string){
		this.answer = value;
		this.changeAnswer();
	}

	setupCheckboxAnswer(){
		if(this.question && this.question.questionType == this.assignmentService.getTpoListeningMultipleChoice()){
			this.checkboxAnswers = this.getChecboxAnswer(this.answer);
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

	setupSequenceAnswer(){
		if(this.question && this.question.questionType == 'tpo_listening_sequence_type'){
			this.sequenceAnswers = this.getChecboxAnswer(this.answer);
		}
	}

	changeSequenceAnswer(){
		for(let i = 0; i < this.sequenceAnswers.length; i++){
			const answer = this.convert09ToAZ.transform(i);
			const index = this.answer.indexOf(answer);
			if(this.sequenceAnswers[i] && index <0 ){
				this.answer += answer;
			}
			if(!this.sequenceAnswers[i] && index >=0 ){
				this.answer = this.answer.slice(0,index) + this.answer.slice(index+1);
			}
		}
	}

	getChecboxAnswer(answer: string): boolean[]{
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

	playRecord(){
		if(this.contentIndex == 0){
			//如果正在播放题目的录音，应该暂停
			this.stopPlayRecord();
			//这个时候还在听文章，返回
			return;
		}

		if (this.tpoListeningQuestion && this.tpoListeningQuestion.recordUrl.length > 0) {
			this.stopPlayRecord();
			if(this.question.questionType !== this.assignmentService.getTpoListeningRepeatQuestion()){
				this.myAudio = new Audio(this.tpoListeningQuestion.recordUrl);
				this.myAudio.play();
			}
			else{
				const repeatUrl = this.tpoListeningQuestion.recordUrl.replace("question","repeat");
				this.myAudio = new Audio(repeatUrl);
				this.myAudio.play();

				this.myAudio.addEventListener('ended',()=>{
					this.myAudio = new Audio(this.tpoListeningQuestion.recordUrl);
					this.myAudio.play();
				});
			}

		}
	}

	stopPlayRecord(){
		if(this.myAudio){
			this.myAudio.pause();
		}
	}

	setupHeader(){
		if(this.mode == Mode.HomeWork){
			this.showPreButton = false;
			if(!this.answer || this.answer.length == 0){
				this.disableNextButton = true;
			}
			else {
				this.disableNextButton = false;
			}
		}

	}


}
