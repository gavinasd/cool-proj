import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-background-audio-player',
  templateUrl: './background-audio-player.component.html',
  styleUrls: ['./background-audio-player.component.css']
})
export class BackgroundAudioPlayerComponent implements OnInit, OnDestroy, OnChanges {
	@Input() src:string;
	@Output() completed:EventEmitter<boolean> = new EventEmitter<boolean>();
	myAudio:any;
	constructor() { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.pause();
		this.myAudio = new Audio(this.src);
		this.myAudio.addEventListener('ended', ()=>{
			this.completed.emit(true);
		}, false);
		this.myAudio.load();
		this.myAudio.play();
	}

	ngOnDestroy(): void {
		this.pause();
		this.myAudio = null;
	}

	pause(){
		if(this.myAudio){
			this.myAudio.pause();
		}
	}
}
