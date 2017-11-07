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

	setupCheckboxAnswer(){
		if(this.question && this.question.questionType == this.assignmentService.getTpoListeningMultipleChoice()){
			this.checkboxAnswers = [false, false, false, false];
			if(this.answer.includes('A')){
				this.checkboxAnswers[0] = true;
			}
			if(this.answer.includes('B')){
				this.checkboxAnswers[1] = true;
			}
			if(this.answer.includes('C')){
				this.checkboxAnswers[2] = true;
			}
			if(this.answer.includes('D')){
				this.checkboxAnswers[3] = true;
			}
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
