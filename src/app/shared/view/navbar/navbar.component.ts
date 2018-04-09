import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../../core/services/class.service";
import {Router} from "@angular/router";
import {HttpService} from "../../../core/services/http.service";
import {ToastService} from "../../../core/services/toast.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateClassDialogComponent} from "../dialogs/create-class-dialog/create-class-dialog.component";
import {UserType} from "../../enums/UserType";
import {filter} from "rxjs/operators";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public userName: string;
	public userType: string;
	public avatar: string;
	public UserType: any = UserType;

	constructor(private router: Router, private httpService: HttpService, private dialog: MatDialog,
	            private classService: ClassService, private toastService: ToastService) {
	}

	ngOnInit() {
		this.userName = String(this.httpService.getCurrentUserName());
		this.userType = UserType[this.httpService.getUserType()];
		this.avatar = String(this.httpService.getCurrentUserAvatar());
	}

	submitCreateClass(form: any) {
		this.classService.createClass(form.className, form.verifier)
			.subscribe(
				(json) => {
					this.toastService.success('成功创建班级');
				}, (err) => {
					this.toastService.error(err);
				}
			)
	}

	openCreateClassDialog() {
		let config = new MatDialogConfig();
		config.width = '400px';
		this.dialog.open(CreateClassDialogComponent, config).afterClosed()
			.pipe(filter(result => !!result))
			.subscribe(data => {
				this.submitCreateClass(data);
			});
	}

	searchClass(form: any) {
		console.log(form.classForSearch);
		this.router.navigate(['/search', form.classForSearch]);
	}

	logout() {
		this.httpService.logout();
		this.router.navigate(['/login']);
	}
}
