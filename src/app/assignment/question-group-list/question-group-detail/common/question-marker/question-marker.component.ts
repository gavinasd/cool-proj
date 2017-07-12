import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question-marker',
  templateUrl: './question-marker.component.html',
  styleUrls: ['./question-marker.component.css']
})
export class QuestionMarkerComponent implements OnInit {
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
