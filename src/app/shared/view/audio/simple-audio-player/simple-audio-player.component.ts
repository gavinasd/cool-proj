import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-simple-audio-player',
  templateUrl: './simple-audio-player.component.html',
  styleUrls: ['./simple-audio-player.component.css']
})
export class SimpleAudioPlayerComponent implements OnInit,OnChanges,OnDestroy{
	@Input() src:string;
	myAudio:any;
	constructor() { }

	ngOnInit() {
	}


	ngOnChanges(changes: SimpleChanges): void {
		this.pause();

		this.myAudio = new Audio(this.src);
		this.myAudio.addEventListener('ended', function() {
			this.currentTime = 0;
			this.load();
		}, false);
		this.myAudio.load();
	}

	ngOnDestroy(): void {
		this.pause();
	}

	play(){
		this.myAudio.play();
	}

	pause(){
		if(this.myAudio){
			this.myAudio.pause();
		}
	}
}
