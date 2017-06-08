import {Component, OnInit, Input} from '@angular/core';
import {AssignmentInfo} from "../../models/models";
import {assign} from "rxjs/util/assign";

@Component({
    selector: 'app-grade-info-detail',
    templateUrl: './grade-info-detail.component.html',
    styleUrls: ['./grade-info-detail.component.css']
})
export class GradeInfoDetailComponent implements OnInit {
    @Input() assignmentInfo:AssignmentInfo;
    @Input() classId:string;

    constructor() {}
    ngOnInit() {
        console.log(this.assignmentInfo);
    }

}
