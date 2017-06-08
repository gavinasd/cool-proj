import { Component, OnInit } from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {Question} from "../../models/models";
import {Params, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: 'edit-assignment.component.html',
  styleUrls: ['edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
    assignmentList:any[];
    selectAssignmentId:string;

	constructor(private assignmentService:AssignmentService) {
	}

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList)=>{
			this.assignmentList = assignmentList;
		});
	}

	selectAssignment(assignmentId:string){
	    this.selectAssignmentId = assignmentId;
    }

    nextQuestion(){
        this.assignmentService.changeIndex.next(true);
    }

    preQuestion(){
        this.assignmentService.changeIndex.next(false);
    }

}
