import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-question-header',
    templateUrl: './question-header.component.html',
    styleUrls: ['./question-header.component.css']
})
export class QuestionHeaderComponent implements OnInit {
    @Input() assignmentName:string;

    constructor() { }

    ngOnInit() {
    }

}
