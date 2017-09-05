import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-common-marker',
  templateUrl: './common-marker.component.html',
  styleUrls: ['./common-marker.component.css']
})
export class CommonMarkerComponent implements OnInit {
	@Input() score:number;
	@Output() marking:EventEmitter<number> = new EventEmitter<number>();

	constructor() {}

	ngOnInit() {
	}

	correct(){
		this.marking.emit(this.score);
	}

	error(){
		this.marking.emit(0);
	}

}
