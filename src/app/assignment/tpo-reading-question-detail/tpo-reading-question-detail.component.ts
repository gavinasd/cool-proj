import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Question, TPOReadingQuestion} from "../../models/models";
import has = Reflect.has;

@Component({
  selector: 'app-tpo-reading-question-detail',
  templateUrl: 'tpo-reading-question-detail.component.html',
  styleUrls: ['tpo-reading-question-detail.component.css']
})
export class TpoReadingQuestionDetailComponent implements OnInit,OnChanges {
	answer:string;
	lastContent:LastContent[] = [];          //[questionId,content]列表
	@Input() question:TPOReadingQuestion;
	@Output() onAnswerChanged:EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

    ngOnChanges(changes: SimpleChanges): void {
	    //先找到上一次做题的内容
	    let thatLastContent = this.lastContent.find(
	        (lastContent:LastContent)=>lastContent.questionId == this.question.question);

		if(!thatLastContent){
		    //内存里面并没有上次作答的内容，那么当前内容就是数据库中保存的内容
            this.answer = this.question.content;
        }
        else {
		    this.answer = thatLastContent.content;
        }
		this.changeAnswer();
    }

    //学生的回答发生了改变
	changeAnswer(){
	    let hasContent = false;
        this.lastContent.forEach((lastContent:LastContent)=>{
            if(lastContent.questionId == this.question.question){
                lastContent.content = this.answer;
                hasContent = true;
            }
        });
        if(!hasContent){
            this.lastContent.push(new LastContent(this.question.question, this.answer));
        }

		this.onAnswerChanged.emit(this.answer);
	}

	convert09ToAz(i:number){
	    return String.fromCharCode(65 + i);
    }
}

class LastContent{
    public questionId:string;
    public content:string;

    constructor(questionId:string, content:string){
        this.questionId = questionId;
        this.content = content;
    }
}