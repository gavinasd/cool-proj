import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.css']
})
export class CountDownTimerComponent implements OnInit {
	@Input() time:number;
	countDownTime : number;
	@Output() completed:EventEmitter<boolean> = new EventEmitter<boolean>(false);

	constructor() { }

	ngOnInit() {
		this.countDownTime = this.time;
		let subscription: Subscription = Observable.interval(1000).subscribe(()=>{
			this.countDownTime --;
			if(this.countDownTime == 0){
				subscription.unsubscribe();
				this.completed.emit(true);
			}
		})
	}

	getCountDownTime():string{
		return '00:'+(this.countDownTime<10?'0'+this.countDownTime:''+this.countDownTime);
	}

}
