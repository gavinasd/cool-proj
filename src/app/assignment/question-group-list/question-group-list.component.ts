import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AssignmentService} from "../../core/services/assignment.service";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {Observable} from "rxjs/Observable";
import {Mode} from "../../models/assignments/Assignment";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../redux/index.reducer";
import * as fromApplication from '../../redux/index.reducer';
import * as assignmentActions from '../../redux/assignment/assignment.actions';
import {Question} from "../../models/Questions/Question";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {SubmitConfirmDialogComponent} from "../../shared/view/dialogs/submit-confirm-dialog/submit-confirm-dialog.component";
import {ComponentCanDeactivate} from "../../core/services/route-guard.service";
import {filter, first, takeWhile} from "rxjs/operators";
import {interval} from "rxjs/observable/interval";

@Component({
  selector: 'app-question-group-list',
  templateUrl: './question-group-list.component.html',
  styleUrls: ['./question-group-list.component.css']
})
export class QuestionGroupListComponent implements OnInit,OnDestroy,ComponentCanDeactivate {
	/**
	 * 题目列表一共分成3种模式
	 * 做题模式，批改模式，查看模式
	 */
	public mode:Mode;
	public assignmentId:string;
	public studentId:string;    //老师所需要查看成绩内容的学生id
	public classId:string;
	private viewMode = 'question';
	public assignmentName$:Observable<string>;
	public assignmentScoreList$:Observable<any[]>;
	public group$:Observable<QuestionGroup>;
	public groupType$:Observable<string>;
	public groupContent$:Observable<string>;
	public contentIndex$:Observable<number>;
	public shouldShowContent$:Observable<boolean>;

	public questionIndex$:Observable<number>;
	public currentQuestion$:Observable<Question>;
	public currentQuestionType$:Observable<string>;
	public questionListLength$:Observable<number>;
	public lastAnswer$:Observable<string>;
	public markingScore$:Observable<number>;

	public complete$:Observable<boolean>;
	public errMessage$:Observable<string>;
	public loading$:Observable<boolean>;

	private alive:boolean = true;
	private complete:boolean = false;

	constructor(private route:ActivatedRoute,
	            public assignmentService:AssignmentService,
				public router:Router,
	            private store:Store<ApplicationState>,
	            private dialog: MatDialog
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
		this.assignmentScoreList$ = this.store.select(fromApplication.getAssignmentScoreList);
		this.group$ = this.store.select(fromApplication.getCurrentGroup);
		this.groupType$ = this.store.select(fromApplication.getGroupType);
		this.groupContent$ = this.store.select(fromApplication.getGroupContent);
		this.contentIndex$ = this.store.select(fromApplication.getContentIndex);
		this.shouldShowContent$ = this.store.select(fromApplication.shouldShowContent);

		this.currentQuestion$ = this.store.select(fromApplication.getCurrentQuestion);
		this.currentQuestionType$ = this.store.select(fromApplication.getCurrentQuestionType);
		this.questionIndex$ = this.store.select(fromApplication.getQuestionIndex);
		this.questionListLength$ = this.store.select(fromApplication.getQuestionListLength);
		this.lastAnswer$ = this.store.select(fromApplication.getLastAnswer);
		this.markingScore$ = this.store.select(fromApplication.getMarkingScore);
	}

	ngOnInit() {
		if(this.mode != Mode.HomeWork){
			this.group$.pipe(takeWhile(()=>this.alive)).subscribe(()=>{
				this.store.dispatch(new assignmentActions.SkipContentAction());
			});
		}

		this.complete$.pipe(takeWhile(()=>this.alive)).subscribe((complete) => {
			this.complete = complete;
			if(complete && this.mode != Mode.HomeWork){
				this.router.navigate(['/class/' + this.classId]);
				return;
			}
			else if(complete){
				this.openSubmitConfirmDialog();
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
			classId: this.classId,
			assignmentId: this.assignmentId,
			studentId: this.studentId
		}));

		this.autoSave();
	}

	skipContent(){
		this.store.dispatch(new assignmentActions.SkipContentAction());
	}

	changeAnswer(answer: string){
		this.store.dispatch(new assignmentActions.SetStudentAnswerAction(answer));
	}

	changeScore(score: number){
		this.store.dispatch(new assignmentActions.SetMarkingScoreAction(score));
		this.save();
	}

	next(){
		this.save();
		this.loading$.pipe(
			filter(loading => !loading),
			first()
		).subscribe(loading => {
			this.store.dispatch(new assignmentActions.NextAction());
		})
	}

	pre(){
		this.store.dispatch(new assignmentActions.PreAction());
	}

	autoSave() {
		//每分钟自动保存一次
		interval(60 * 1000).pipe(
			takeWhile(()=>this.alive)
		).subscribe(data => {
			this.save();
		});
	}

	save(){
		this.store.dispatch(new assignmentActions.SubmitAction({
			classId: this.classId,
			assignmentId: this.assignmentId,
			studentId: this.studentId
		}));
	}

	openSubmitConfirmDialog(){
		let config = new MatDialogConfig();
		config.width = '400px';
		this.dialog.open(SubmitConfirmDialogComponent, config).afterClosed()
			.subscribe(result => {
				if(!result || result == 'cancel'){
					this.store.dispatch(new assignmentActions.SetUnCompleteAction());
					return;
				}

				if(result == 'save'){
					this.router.navigate(['/class/' + this.classId]);
					return;
				}

				if(result == 'confirm'){
					this.assignmentService.submitAssignmentDone(this.classId, this.studentId, this.assignmentId)
						.subscribe((data)=>{
							console.log('确认提交' + data);
							this.router.navigate(['/class/' + this.classId]);
						});
				}
			});
	}

	@HostListener('window:beforeunload')
	canDeactivate():Observable<boolean>|boolean{
		if(+this.mode !== Mode.HomeWork || this.complete){
			return true;
		}
		return window.confirm('确定要离开作业吗?')
	}

	ngOnDestroy(): void {
		this.store.dispatch(new assignmentActions.ResetAction());
		this.alive = false;
	}

}
