import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {TPOSpeakingQuestion} from "../../../../models/Questions/TPOSpeakingQuestion";
import {environment} from "../../../../../environments/environment";

@Component({
	selector: 'app-tpo-speaking-question-detail',
	templateUrl: './tpo-speaking-question-detail.component.html',
	styleUrls: ['./tpo-speaking-question-detail.component.css']
})
export class TpoSpeakingQuestionDetailComponent extends QuestionGroupDetailComponent
	implements OnInit, OnChanges {
	@Output() next:EventEmitter<boolean> = new EventEmitter<boolean>();
	public tpoSpeakingQuestion:TPOSpeakingQuestion;
	public directionComplete:boolean;
	public passageComplete:boolean;
	public dialogComplete:boolean;
	public questionComplete:boolean;
	public editorOption:any;
	public comment:string;

	constructor() {
		super();
	}

	ngOnInit() {
		this.editorOption = Object.create(environment.teacherEditorOptions);
		this.editorOption.placeholderText = '请写出评价';
		this.editorOption.height = 200;
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.tpoSpeakingQuestion = <TPOSpeakingQuestion>this.question;
		this.directionComplete = false;
		this.passageComplete = false;
		this.directionComplete = false;
		this.questionComplete = false;
		this.comment = this.getComment();
	}

	completeDirection(){
		this.directionComplete = true;
	}

	completeQuestion(){
		this.questionComplete = true;
	}

	completePassage(){
		this.passageComplete = true;
	}

	completeDialog(){
		this.dialogComplete = true;
	}

	completeRecording(filename:string){
		this.answer = JSON.stringify({
			'filename': filename
		});
		this.changeAnswer();
		this.next.emit(true);
	}

	//老师的评价
	makeComment(){
		this.answer = JSON.stringify({
			'filename': (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).filename) || "",
			'comment' : this.comment
		});
		this.changeAnswer();
	}

	shouldShowQuestion():boolean {
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q1q2_type'){
			return this.directionComplete;
		}
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q3q4_type'){
			return this.directionComplete && this.passageComplete && this.dialogComplete;
		}
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q5q6_type'){
			return this.directionComplete && this.dialogComplete;
		}
	}

	getPrepareTime():number{
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q1q2_type'){
			return 15;
		}
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q3q4_type'){
			return 30
		}
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q5q6_type'){
			return 20;
		}
	}

	getResponseTime():number{
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q1q2_type'){
			return 45;
		}
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q3q4_type'){
			return 60;
		}
		if(this.tpoSpeakingQuestion.questionType == 'tpo_speaking_q5q6_type'){
			return 60;
		}
	}

	getStudentRecordUrl():string{
		if(!this.lastAnswer || this.lastAnswer.length == 0){
			return '';
		}
		return environment.studentRecordUrl +
			(JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).filename || '');
	}

	getComment():string{
		if(!this.lastAnswer || this.lastAnswer.length == 0){
			return '';
		}
		return (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).comment || '');
	}
}
