import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-tpo-review-player',
  templateUrl: './tpo-review-player.component.html',
  styleUrls: ['./tpo-review-player.component.css']
})
export class TpoReviewPlayerComponent implements OnInit, OnDestroy, OnChanges {

	@Input() src:string;
	public progress:number = 100;
	public currentTime:string;
	public totalTime:string;
	myAudio:HTMLAudioElement;
	public isPlaying : boolean = false;
	constructor() { }

	ngOnInit() {
		Observable.interval(100).subscribe(data =>{
			this.progress = this.myAudio.currentTime / this.myAudio.duration * 100;

			this.currentTime = this.convertNumberToTime(this.myAudio.currentTime);
			this.totalTime = this.convertNumberToTime(this.myAudio.duration);
		})
	}

	convertNumberToTime(time:number):string{
		let minute = Math.floor(time/60);
		let second = Math.floor(time%60);

		let minuteString = (minute<10)?('0'+minute):(minute+'');
		let secondString = (second<10)?('0'+second):(second+'');

		let result = minuteString + ':' + secondString;
		return result;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(this.myAudio){
			this.myAudio.pause();
			this.isPlaying = false;
		}
		this.myAudio = new Audio(this.src);
	}

	ngOnDestroy(): void {
		this.myAudio.pause();
		this.isPlaying = false;
	}

	togglePlay(): void {
		if(this.isPlaying){
			this.myAudio.pause();
			this.isPlaying = false;
		}
		else {
			this.myAudio.play();
			this.isPlaying = true;
		}
	}

}
