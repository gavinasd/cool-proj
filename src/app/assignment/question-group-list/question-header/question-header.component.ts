import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    @Input() public questionType:string;
    @Input() public classId:string;
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

	needToShowPre():boolean{
		if(this.mode == Mode.Review || this.mode == Mode.Marking){
			return true;
		}
		if(!this.questionType){
			return false;
		}
		return this.questionType.startsWith("tpo_reading");
	}

	needToShowButton():boolean{
		if((this.questionType.startsWith('tpo_reading')||this.questionType.startsWith('tpo_listening'))){
			if(this.reviewMode()){
				return false;
			}
			return true;
		}
		return true;
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
