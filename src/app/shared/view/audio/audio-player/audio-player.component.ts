import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit, OnChanges, OnDestroy {
	@Input() src:string;
	@Output() completed:EventEmitter<boolean> = new EventEmitter<boolean>();
	public progress:number = 100;
	public progressString:string= '';
	myAudio:HTMLAudioElement;
	constructor() { }

	ngOnInit() {
		Observable.interval(100).subscribe(data =>{
			this.progress = this.myAudio.currentTime / this.myAudio.duration * 100;

			let currentTime = this.convertNumberToTime(this.myAudio.currentTime);
			let totalTime = this.convertNumberToTime(this.myAudio.duration);
			this.progressString = currentTime + '/' + totalTime;
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
		this.myAudio = new Audio(this.src);
		this.myAudio.play();
		this.myAudio.addEventListener('ended', ()=>{
			this.completed.emit(true);
		});
	}

	ngOnDestroy(): void {
		this.myAudio.pause();
	}
}
