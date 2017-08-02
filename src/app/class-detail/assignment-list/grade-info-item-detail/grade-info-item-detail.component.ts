import {Component, OnInit, Input} from '@angular/core';
import {GradeInfo} from "../../../models/models";
import {HttpService} from "../../../services/http.service";
import {Mode} from "../../../models/assignments/Assignment";

@Component({
    selector: 'app-grade-info-item-detail',
    templateUrl: './grade-info-item-detail.component.html',
    styleUrls: ['./grade-info-item-detail.component.css']
})
export class GradeInfoItemDetailComponent implements OnInit {
    @Input() gradeInfo:GradeInfo;
    @Input() classId:string;
    @Input() assignmentId:string;
    ModeType = Mode;
    userType:string;
    gradePercentage:number;     //正确率

    constructor(public httpService:HttpService) {
    }


    ngOnInit() {
        this.userType = this.httpService.getUserType();
        this.gradePercentage = this.gradeInfo.score/this.gradeInfo.totalScore;
    }

}
