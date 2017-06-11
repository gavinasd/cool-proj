import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpService} from "./http.service";
import {ResponseToQuestion, Question, AssignmentInfo} from "../models/models";

@Injectable()
export class AssignmentService {

    public questionList: Observable<any[]>
    public question: Observable<any>;
    public currentQuestionId: string;
    public index: Observable<number> = Observable.from([0]);
    public changeIndex: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpService: HttpService) {
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

    public addQuestion(assignmentId: string, question: Question): Observable<Question> {
        let url = environment.addQuestionUrl;
        var body = JSON.stringify({
            assignmentId: assignmentId,
            question: question
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

    public getAllAssignmentList(): Observable<any[]> {
        let url = environment.getAllAssignmentListUrl;
        let userId = this.httpService.getCurrentId();
        url = url + '/' + userId;
        return this.httpService.makeGetWithToken(url)
            .map(resp => resp.json().assignmentList).catch(HttpService.handleError);
    }

    public getAssignmentName(assignmentId: string): Observable<string> {
        let url = environment.getAssignmentByIdUrl;
        url = url + '/' + assignmentId;
        console.log(url);
        return this.httpService.makeGetWithToken(url)
            .map(resp => resp.json().assignment.assignmentName)
            .catch(HttpService.handleError);
    }

    public getAssignmentGradeDetail(assignmentId:string):Observable<any[]>{
        let url = environment.getAssignmentDetailUrl;
        url = url + '/' + this.httpService.getCurrentId() + '/' + assignmentId;
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
}
