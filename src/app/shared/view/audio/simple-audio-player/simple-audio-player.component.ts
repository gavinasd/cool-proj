import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-simple-audio-player',
  templateUrl: './simple-audio-player.component.html',
  styleUrls: ['./simple-audio-player.component.css']
})
export class SimpleAudioPlayerComponent implements OnInit {
	@Input() src:string;
	@ViewChild('audioplayer') audioPlayer;
	constructor() { }

	ngOnInit() {
	}

	play(){
		console.log(this.audioPlayer.nativeElement);
		this.audioPlayer.nativeElement.play();
	}
}
