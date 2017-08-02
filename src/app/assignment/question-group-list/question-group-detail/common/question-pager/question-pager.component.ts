import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question-pager',
  templateUrl: './question-pager.component.html',
  styleUrls: ['./question-pager.component.css']
})
export class QuestionPagerComponent implements OnInit {
	@Input() shouldShowContent:boolean;      //是否需要展示cotnent
	@Input() questionIndex:number;
	@Input() questionListLength:number;
	@Output() next:EventEmitter<string> = new EventEmitter<string>();
	@Output() pre:EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	nextQuestion(){
		this.next.emit('next');
	}

	preQuestion(){
		this.pre.emit('pre');
	}

	getPagerContent(){
		if(!this.shouldShowContent) {
			return '第' + (this.questionIndex + 1) + '题/' +
				'共' + (this.questionListLength) + '题';
		}
		else{
			return '';
		}
	}
}
