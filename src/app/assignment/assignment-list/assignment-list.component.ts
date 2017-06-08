import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {HttpService} from "../../services/http.service";
import {AssignmentService} from "../../services/assignment.service";
import {AssignmentInfo} from "../../models/models";

@Component({
    selector: 'app-assignment-list',
    templateUrl: 'assignment-list.component.html',
    styleUrls: ['assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
    @Input() private classId:string;
    public assignmentInfoList:AssignmentInfo[];

    constructor(private route:ActivatedRoute,
                private toastService:ToastService,
                private assignmentService:AssignmentService) {
    }

    ngOnInit() {
        console.log(this.classId);
        this.assignmentService.getAssignmentList(this.classId)
            .subscribe((assignmentInfoList)=>{
                console.log(assignmentInfoList);
                console.log(JSON.stringify(assignmentInfoList));
                this.assignmentInfoList = assignmentInfoList;
            }, (error)=>{console.log(error)});
    }

}
