import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpService} from "./http.service";
import {ResponseToQuestion, AssignmentInfo} from "../models/models";
import {Question} from "../models/Questions/Question";
import {Assignment} from "../models/assignments/Assignment";
import {QuestionGroup} from "../models/Questions/QuestionGroup";
import {LastAnswer} from "../models/Questions/LastAnswer";

@Injectable()
export class AssignmentService {

    public questionList: Observable<any[]>
    public question: Observable<any>;
    public currentQuestionId: string;
    public index: Observable<number> = Observable.from([0]);
    public changeIndex: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpService: HttpService) {
    }

    public getTPOReadingQuestionType():string{
    	return Question.TPO_READING_TYPE;
    }

	public getVocabularyQuestionType():string{
		return Question.VOCABULARY_TYPE;
	}

	public getQuestionTypes():any[] {
		return[
			{'value':Question.TPO_READING_TYPE, 'name':'TPO阅读题'},
			{'value':Question.VOCABULARY_TYPE, 'name':'词汇题'}
		]
	}

    /**
     * 因为会使用assignmentService来存储一些内容，当assginment退出的时候，需要清理掉这些数据
     */
    public reset() {
        this.questionList = Observable.from([]);
        this.index = Observable.from([0]);
        this.changeIndex = new BehaviorSubject<boolean>(false);
    }

    public getQuestionListByAssignment(assignmentId: string): Observable<Question[]> {
        let url = environment.getAssignmentDetailUrl;
        url = url + '/' + this.httpService.getCurrentId() + '/' + assignmentId;
        let questionListLength = 0;
        this.changeIndex.next(false);
        this.questionList = this.httpService.makeGetWithToken(url)
            .map((resp) => {
                let list = resp.json().results;
                questionListLength = list.length;
                return list;
            });
        this.index = this.changeIndex.scan((index: number, sign: boolean) => {

            if (sign && index < questionListLength - 1) {
                index++;
            } else if (!sign && index > 0) {
                index--;
            }
            console.log("index", "change to:" + index);

            return index;
        }, 1);
        this.question = this.index.combineLatest(this.questionList,
            (index: number, questionList: any[]) => {

                if (questionList.length > 0) {
                    return questionList[index];
                }
            });
        this.question.subscribe((question: any) => {
            this.currentQuestionId = question.question._id;
        });
        return this.questionList;
    }

    public addResponseToQuestion(response: ResponseToQuestion): Observable<ResponseToQuestion> {
        let url = environment.addResponseUrlToQuestionUrl;
        var body = JSON.stringify({
            'userId': response.creator,
            'classId': response.class,
            'assignmentId': response.assignment,
            'questionId': response.question,
            'content': response.content
        });
        return this.httpService.makePostWithToken(url, body)
            .map(resp => resp.json())
            .catch(HttpService.handleError);
    }

    public addQuestionToGroup(assignmentId: string, groupId: string, question: Question): Observable<Question> {
        let url = environment.addQuestionToGroupUrl;
        var body = JSON.stringify({
	        'userId': this.httpService.getCurrentId(),
            'assignmentId': assignmentId,
            'groupId': groupId,
            'question': question
        });

        console.log(body);
        return this.httpService.makePostWithToken(url, body)
            .map(resp => resp.json()).catch(HttpService.handleError);
    }

    public getAssignmentList(classId: string): Observable<AssignmentInfo[]> {
        let url = environment.getAssignmentListUrl;
        let userId = this.httpService.getCurrentId();
        url = url + '/' + classId + '/' + userId;
        return this.httpService.makeGetWithToken(url)
            .map(resp => resp.json().gradeInfo).catch(HttpService.handleError);
    }

    public getAllAssignmentList(): Observable<Assignment[]> {
        let url = environment.getAllAssignmentListUrl;
        let userId = this.httpService.getCurrentId();
        url = url + '/' + userId;
        return this.httpService.makeGetWithToken(url)
            .map((resp) =>{
        	    let assignmentList:Assignment[]= [];
        	    for(let assignment of resp.json().assignmentList){
        	    	assignmentList.push(new Assignment(assignment));
	            }
	            return assignmentList;
            })
	        .catch(HttpService.handleError);
    }

    public getAssignmentName(assignmentId: string): Observable<string> {
        let url = environment.getAssignmentByIdUrl;
        url = url + '/' + assignmentId;
        console.log(url);
        return this.httpService.makeGetWithToken(url)
            .map(resp => resp.json().assignment.assignmentName)
            .catch(HttpService.handleError);
    }

    public getQuestionGroupList(assignmentId: string):Observable<QuestionGroup[]>{
    	let url = environment.getQuestionGroupListUrl;
    	url = url + '/' + assignmentId;
    	return this.httpService.makeGetWithToken(url)
		    .map((resp) =>{
			    let groupList : QuestionGroup[] = [];
    		    for(let questionGroup of resp.json().questionGroupList){
    		    	let group = new QuestionGroup(questionGroup);
    		    	groupList.push(group);
		        }
		        return groupList;
		    })
		    .catch(HttpService.handleError);
    }

    public getQuestionLastAnswer(assignmetnId: string):Observable<any[]>{
	    let url = environment.getQuestionLastAnswerUrl;
	    url = url + '/' + this.httpService.getCurrentId() + '/' + assignmetnId;

	    return this.httpService.makeGetWithToken(url)
		    .map((resp)=>{
	    	    let results:LastAnswer[] = [];
	    	    for(let result of resp.json().results){
	    	    	results.push(new LastAnswer(result));
		        }
		        return results;
		    });
    }

    public getQuestionGroupById(assignmentId: string, questionGroupId:string):Observable<QuestionGroup>{
    	let url = environment.getQuestionGroupByIdUrl;
    	url = url + '/' + assignmentId + '/' + questionGroupId;

    	return this.httpService.makeGetWithToken(url)
		    .map((resp)=>{
    		    let questionGroup = new QuestionGroup(resp.json().questionGroup);
    		    return questionGroup;
		    })
    }

    public getAssignmentGradeDetail(assignmentId:string, userId?:string):Observable<any[]>{
        let url = environment.getAssignmentDetailUrl;
        if(!userId){
        	userId = this.httpService.getCurrentId();
        }
        url = url + '/' + userId + '/' + assignmentId;
        return this.httpService.makeGetWithToken(url)
            .map(resp=>resp.json().results)
            .catch(HttpService.handleError);
    }

    public addAssignmentToClass(classId:string, assignmentId:string):Observable<any[]>{
        let url = environment.addAssignmentToClassUrl;
        var body = JSON.stringify({
            'userId': this.httpService.getCurrentId(),
            'classId':classId,
            'assignmentId':assignmentId
        });
        return this.httpService.makePostWithToken(url, body)
            .map(resp => resp.json())
            .catch(HttpService.handleError);
    }

    public createAssignment(assignmentName:string,):Observable<Assignment>{
		let url = environment.createAssignmentUrl;
		var body = JSON.stringify({
			'creator': this.httpService.getCurrentId(),
			'assignmentName': assignmentName
		});
		return this.httpService.makePostWithToken(url,body)
			.map(resp => resp.json().assignment)
			.catch(HttpService.handleError);
    }

    public getAssignmentById(assignmentId:string):Observable<any>{
	    let url = environment.getAssignmentByIdUrl;
	    url = url + '/' + assignmentId;
	    console.log(url);
	    return this.httpService.makeGetWithToken(url)
		    .map(resp => resp.json())
		    .catch(HttpService.handleError);
    }

    public updateQuestionGroupContent(assignmentId:string, groupId:string, content:string):Observable<any>{
    	let url = environment.updateQuestionGroupContentUrl;
	    var body = JSON.stringify({
		    'assignmentId': assignmentId,
		    'groupId': groupId,
		    'content': content
	    });

	    console.log('updating content:' + content);

	    return this.httpService.makePutWithToken(url,body)
		    .map(resp => resp.json())
		    .catch(HttpService.handleError);
    }

    public addQuestionGroupToAssignment(assignmentId:string, type:string):Observable<QuestionGroup>{
    	let url = environment.addQuestionGroupToAssignmentUrl;
	    let body = JSON.stringify({
		    'userId':this.httpService.getCurrentId(),
		    'assignmentId': assignmentId,
		    'type': type
	    });

	    return this.httpService.makePostWithToken(url,body)
		    .map( resp=> resp.json().questionGroup)
		    .catch( HttpService.handleError);
    }
}
