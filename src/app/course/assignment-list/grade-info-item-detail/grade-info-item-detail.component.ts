import {Component, OnInit, Input} from '@angular/core';
import {HttpService} from "../../../core/services/http.service";
import {UserType} from "../../../shared/enums/UserType";
import {GradeVO} from "../../../shared/VO/GradeVO";
import {Mode} from "../../../shared/enums/Mode";

@Component({
	selector: 'app-grade-info-item-detail',
	templateUrl: './grade-info-item-detail.component.html',
	styleUrls: ['./grade-info-item-detail.component.scss']
})
export class GradeInfoItemDetailComponent implements OnInit {
	@Input() gradeVO: GradeVO;
	@Input() classId: string;
	@Input() assignmentId: string;
	@Input() needToMark: boolean;
	ModeType = Mode;
	userType: string;
	gradePercentage: number;     //正确率
	public UserType: any = UserType;

	constructor(public httpService: HttpService) {
	}


	ngOnInit() {
		this.userType = this.httpService.getUserType();
		this.gradePercentage = this.gradeVO.score / this.gradeVO.totalScore;
	}

	getTimeForShow(): string {
		let time = this.gradeVO.spendTime;
		time = Math.floor(time / 60);   //得到分钟数
		if (time < 0) {
			return '0分钟';
		}
		else if (time <= 60) {
			return time + '分钟';
		}
		else {
			return Math.floor(time / 60) + '小时' + time % 60 + '分钟';
		}
	}

}
