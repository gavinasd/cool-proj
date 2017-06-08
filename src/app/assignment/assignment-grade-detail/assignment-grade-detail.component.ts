import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {AssignmentService} from "../../services/assignment.service";

@Component({
    selector: 'app-assignment-grade-detail',
    templateUrl: './assignment-grade-detail.component.html',
    styleUrls: ['./assignment-grade-detail.component.css']
})
export class AssignmentGradeDetailComponent implements OnInit {
    public assignmentId:string;
    public gradeDetailList:any[];

    constructor(private route:ActivatedRoute,
                private assignmentService:AssignmentService) {
        this.route.params.forEach((param:Params)=>{
            this.assignmentId = param['assignmentId'];
        });
    }

    ngOnInit() {
        this.assignmentService.getAssignmentGradeDetail(this.assignmentId)
            .subscribe((results)=>{
                this.gradeDetailList = results;
            });
    }

}
