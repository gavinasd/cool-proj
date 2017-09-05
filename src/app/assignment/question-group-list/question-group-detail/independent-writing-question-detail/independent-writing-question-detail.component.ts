import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {IndependentWritingQuestion} from "../../../../models/Questions/IndependentWritingQuestion";

@Component({
  selector: 'app-independent-writing-question-detail',
  templateUrl: './independent-writing-question-detail.component.html',
  styleUrls: ['./independent-writing-question-detail.component.css']
})
export class IndependentWritingQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges{
	public independentWritingQuestion: IndependentWritingQuestion;

	public EditorStudentOptions: Object= {
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: [],
		height: 500,
		quickInsertTags: [],
		spellcheck: false,
		events: {
			'froalaEditor.initialized': function (e, editor) {
				console.log(editor.toolbar.hide());
			}
		}
	};

	public EditorTeacherOptions: Object= {
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen','bold','italic','strikeThrough','color',],
		colorsText:['#d71345','#f58220','#ffe600','#bed742','#1d953f','#2b4490','#000000'],
		height: 500,
		quickInsertTags: [],
		spellcheck: true,
	};

	public content:string;
	public wordCount:number;

    constructor() {
    	super();
    }

    ngOnInit() {
    }


	ngOnChanges(changes: SimpleChanges): void {
    	if(!this.lastAnswer || this.lastAnswer.length == 0){
    		this.content = "";
    		this.wordCount = 0;
	    }
    	else {
		    this.content = (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).content) || "";
		    this.wordCount = (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).wordCount) || 0;
	    }
		this.independentWritingQuestion = <IndependentWritingQuestion>this.question;
	}


	changeAnswer(){
		//只有做作业的学生可能会导致wordCount发生改变
		//老师修改的时候并不会发生改变
    	this.wordCount = super.homeworkMode()?this.getWordCount():this.wordCount;

    	this.answer = JSON.stringify({
		    'content':this.content,
		    'wordCount': this.wordCount
	    });

		super.changeAnswer();
	}

	public getWordCount():number{
    	let cont = this.content;
    	if(cont.length == 0){
    		return 0;
	    }

		cont = cont.replace(/<[^>]*>/g,"");
		cont = cont.replace(/[.!?]/g, ' ');
		cont = cont.replace(/\s+/g, ' ');
		cont = cont.trim();
		return cont.split(" ").length;
	}

}
