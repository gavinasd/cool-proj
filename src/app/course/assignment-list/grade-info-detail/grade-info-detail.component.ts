import {Component, OnInit, Input} from '@angular/core';
import {AssignmentInfo} from "../../../models/models";
import {AssignmentGradeVO} from "../../../shared/VO/AssignmentGradeVO";

@Component({
    selector: 'app-grade-info-detail',
    templateUrl: './grade-info-detail.component.html',
    styleUrls: ['./grade-info-detail.component.scss'],
})
export class GradeInfoDetailComponent implements OnInit {
	@Input() open: boolean;
    @Input() assignmentGradeVO:AssignmentGradeVO;
    @Input() classId:string;
    @Input() needToMark:boolean = false; //是否需要批改

    constructor() {}
    ngOnInit() {
    }

}
