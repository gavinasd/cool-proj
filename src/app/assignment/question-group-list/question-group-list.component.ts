import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {AssignmentService} from "../../services/assignment.service";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {Observable} from "rxjs/Observable";
import {Mode} from "../../models/assignments/Assignment";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../redux/index.reducer";
import * as fromApplication from '../../redux/index.reducer';
import * as assignmentActions from '../../redux/assignment/assignment.actions';
import {Question} from "../../models/Questions/Question";

@Component({
  selector: 'app-question-group-list',
  templateUrl: './question-group-list.component.html',
  styleUrls: ['./question-group-list.component.css']
})
export class QuestionGroupListComponent implements OnInit,OnDestroy {
	/**
	 * 题目列表一共分成3种模式
	 * 做题模式，批改模式，查看模式
	 */
	public mode:Mode;
	public assignmentId:string;
	public studentId:string;    //老师所需要查看成绩内容的学生id
	public classId:string;
	public assignmentName$:Observable<string>;
	public group$:Observable<QuestionGroup>;
	public groupType$:Observable<string>;
	public groupContent$:Observable<string>;
	public shouldShowContent$:Observable<boolean>;

	public questionIndex$:Observable<number>;
	public currentQuestion$:Observable<Question>;
	public questionListLength$:Observable<number>;
	public lastAnswer$:Observable<string>;
	public markingScore$:Observable<number>;

	public complete$:Observable<boolean>;
	public errMessage$:Observable<string>;
	public loading$:Observable<boolean>;

	constructor(private route:ActivatedRoute,
	            private toastService:ToastService,
	            public assignmentService:AssignmentService,
				public router:Router,
	            private store:Store<ApplicationState>
	) {
		this.route.params.forEach((param:Params)=>{
			this.classId = param['classId'];
			this.assignmentId = param['assignmentId'];
			this.studentId = param['studentId'];
			this.mode = param['mode'];
		});

		this.loading$ = this.store.select(fromApplication.getLoading);
		this.errMessage$ = this.store.select(fromApplication.getErrMessage);
		this.complete$ = this.store.select(fromApplication.getComplete);

		this.assignmentName$ = this.store.select(fromApplication.getAssignmentName);
		this.group$ = this.store.select(fromApplication.getCurrentGroup);
		this.groupType$ = this.store.select(fromApplication.getGroupType);
		this.groupContent$ = this.store.select(fromApplication.getGroupContent);
		this.shouldShowContent$ = this.store.select(fromApplication.shouldShowContent);

		this.currentQuestion$ = this.store.select(fromApplication.getCurrentQuestion);
		this.questionIndex$ = this.store.select(fromApplication.getQuestionIndex);
		this.questionListLength$ = this.store.select(fromApplication.getQuestionListLength);
		this.lastAnswer$ = this.store.select(fromApplication.getLastAnswer);
		this.markingScore$ = this.store.select(fromApplication.getMarkingScore);
	}

	ngOnInit() {
		this.complete$.subscribe((complete) => {
			if(complete){
				this.router.navigate(['/class/' + this.classId]);
			}
		});

		this.errMessage$.subscribe((errMessage) => {
			console.log(errMessage);
		});

		this.store.dispatch(new assignmentActions.FetchAssignmentAction({
			assignmentId: this.assignmentId,
			studentId: this.studentId
		}));

		this.store.dispatch(new assignmentActions.FetchInfoAction({
			assignmentId: this.assignmentId,
			studentId: this.studentId
		}));
	}

	changeAnswer(answer: string){
		this.store.dispatch(new assignmentActions.SetStudentAnswerAction(answer));
	}

	changeScore(score: number){
		this.store.dispatch(new assignmentActions.SetMarkingScoreAction(score));
	}

	changeSpendTime(time: number){
		this.store.dispatch(new assignmentActions.SetSpendTimeAction(time));
	}

	next(){
		this.store.dispatch(new assignmentActions.SubmitAction({
			classId: this.classId,
			assignmentId: this.assignmentId,
			studentId: this.studentId
		}));

		this.loading$.filter(loading => !loading).first().subscribe(loading => {
			this.store.dispatch(new assignmentActions.NextAction());
		})

	}

	pre(){
		this.store.dispatch(new assignmentActions.PreAction());
	}

	ngOnDestroy(): void {
		this.store.dispatch(new assignmentActions.ResetAction());
	}

//获取所有的groupList,并且设置上next和pre的切换功能
	// setupGroupList(){
	// 	this.assignmentService.getQuestionGroupList(this.assignmentId, this.studentId)
	// 		.subscribe((groupList:QuestionGroup[])=>{
	// 			this.groupList = groupList;
	// 			this.groupLength = this.groupList.length;
	//
	// 			this.index = this.changeIndex.scan((index: number, sign: boolean) => {
	// 				if(sign && index == this.groupLength - 1){
	// 					this.router.navigate(['/class/' + this.classId]);
	// 					return;
	// 				}
	//
	// 				if (sign && index < this.groupLength - 1) {
	// 					index++;
	// 				} else if (!sign && index > 0) {
	// 					index--;
	// 				}
	// 				console.log("index", "change to:" + index);
	//
	// 				return index;
	// 			}, 1);
	//
	// 			this.index.subscribe((i)=>{
	// 				if(i < this.groupLength && i >= 0){
	// 					this.group = this.groupList[i];
	// 				}
	// 			});
	// 		});
	//
	//
	// }
/**
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

 **/

}
