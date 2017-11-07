import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignmentService} from "../../../core/services/assignment.service";
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
    @Input() public questionType:string;
    @Input() public classId:string;
    @Input() public showPre:boolean;
    @Input() public showNext:boolean;
    @Input() public disableNext:boolean;
    @Output() viewChanged:EventEmitter<string> = new EventEmitter<string>();
	@Output() next:EventEmitter<string> = new EventEmitter<string>();
	@Output() pre:EventEmitter<string> = new EventEmitter<string>();
	public ModeType = Mode;
	public viewText = false;

    constructor(private router:Router) { }

    ngOnInit() {
    }

	homeworkMode(){
		return this.mode == this.ModeType.HomeWork;
	}

	reviewMode(){
		return this.mode == this.ModeType.Review;
	}

	gotoHome(){
		this.router.navigate(['/']);
	}

	quit(){
		this.router.navigate(['/class/' + this.classId]);
	}

	nextQuestion(){
		this.next.emit('next');
	}

	preQuestion(){
		this.pre.emit('pre');
	}

	changeView(){
		this.viewText = !this.viewText;
		this.viewChanged.emit('change');
	}

}
