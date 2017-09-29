import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-index',
  templateUrl: './question-index.component.html',
  styleUrls: ['./question-index.component.css']
})
export class QuestionIndexComponent implements OnInit {
	@Input() content:String;

	constructor() { }

	ngOnInit() {
	}



}
