import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-score-marker',
  templateUrl: './score-marker.component.html',
  styleUrls: ['./score-marker.component.css']
})
export class ScoreMarkerComponent implements OnInit {
	@Input() score:number;
	@Output() marking:EventEmitter<number> = new EventEmitter<number>();

	constructor() {}

	ngOnInit() {
	}

	markScore(form:NgForm){
		this.marking.emit(form.value.score);
		form.reset();
	}


}
