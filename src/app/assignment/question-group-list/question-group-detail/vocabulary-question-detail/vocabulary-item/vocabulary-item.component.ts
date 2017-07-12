import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vocabulary-item',
  templateUrl: './vocabulary-item.component.html',
  styleUrls: ['./vocabulary-item.component.css']
})
export class VocabularyItemComponent implements OnInit {
	@Input() index:number;
	@Input() english:string;
	@Input() chinese:string;

    constructor() { }

    ngOnInit() {
    }

}
