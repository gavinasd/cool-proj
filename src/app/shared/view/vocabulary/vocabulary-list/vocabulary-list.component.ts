import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css']
})
export class VocabularyListComponent implements OnInit {
	@Input() wordList:any[];
    constructor() { }

    ngOnInit() {
    }

}
