import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {TPOSpeakingQuestion} from "../../../../models/Questions/TPOSpeakingQuestion";
import {environment} from "../../../../../environments/environment";
import {QuestionType} from "../../../../shared/enums/QuestionType";
import {Mode} from "../../../../shared/enums/Mode";

@Component({
	selector: 'app-tpo-speaking-question-detail',
	templateUrl: './tpo-speaking-question-detail.component.html',
	styleUrls: ['./tpo-speaking-question-detail.component.scss']
})
export class TpoSpeakingQuestionDetailComponent extends QuestionGroupDetailComponent
	implements OnInit, OnChanges {
	public tpoSpeakingQuestion: TPOSpeakingQuestion;
	public directionComplete: boolean;
	public passageComplete: boolean;
	public dialogComplete: boolean;
	public questionComplete: boolean;
	public comment: string;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (JSON.stringify(this.tpoSpeakingQuestion) == JSON.stringify(this.question)) {
			//不应该refresh
			return;
		}
		this.tpoSpeakingQuestion = <TPOSpeakingQuestion>this.question;
		this.directionComplete = false;
		this.passageComplete = false;
		this.dialogComplete = false;
		this.questionComplete = false;
		this.comment = this.getComment();

		this.setupHeader();
	}

	setupHeader() {
		if (this.mode == Mode.HomeWork) {
			this.showPreButton = false;
			if (!this.directionComplete) {
				this.showNextButton = true;
			}
			else {
				this.showNextButton = false;
			}
		}

	}

	next() {
		if (this.mode == Mode.HomeWork && !this.directionComplete) {
			this.completeDirection();
		}
		else {
			super.next();
		}
	}

	completeDirection() {
		this.directionComplete = true;
		this.setupHeader();
	}

	completeQuestion() {
		this.questionComplete = true;
		this.setupHeader();
	}

	completePassage() {
		this.passageComplete = true;
		this.setupHeader();
	}

	completeDialog() {
		this.dialogComplete = true;
		this.setupHeader();
	}

	completeRecording(filename: string) {
		this.answer = JSON.stringify({
			'filename': filename
		});
		this.changeAnswer();
		super.next();
	}

	//老师的评价
	makeComment() {
		this.answer = JSON.stringify({
			'filename': (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).filename) || "",
			'comment': this.comment
		});
		this.changeAnswer();
	}

	shouldShowQuestion(): boolean {
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q1Q2_TYPE) {
			return this.directionComplete;
		}
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q3Q4_TYPE) {
			return this.directionComplete && this.passageComplete && this.dialogComplete;
		}
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q5Q6_TYPE) {
			return this.directionComplete && this.dialogComplete;
		}
	}

	getPrepareTime(): number {
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q1Q2_TYPE) {
			return 15;
		}
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q3Q4_TYPE) {
			return 30
		}
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q5Q6_TYPE) {
			return 20;
		}
	}

	getResponseTime(): number {
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q1Q2_TYPE) {
			return 45;
		}
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q3Q4_TYPE) {
			return 60;
		}
		if (this.tpoSpeakingQuestion.questionType == QuestionType.TPO_SPEAKING_Q5Q6_TYPE) {
			return 60;
		}
	}

	getStudentRecordUrl(): string {
		if (!this.lastAnswer || this.lastAnswer.length == 0) {
			return '';
		}
		return (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).filename || '');
	}

	getComment(): string {
		if (!this.lastAnswer || this.lastAnswer.length == 0) {
			return '';
		}
		return (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).comment || '');
	}
}
