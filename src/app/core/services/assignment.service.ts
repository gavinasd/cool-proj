import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {Question} from "../../models/Questions/Question";
import {environment} from "../../../environments/environment";
import {Assignment} from "../../models/assignments/Assignment";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {catchError, map} from "rxjs/operators";
import {MarkingScore, SpendTime, StudentAnswer} from "../../models/assignments/AssignmentInfo";

@Injectable()
export class AssignmentService {

    public questionList: Observable<any[]>
    public question: Observable<any>;
    public index: Observable<number> = Observable.from([0]);

    constructor(private httpService: HttpService) {
    }

    public getTPOReadingQuestionType():string{
    	return 'tpo_reading';
    }

    public getTPOReadingSingleChoice():string{
    	return Question.TPO_READING_SINGLE_TYPE;
    }

    public getTPOReadingInsertChoice():string{
    	return Question.TPO_READING_INSERT_TYPE;
    }

    public getTPOReadingTopic():string{
    	return Question.TPO_READING_TOPIC_TYPE;
    }

    public getTPOReadingMultipleChoice(): string{
    	return Question.TPO_READING_MULTIPLE_TYPE;
    }

	public getVocabularyQuestionType():string{
		return Question.VOCABULARY_TYPE;
	}

	public getIntegratedWritingType():string{
		return Question.INTEGRATED_WRITING_TYPE;
	}

	public getIndependentWritingType():string{
		return Question.INDEPENDENT_WRITING_TYPE;
	}

	public getTpoListeningSingleChoice():string{
    	return Question.TPO_LISTENING_SINGLE_CHOICE_TYPE;
	}

	public getTpoListeningMultipleChoice():string{
		return Question.TPO_LISTENING_MULTIPLE_CHOICE_TYPE;
	}

	public getTpoListeningRepeatQuestion():string{
    	return Question.TPO_LISTENING_REPEAT_TYPE;
	}

	public getTpoSpeakingQ1Q2Type():string{
    	return Question.TPO_SPEAKING_Q1Q2_TYPE;
	}

	public getTpoSpeakingQ3Q4Type():string{
		return Question.TPO_SPEAKING_Q3Q4_TYPE;
	}

	public getTpoSpeakingQ5Q6Type():string{
		return Question.TPO_SPEAKING_Q5Q6_TYPE;
	}

	public getAssignment(assignmentId: string):Observable<Assignment>{
		let url = environment.getAssignmentByIdUrl;
		url = url + '/' + assignmentId;
		return this.httpService.makeGetWithToken(url)
			.pipe(
				map(resp =>{
					return new Assignment(resp);
				}),
				catchError(HttpService.handleError<Assignment>('getAssignment'))
			)
	}

	public getAllAssignmentList(): Observable<Assignment[]> {
		let url = environment.getAllAssignmentListUrl;
		const userId = this.httpService.getCurrentId();
		url = url + '/' + userId;
		return this.httpService.makeGetWithToken(url)
			.pipe(
				map((resp) =>{
					let assignmentList:Assignment[]= [];
					for(let assignment of resp.assignmentList){
						assignmentList.push(new Assignment(assignment));
					}
					return assignmentList;
				}),
				catchError(HttpService.handleError<Assignment[]>('getAllAssignment'))
			);
	}

