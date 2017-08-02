import {Component, Input, OnInit} from '@angular/core';
import {AssignmentService} from "../../../services/assignment.service";
import {Mode} from "../../../models/assignments/Assignment";

@Component({
    selector: 'app-question-header',
    templateUrl: './question-header.component.html',
    styleUrls: ['./question-header.component.css']
})
export class QuestionHeaderComponent implements OnInit {
    @Input() public assignmentName: string;
    @Input() public mode:Mode;
	public ModeType = Mode;

    constructor() { }

    ngOnInit() {
    }

	homeworkMode(){
		return this.mode == this.ModeType.HomeWork;
	}

}
