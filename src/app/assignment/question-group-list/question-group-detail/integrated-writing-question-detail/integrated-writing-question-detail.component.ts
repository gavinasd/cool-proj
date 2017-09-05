import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuestionGroupDetailComponent} from "../question-group-detail.component";
import {IntegratedWritingQuestion} from "../../../../models/Questions/IntegratedWritingQuestion";

@Component({
  selector: 'app-integrated-writing-question-detail',
  templateUrl: './integrated-writing-question-detail.component.html',
  styleUrls: ['./integrated-writing-question-detail.component.css']
})
export class IntegratedWritingQuestionDetailComponent extends QuestionGroupDetailComponent implements OnInit,OnChanges{
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

	@Input() contentIndex:number;
	public integratedWritingQuestion: IntegratedWritingQuestion;
	public content:string;
	public wordCount:number;
	public passage:string;
	public recordUrl:string;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(this.groupContent.length > 0) {
			this.passage = JSON.parse(this.groupContent).passage;
			this.recordUrl = JSON.parse(this.groupContent).recordUrl;
		}

		if(!this.lastAnswer || this.lastAnswer.length == 0){
			this.content = "";
			this.wordCount = 0;
		}
		else {
			this.content = (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).content) || "";
			this.wordCount = (JSON.parse(this.lastAnswer) && JSON.parse(this.lastAnswer).wordCount) || 0;
		}
		this.integratedWritingQuestion = <IntegratedWritingQuestion>this.question;
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
