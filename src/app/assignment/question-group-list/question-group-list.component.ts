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
import {Mode} from "../../models/assignments/Assignment";
import {MarkingScore, MarkingScoreToQuestion} from "../../models/Questions/MarkingScore";

@Component({
  selector: 'app-question-group-list',
  templateUrl: './question-group-list.component.html',
  styleUrls: ['./question-group-list.component.css']
})
export class QuestionGroupListComponent implements OnInit {
	/**
	 * 题目列表一共分成3种模式
	 * 做题模式，批改模式，查看模式
	 */
	public mode:Mode;
	public assignmentId:string;
	public studentId:string;    //老师所需要查看成绩内容的学生id
	public assignmentName:string;
	public classId:string;
	public groupList:QuestionGroup[] = [];
	public groupLength:number = 0;
	public questionLastAnswer:LastAnswer[] = [];
	public questionMarkingScore:MarkingScore[] = [];
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
			this.studentId = param['studentId'];
			this.mode = param['mode'];
		});
	}

	ngOnInit() {
		this.setupHeader();
		this.setupGroupList();
		this.getLastAnswer();
		this.getMarkingScore();
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
		this.assignmentService.getQuestionLastAnswer(this.assignmentId, this.studentId)
			.subscribe((lastAnswerList:LastAnswer[])=>{
				this.questionLastAnswer = lastAnswerList;
			});
	}

	updateLastAnswer(lastAnswer:LastAnswer){
		//只有不是在查看模式下才有可能更新lastAnswer
		if(this.mode !== Mode.Review) {
			let questionId = lastAnswer.questionId;
			let answer = lastAnswer.lastAnswer;

			let hasContent = false;
			this.questionLastAnswer.forEach((cacheAnswer: LastAnswer) => {
				if (cacheAnswer.questionId == questionId) {
					cacheAnswer.lastAnswer = answer;
					hasContent = true;
				}
			});
			if (!hasContent) {
				this.questionLastAnswer.push(new LastAnswer({
					'questionId': questionId,
					'lastAnswer': answer
				}));
			}
		}
	}

	//提交回答Response
	submitAnswer(lastAnswer:LastAnswer) {
		//在查看模式下，不可能提交新的答案
		if(this.mode !== Mode.Review) {
			let answer = lastAnswer.lastAnswer;
			let questionId = lastAnswer.questionId;
			if (!answer || answer.length == 0) {
				return;
			}
			var response: ResponseToQuestion = new ResponseToQuestion({
				creator: this.studentId,
				class: this.classId,
				assignment: this.assignmentId,
				question: questionId,
				content: answer
			});
			this.assignmentService.addResponseToQuestion(response)
				.subscribe(
					(response) => {
						//学生已经更新了自己的选择，把这个选择缓存进lastContentList中
						this.updateLastAnswer(lastAnswer);
					},
					(error: string) => {
						console.log(error);
						this.toastService.error(error);
					}
				);
		}
	}

	getMarkingScore(){
		this.assignmentService.getQuestionMarkingScore(this.assignmentId, this.studentId)
			.subscribe((markingScoreList:MarkingScore[])=>{
				this.questionMarkingScore = markingScoreList;
			})
	}

	submitMarkingScore(markingScore:MarkingScore){

		//只有在批改模式下，才可能改变得分
		if(this.mode == Mode.Marking) {
			var score: MarkingScoreToQuestion = new MarkingScoreToQuestion({
				creator: this.studentId,
				class: this.classId,
				assignment: this.assignmentId,
				question: markingScore.questionId,
				score: markingScore.score
			});

			//首先update内存里面的分数情况
			let hasScore = false;
			this.questionMarkingScore.forEach((cacheScore: MarkingScore) => {
				if (cacheScore.questionId == markingScore.questionId) {
					cacheScore.score = markingScore.score;
					hasScore = true;
				}
			});
			if (!hasScore) {
				this.questionMarkingScore.push(new MarkingScore({
					'questionId': markingScore.questionId,
					'score': markingScore.score
				}));
			}

			//然后向服务器提交这一个score
			this.assignmentService.addMarkingScore(score)
				.subscribe(
					(response) => {
						//学生已经更新了自己的选择，把这个选择缓存进lastContentList中
					},
					(error: string) => {
						console.log(error);
						this.toastService.error(error);
					}
				);
		}
	}

	next(){
		this.changeIndex.next(true);
	}

	pre(){
		this.changeIndex.next(false);
	}

}
