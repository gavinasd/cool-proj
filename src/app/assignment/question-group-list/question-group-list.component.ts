import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {HttpService} from "../../services/http.service";
import {AssignmentService} from "../../services/assignment.service";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ResponseToQuestion} from "../../models/models";
import {LastAnswer} from "../../models/Questions/LastAnswer";

@Component({
  selector: 'app-question-group-list',
  templateUrl: './question-group-list.component.html',
  styleUrls: ['./question-group-list.component.css']
})
export class QuestionGroupListComponent implements OnInit {
	public assignmentId:string;
	public assignmentName:string;
	public classId:string;
	public groupList:QuestionGroup[] = [];
	public groupLength:number = 0;
	public questionLastAnswer:LastAnswer[] = [];
	public group:QuestionGroup = new QuestionGroup({});
	public index: Observable<number> = Observable.from([0]);
	public changeIndex: Subject<boolean> = new BehaviorSubject<boolean>(false);


	constructor(private route:ActivatedRoute,
	            private toastService:ToastService,
	            private httpService:HttpService,
	            public assignmentService:AssignmentService,
				public router:Router
	) {
		this.route.params.forEach((param:Params)=>{
			this.classId = param['classId'];
			this.assignmentId = param['assignmentId'];
		});
	}

	ngOnInit() {
		this.setupHeader();
		this.setupGroupList();
		this.getLastAnswer();
	}

	//获取这个作业的名字
	setupHeader(){
		this.assignmentService.getAssignmentName(this.assignmentId)
			.subscribe(
				(assignmentName)=>{
					console.log("assignmentName",assignmentName);
					this.assignmentName = assignmentName;
				},
				(err)=>{
					console.log(err);
				});
	}

	//获取所有的groupList,并且设置上next和pre的切换功能
	setupGroupList(){
		this.assignmentService.getQuestionGroupList(this.assignmentId)
			.subscribe((groupList:QuestionGroup[])=>{
				this.groupList = groupList;
				this.groupLength = this.groupList.length;

				this.index = this.changeIndex.scan((index: number, sign: boolean) => {
					if(sign && index == this.groupLength - 1){
						this.router.navigate(['/class/' + this.classId]);
						return;
					}

					if (sign && index < this.groupLength - 1) {
						index++;
					} else if (!sign && index > 0) {
						index--;
					}
					console.log("index", "change to:" + index);

					return index;
				}, 1);

				this.index.subscribe((i)=>{
					if(i < this.groupLength && i >= 0){
						this.group = this.groupList[i];
					}
				});
			});


	}

	getLastAnswer(){
		this.assignmentService.getQuestionLastAnswer(this.assignmentId)
			.subscribe((lastAnswerList:LastAnswer[])=>{
				this.questionLastAnswer = lastAnswerList;
			})
	}

	updateLastAnswer(lastAnswer:LastAnswer){
		let questionId = lastAnswer.questionId;
		let answer = lastAnswer.lastAnswer;

		let hasContent = false;
		this.questionLastAnswer.forEach((cacheAnswer:LastAnswer)=>{
			if(cacheAnswer.questionId == questionId){
				cacheAnswer.lastAnswer = answer;
				hasContent = true;
			}
		});
		if(!hasContent){
			this.questionLastAnswer.push(new LastAnswer({
				'questionId':questionId,
				'lastAnswer':answer
			}));
		}
	}

	next(){
		this.changeIndex.next(true);
	}

	pre(){
		this.changeIndex.next(false);
	}

	//提交回答Response
	submitAnswer(lastAnswer:LastAnswer) {
		let answer = lastAnswer.lastAnswer;
		let questionId = lastAnswer.questionId;
		if(!answer || answer.length == 0){
			return;
		}
		var response:ResponseToQuestion = new ResponseToQuestion({
			creator: this.httpService.getCurrentId(),
			class:this.classId,
			assignment:this.assignmentId,
			question:questionId,
			content:answer
		});
		this.assignmentService.addResponseToQuestion(response)
			.subscribe(
				(response)=>{
					//学生已经更新了自己的选择，把这个选择缓存进lastContentList中
					this.updateLastAnswer(lastAnswer);
				},
				(error:string)=>{
					console.log(error);
					this.toastService.error(error);
				}
			);
	}
}
