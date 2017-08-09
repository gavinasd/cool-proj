import {Component, Input, OnInit} from '@angular/core';
import {AssignmentService} from "../../../services/assignment.service";
import {Mode} from "../../../models/assignments/Assignment";
import {Router} from "@angular/router";

@Component({
    selector: 'app-question-header',
    templateUrl: './question-header.component.html',
    styleUrls: ['./question-header.component.css']
})
export class QuestionHeaderComponent implements OnInit {
    @Input() public assignmentName: string;
    @Input() public mode:Mode;
	public ModeType = Mode;

    constructor(private router:Router) { }

    ngOnInit() {
    }

	homeworkMode(){
		return this.mode == this.ModeType.HomeWork;
	}

	gotoHome(){
		this.router.navigate(['/']);
	}

}
