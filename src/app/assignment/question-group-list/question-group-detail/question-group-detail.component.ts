import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {QuestionGroup} from "../../../models/Questions/QuestionGroup";
import {Question} from "../../../models/Questions/Question";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {LastAnswer} from "../../../models/Questions/LastAnswer";

@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.css']
})
export class QuestionGroupDetailComponent implements OnInit,OnChanges {
	@Input() group:QuestionGroup;
	@Input() lastAnswerList:any[];
	@Output() onNextGroup:EventEmitter<string> = new EventEmitter<string>();
	@Output() onPreGroup:EventEmitter<string> = new EventEmitter<string>();
	@Output() onChangeAnswer:EventEmitter<LastAnswer> = new EventEmitter<LastAnswer>();
	@Output() onSubmitAnswer:EventEmitter<LastAnswer> = new EventEmitter<LastAnswer>();
	public currentQuestion:Observable<Question>;
	public questionList:Question[];
	public contentPage:number = 0;
	public indexValue:number;            //和Observable的index同步
	public index: Observable<number> = Observable.from([0]);
	public changeIndex: Subject<boolean> = new BehaviorSubject<boolean>(false);
	public answer:string;

	constructor() {
	}

	ngOnInit() {
	}

	//如果有change，就reset一下
	ngOnChanges(changes: SimpleChanges): void {
		this.questionList = [];
		this.index = Observable.from([0]);
		this.changeIndex = new BehaviorSubject<boolean>(false);
		this.setupQuestionList();
	}

	//获取所有的questionList,并且设置上next和pre的切换功能
	setupQuestionList(){
		this.questionList = this.group.questionList;

		this.index = this.changeIndex.scan((index: number, sign: boolean) => {
			if(sign && index == this.questionList.length + this.contentPage - 1){
				this.onNextGroup.emit('next');
				return index;
			}

			if(!sign && index == 0){
				this.onPreGroup.emit('pre');
			}

			if (sign && index < this.questionList.length + this.contentPage - 1) {
				index++;
			} else if (!sign && index > 0) {
				index--;
			}
			console.log("index", "change to:" + index);

			return index;
		}, 1);

		this.currentQuestion = this.index.map((i)=>{
			this.indexValue = i;

			//还需要显示content里面的内容
			if(i >= 0 && i < this.contentPage){
				this.showContent(i);
			}
			else if(i < this.questionList.length + this.contentPage && i >= this.contentPage){
				return this.questionList[i - this.contentPage];
			}
		});
	}

	//获取这个学生上次做这一份作业时候保存的内容
	public getLastAnswer(questionId:string):string{
		for(let lastContent of this.lastAnswerList){
			if(lastContent.questionId == questionId){
				return lastContent.lastAnswer;
			}
		}
		return '';
	}

	//答案改变了，那么需要保存下这次的内容
	public updateLastAnswer(){
		if(this.indexValue - this.contentPage >= 0) {
			this.onChangeAnswer.emit(new LastAnswer({
				'questionId': this.questionList[this.indexValue - this.contentPage].id,
				'lastAnswer': this.answer
			}));
		}
	}

	public submitAnswer(){
		if(this.indexValue - this.contentPage >= 0) {
			this.onSubmitAnswer.emit(new LastAnswer({
				'questionId': this.questionList[this.indexValue - this.contentPage].id,
				'lastAnswer': this.answer
			}));
		}
	}

	public getContentPage():number{
		return this.contentPage;
	}

	public setContentPage(pages: number){
		this.contentPage = pages;
	}

	public getCurrentQuestion():Observable<Question>{
		return this.currentQuestion;
	}

	public getCurrentIndex():number{
		return this.indexValue;
	}

	public getQuestionLength():number{
		return this.questionList.length;
	}

	public getGroupContent():string{
		return this.group.content;
	}

	next(){
		this.updateLastAnswer();
		this.submitAnswer();
		this.changeIndex.next(true);
	}

	pre(){
		this.changeIndex.next(false);
	}

	//更新pager上显示的内容
	getPagerContent(){
		if(this.indexValue >= this.contentPage) {
			return '第' + (this.indexValue - this.contentPage + 1) + '题/' +
				'共' + (this.getQuestionLength()) + '题';
		}
		else{
			return '';
		}
	}

	//显示questionGroup里面的content内容，由子类来统一实现
	public showContent(index:number){}

}
