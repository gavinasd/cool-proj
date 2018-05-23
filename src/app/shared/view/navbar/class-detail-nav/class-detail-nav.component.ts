import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Assignment} from "../../../../models/assignments/Assignment";
import {HttpService} from "../../../../core/services/http.service";
import {AssignmentService} from "../../../../core/services/assignment.service";
import {ToastService} from "../../../../core/services/toast.service";
import {UserType} from "../../../enums/UserType";

@Component({
	selector: 'app-class-detail-nav',
	templateUrl: './class-detail-nav.component.html',
	styleUrls: ['./class-detail-nav.component.scss']
})
export class ClassDetailNavComponent implements OnInit {
	@Input() classId: string;
	public assignmentList: Assignment[];
	public userType: string;
	public userName: string;
	public UserType: any = UserType;

	constructor(private router: Router, private httpService: HttpService,
	            private assignmentService: AssignmentService, private toastService: ToastService) {
	}

	ngOnInit() {
		this.userType = this.httpService.getUserType();//把string转成number
		this.userName = String(this.httpService.getCurrentUserName());
	}

	searchClass(form: NgForm) {
		console.log(form.value.classForSearch);
		this.router.navigate(['/search', form.value.classForSearch]);
	}

	logout() {
		this.httpService.logout();
		this.router.navigate(['/login']);
	}

	gotoHome() {
		this.router.navigate(['/']);
	}
}
