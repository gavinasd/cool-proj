import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question-pager',
  templateUrl: './question-pager.component.html',
  styleUrls: ['./question-pager.component.css']
})
export class QuestionPagerComponent implements OnInit {
	@Input() content:string;      //pager中需要显示的内容
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
}
