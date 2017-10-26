import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AssignmentService} from "../../core/services/assignment.service";
import {Question} from "../../models/Questions/Question";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
	public assignmentId:string;
	public questionGroupId:string;
	public questionType:string;
	private question:any = new Question({});

	constructor(private route:ActivatedRoute,
				public assignmentService:AssignmentService) {
		this.route.params.forEach((param:Params)=>{
			this.assignmentId = param['assignmentId'];
			this.questionGroupId = param['questionGroupId'];
			this.questionType = param['type'];
		});
	}

	ngOnInit() {
	}

}
