import {Component, OnInit, Input} from '@angular/core';
import {AssignmentInfo} from "../../../models/models";

@Component({
    selector: 'app-grade-info-detail',
    templateUrl: './grade-info-detail.component.html',
    styleUrls: ['./grade-info-detail.component.css'],
})
export class GradeInfoDetailComponent implements OnInit {
	@Input() open: boolean;
    @Input() assignmentInfo:AssignmentInfo;
    @Input() classId:string;

    constructor() {}
    ngOnInit() {
    }

}