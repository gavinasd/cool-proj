import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicationState} from "../../../../../redux/index.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as fromApplication from '../../../../../redux/index.reducer';
import * as assignmentActions from '../../../../../redux/assignment/assignment.actions';


@Component({
  selector: 'app-question-pager',
  templateUrl: './question-pager.component.html',
  styleUrls: ['./question-pager.component.css']
})
export class QuestionPagerComponent implements OnInit {
	public scoreList$:Observable<any[]>;
	public groupIndex:number;
	public questionIndex:number;


	constructor(private store:Store<ApplicationState>) {
		this.scoreList$ = store.select(fromApplication.getAssignmentScoreList);
		store.select(fromApplication.getCurrentGroupIndex).subscribe((groupIndex)=>{
			this.groupIndex = groupIndex;
		});
		store.select(fromApplication.getQuestionIndex).subscribe((questionIndex)=>{
			this.questionIndex = questionIndex;
		})
	}

	ngOnInit() {
	}

	skipTo(groupIndex:number, questionIndex:number){
		this.store.dispatch(new assignmentActions.SkipToQuestionAction(groupIndex, questionIndex));
	}

	selected(groupIndex:number, questionIndex:number):boolean{
		return this.groupIndex == groupIndex && this.questionIndex == questionIndex;
	}
}