	/**
	 * 	获取学生的做题信息，学生提交作业
	 */
	public getAssignmentInfo(classId:string, assignmentId: string, studentId: string):Observable<any> {
		let url = environment.getAssignmentInfoUrl;
		url = url + '/' + classId + '/' + assignmentId + '/' + studentId;
		return this.httpService.makeGetWithToken(url)
			.pipe(
				map(resp =>{
					const data = resp;
					const spendTime:SpendTime = new SpendTime(false, data.spendTime);

					let studentAnswer: StudentAnswer = new StudentAnswer(false, new Map());
					for(let answerItem of data.studentAnswer){
						let questionId = answerItem.questionId;
						let answer = answerItem.studentAnswer;
						studentAnswer.answer.set(questionId, answer);
					}

					let markScore: MarkingScore = new MarkingScore(false, new Map());
					for(let scoreItem of data.markScore){
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

	public submitAssignmentInfo(data: any):Observable<any>{
		const url = environment.submitAssignmentInfoUrl;
		var body = JSON.stringify({
			'classId': data.classId,
			'assignmentId':data.assignmentId,
			'questionId': data.questionId,
			'studentId': data.studentId,
			'spendTime': data.spendTime,
			'studentAnswer': data.studentAnswer,
			'markScore': data.markScore
		});

		if (!data.spendTime && !data.studentAnswer && !data.markScore){
			return Observable.of('');
		}

		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp =>{
					console.log('submit info');
				}),
				catchError(HttpService.handleError<any>('submitAssignmentInfo'))
			);
	}

	public submitAssignmentDone(classId, studentId, assignmentId):Observable<any>{
		const url = environment.submitAssignmentDoneUrl;
		var body = JSON.stringify({
			'classId': classId,
			'studentId': studentId,
			'assignmentId':assignmentId,
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

	public createAssignment(assignmentName:string, type:string):Observable<Assignment>{
		const url = environment.createAssignmentUrl;
		const body = JSON.stringify({
			'creator': this.httpService.getCurrentId(),
			'assignmentName': assignmentName,
			'type':type
		});
		return this.httpService.makePostWithToken(url,body)
			.pipe(
				map(resp => resp.assignment),
				catchError(HttpService.handleError<Assignment>('createAssignment'))
			);
	}

	public addQuestionGroupToAssignment(assignmentId:string, type:string, content?: string):Observable<QuestionGroup>{
		const url = environment.addQuestionGroupToAssignmentUrl;
		let body;
		if(!content){
			body = JSON.stringify({
				'userId':this.httpService.getCurrentId(),
				'assignmentId': assignmentId,
				'type': type
			});
		} else {
			body = JSON.stringify({
				'userId': this.httpService.getCurrentId(),
				'assignmentId': assignmentId,
				'type': type,
				'content': content
			})
		}

		return this.httpService.makePostWithToken(url,body)
			.pipe(
				map( resp=> resp.questionGroup),
				catchError(HttpService.handleError<QuestionGroup>('addQuestionGroup'))
			);
	}

    public addQuestionToGroup(assignmentId: string, groupId: string, question: Question, index?: number): Observable<Question> {
        const url = environment.addQuestionToGroupUrl;
        let body;
		if(!index) {
			body = JSON.stringify({
				'userId': this.httpService.getCurrentId(),
				'assignmentId': assignmentId,
				'groupId': groupId,
				'question': question
			});
		} else{
			body = JSON.stringify({
				'userId': this.httpService.getCurrentId(),
				'assignmentId': assignmentId,
				'groupId': groupId,
				'question': question,
				'index' : index
			});
		}

        return this.httpService.makePostWithToken(url, body)
	        .pipe(
		        map(resp => resp),
		        catchError(HttpService.handleError<Question>('addQuestion'))
	        )
    }

	public updateQuestionGroupContent(assignmentId:string, groupId:string, content:string):Observable<any>{
		const url = environment.updateQuestionGroupContentUrl;
		var body = JSON.stringify({
			'assignmentId': assignmentId,
			'groupId': groupId,
			'content': content
		});

		return this.httpService.makePutWithToken(url,body)
			.pipe(
				map(resp => resp),
				catchError(HttpService.handleError<any>('updateGroupContent'))
			);
	}

	public updateQuestion(questionId:string, question:Question):Observable<any>{
		const url = environment.updateQuestionUrl;
		const body = JSON.stringify({
			'questionId':questionId,
			'userId': this.httpService.getCurrentId(),
			'question': question
		});

		return this.httpService.makePutWithToken(url, body)
			.pipe(
				catchError(HttpService.handleError<any>('updateQuestion'))
			);
	}

	public deleteGroup(assignmentId: string, groupId: string):Observable<any>{
		let url = environment.deleteGroupUrl;
		url = url + '/' + assignmentId + '/' + groupId + '/' + this.httpService.getCurrentId();
		return this.httpService.makeDeleteWithToken(url)
			.pipe(
				catchError(HttpService.handleError<any>('deleteGroup'))
			);
	}

	public deleteQuestion(assignmentId: string, questionId: string):Observable<any>{
		let url = environment.deleteQuestionUrl;
		url = url + '/' + assignmentId + '/' + questionId + '/' + this.httpService.getCurrentId();
		return this.httpService.makeDeleteWithToken(url)
			.pipe(
				catchError(HttpService.handleError<any>('deleteQuestion'))
			);
	}

	/**---------------------------------------------------------------------------------------------*/

    public getQuestionGroupById(assignmentId: string, questionGroupId:string):Observable<QuestionGroup>{
    	let url = environment.getQuestionGroupByIdUrl;
    	url = url + '/' + assignmentId + '/' + questionGroupId;

    	return this.httpService.makeGetWithToken(url)
		    .pipe(
			    map((resp)=>{
				    const questionGroup = new QuestionGroup(resp.questionGroup);
				    return questionGroup;
			    }),
			    catchError(HttpService.handleError<QuestionGroup>('getQuestionGroup'))
		    );
    }

    public uploadSpeakingRecord(formData:FormData):Observable<any>{
	    const url = environment.uploadSpeakingRecordUrl;

	    return this.httpService.uploadFile(url, formData)
		    .pipe(
			    catchError(HttpService.handleError<any>('uploadSpeakingRecord'))
		    );
    }
}
