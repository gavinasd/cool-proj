import {Component, Input, OnInit} from '@angular/core';
import {ClassService} from "../../core/services/class.service";
import {UserType} from "../../shared/enums/UserType";
import {UserVO} from "../../shared/VO/UserVO";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
	selector: 'app-class-user-list',
	templateUrl: './class-user-list.component.html',
	styleUrls: ['./class-user-list.component.scss']
})
export class ClassUserListComponent implements OnInit {
	@Input() classId: string;
	teacherList: UserVO[];
	studentList: UserVO[];

	constructor(private classService: ClassService) {
	}

	ngOnInit() {
		this.classService.classGetAllUser(this.classId)
			.subscribe((userList: UserVO[]) => {
				this.teacherList = userList.filter(user => user.type == UserType.TEACHER);
				this.studentList = userList.filter(user => user.type == UserType.STUDENT);
			});
	}

}
