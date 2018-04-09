import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {Question} from "../../models/Questions/Question";
import {environment} from "../../../environments/environment";
import {Assignment} from "../../models/assignments/Assignment";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {catchError, map} from "rxjs/operators";
import {MarkingScore, SpendTime, StudentAnswer} from "../../models/assignments/AssignmentInfo";
import {HttpParams} from "@angular/common/http";
import {ResultVO} from "../../shared/VO/ResultVO";
import {AssignmentGradeVO} from "../../shared/VO/AssignmentGradeVO";
import {AssignmentInfoVO} from "../../shared/VO/AssignmentInfoVO";

@Injectable()
export class AssignmentService {

	public questionList: Observable<any[]>
	public question: Observable<any>;
	public index: Observable<number> = Observable.from([0]);

	constructor(private httpService: HttpService) {
	}

	public getAssignment(assignmentId: string): Observable<Assignment> {
		let url = environment.getAssignmentByIdUrl;
		url = url + '/' + assignmentId;
		return this.httpService.makeGetWithToken(url)
			.pipe(
				map(resp => {
					return new Assignment(resp.data);
				}),
				catchError(HttpService.handleError<Assignment>('getAssignment'))
			)
	}

	public getAllAssignmentList(): Observable<Assignment[]> {
		let url = environment.getAllAssignmentListUrl;
		let param = new HttpParams().set("userId", this.httpService.getCurrentId());
		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map((resp: any) => resp.data),
				catchError(HttpService.handleError<Assignment[]>('getAllAssignment'))
			);
	}

	/**
	 *    获取学生的做题信息，学生提交作业
	 */
	public getAssignmentInfo(courseId: string, assignmentId: string, studentId: string): Observable<any> {
		let url = environment.getAssignmentInfoUrl;
		let param = new HttpParams().set("courseId", courseId)
			.set("assignmentId", assignmentId)
			.set("studentId", studentId);

		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map((response: ResultVO<AssignmentInfoVO>) => {
					const resp = new AssignmentInfoVO(response.data);
					const spendTime: SpendTime = new SpendTime(false, resp.time);

					let studentAnswer: StudentAnswer = new StudentAnswer(false, new Map());
					for (let answerItem of resp.studentAnswerVOList) {
						let questionId = answerItem.questionId;
						let answer = answerItem.studentAnswer;
						studentAnswer.answer.set(questionId, answer);
					}

					let markScore: MarkingScore = new MarkingScore(false, new Map());
					for (let scoreItem of resp.scoreVOList) {
						let questionId = scoreItem.questionId;
						let score = scoreItem.score;
						markScore.score.set(questionId, score);
					}

					return {
						spendTime: spendTime,
						studentAnswer: studentAnswer,
						markScore: markScore
					};
				}),
				catchError(HttpService.handleError<any>('getAssignmentInfo'))
			)
	}

	public submitAssignmentInfo(data: any): Observable<any> {
		const url = environment.submitAssignmentInfoUrl;
		var body = JSON.stringify({
			'courseId': data.courseId,
			'assignmentId': data.assignmentId,
			'questionId': data.questionId,
			'studentId': data.studentId,
			'spendTime': data.spendTime,
			'studentAnswer': data.studentAnswer,
			'score': data.markScore
		});

		if (!data.spendTime && !data.studentAnswer && !data.markScore) {
			return Observable.of('');
		}

		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp => {
					console.log('submit info');
				}),
				catchError(HttpService.handleError<any>('submitAssignmentInfo'))
			);
	}

	public submitAssignmentDone(courseId, studentId, assignmentId): Observable<any> {
		const url = environment.submitAssignmentDoneUrl;
		var body = JSON.stringify({
			'courseId': courseId,
			'studentId': studentId,
			'assignmentId': assignmentId,
		});

		return this.httpService.makePutWithToken(url, body)
			.pipe(
				map(resp => {
					console.log((resp));
				}),
				catchError(HttpService.handleError<any>('submitAssignmentDone'))
			);
	}

	/**------------------------------------------------------------------------------*/

	/**
	 * 编辑一份新的作业，包括创建作业，添加group，添加question，更新groupContent
	 */

	public createAssignment(assignmentName: string, type: string): Observable<Assignment> {
		const url = environment.createAssignmentUrl;
		const body = JSON.stringify({
			'creator': this.httpService.getCurrentId(),
			'assignmentName': assignmentName,
			'type': type
		});
		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp => resp.data),
				catchError(HttpService.handleError<Assignment>('createAssignment'))
			);
	}

	public addQuestionGroupToAssignment(assignmentId: string, type: string, content?: string): Observable<QuestionGroup> {
		const url = environment.addQuestionGroupToAssignmentUrl;
		const body = JSON.stringify({
			'creator': this.httpService.getCurrentId(),
			'assignmentId': assignmentId,
			'type': type,
			'content': content ? content : ""
		});

		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp => resp.data),
				catchError(HttpService.handleError<QuestionGroup>('addQuestionGroup'))
			);
	}

	public addQuestionToGroup(assignmentId: string, groupId: string, question: Question, index?: number): Observable<Question> {
		const url = environment.addQuestionToGroupUrl;
		let body = JSON.stringify({
			'assignmentId': assignmentId,
			'groupId': groupId,
			'creator': this.httpService.getCurrentId(),
			'questionType': question.questionType,
			'index': index,
			'question': question
		});


		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp => resp.data),
				catchError(HttpService.handleError<Question>('addQuestion'))
			)
	}

	public updateQuestionGroupContent(assignmentId: string, groupId: string, content: string): Observable<any> {
		const url = environment.updateQuestionGroupContentUrl;
		var body = JSON.stringify({
			'assignmentId': assignmentId,
			'groupId': groupId,
			'userId': this.httpService.getCurrentId(),
			'content': content
		});

		return this.httpService.makePutWithToken(url, body)
			.pipe(
				map(resp => resp.data),
				catchError(HttpService.handleError<any>('updateGroupContent'))
			);
	}

	public updateQuestion(questionId: string, question: Question): Observable<any> {
		const url = environment.updateQuestionUrl;
		const body = JSON.stringify({
			'questionId': questionId,
			'userId': this.httpService.getCurrentId(),
			'questionContent': question
		});

		return this.httpService.makePutWithToken(url, body)
			.pipe(
				catchError(HttpService.handleError<any>('updateQuestion'))
			);
	}

	public deleteGroup(assignmentId: string, groupId: string): Observable<any> {
		let url = environment.deleteGroupUrl;
		url = url + '/' + assignmentId + '/' + groupId + '/' + this.httpService.getCurrentId();
		return this.httpService.makeDeleteWithToken(url)
			.pipe(
				catchError(HttpService.handleError<any>('deleteGroup'))
			);
	}

	public deleteQuestion(assignmentId: string, questionId: string): Observable<any> {
		let url = environment.deleteQuestionUrl;
		url = url + '/' + assignmentId + '/' + questionId + '/' + this.httpService.getCurrentId();
		return this.httpService.makeDeleteWithToken(url)
			.pipe(
				catchError(HttpService.handleError<any>('deleteQuestion'))
			);
	}

	/**---------------------------------------------------------------------------------------------*/

	public getQuestionGroupById(assignmentId: string, questionGroupId: string): Observable<QuestionGroup> {
		let url = environment.getQuestionGroupByIdUrl;
		url = url + '/' + assignmentId + '/' + questionGroupId;

		return this.httpService.makeGetWithToken(url)
			.pipe(
				map((resp) => {
					const questionGroup = new QuestionGroup(resp.questionGroup);
					return questionGroup;
				}),
				catchError(HttpService.handleError<QuestionGroup>('getQuestionGroup'))
			);
	}

	public uploadSpeakingRecord(formData: FormData): Observable<any> {
		const url = environment.uploadSpeakingRecordUrl;

		return this.httpService.uploadFile(url, formData)
			.pipe(
				catchError(HttpService.handleError<any>('uploadSpeakingRecord'))
			);
	}
}
