import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as fromApplication from "../../../../redux/index.reducer";
import * as assignmentActions from '../../../../redux/assignment/assignment.actions';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import "rxjs/add/observable/interval";

@Component({
	selector: 'app-question-timer',
	templateUrl: './question-timer.component.html',
	styleUrls: ['./question-timer.component.css']
})
export class QuestionTimerComponent implements OnInit, OnDestroy{
	@Input() assignmentId:string;
	@Input() studentId:string;
	private spendTime$:Observable<number>;
	private lastTime:Date = new Date();
	public content: string = '';
	public showTime:boolean = true;
	private alive:boolean = true;
	constructor( private store:Store<fromApplication.ApplicationState>) {
		this.spendTime$ = store.select(fromApplication.getAssignmentSpendTime);
	}

	ngOnInit(): void {
		this.spendTime$.takeWhile(()=>this.alive).filter(spendTime => spendTime >= 0)
			.first().subscribe((spendTime) => {
			this.lastTime = new Date(Date.now() - spendTime * 1000);
		});

		Observable.interval(1000).takeWhile(()=>this.alive).subscribe(data => {
			let time = (Date.now() - this.lastTime.getTime())/1000;
			this.store.dispatch(new assignmentActions.SetSpendTimeAction(time));

			this.content = this.getHHMMSS();
		})
	}

	ngOnDestroy(): void {
		this.alive = false;
	}

	getHHMMSS():string {
		let diffSeconds = (Date.now() - this.lastTime.getTime())/1000;
		let HH = Math.floor((diffSeconds/3600));
		let MM = Math.floor((diffSeconds%3600)/60);
		let SS = Math.floor(diffSeconds%60);

		let formatted = ((HH < 10)?("0" + HH):HH) + ":"
						+ ((MM < 10)?("0" + MM):MM) + ':'
						+ ((SS < 10)?("0" + SS):SS);
		return formatted;

	}

	toggleShowTime(){
		this.showTime = !this.showTime;
	}

}
