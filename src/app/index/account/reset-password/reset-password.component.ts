import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../core/services/toast.service";
import {Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {Observable} from "rxjs/Observable";
import {take} from "rxjs/operators";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	//标记是否正在发送短信
	public sendingSMS = false;

	public countdownTime = 60;

	constructor(private userService: UserService,
	            private toastService: ToastService,
	            private router: Router) {
	}

	getSMS(phone: string) {
		if (this.sendingSMS ||  phone == null || phone.length !== 11) {
			this.toastService.error("手机号码格式不正确");
			return;
		}

		this.userService.genSmsCode(phone)
			.subscribe(
				() => {},
				(error) => this.toastService.error(error)
			);
		this.sendingSMS = true;
		Observable.interval(1000).pipe(take(60))
			.subscribe(() => {
				this.countdownTime --;

				if (this.countdownTime == 0) {
					this.sendingSMS = false;
					this.countdownTime = 60;
				}
			});
	}

	onSubmit(form: any) {
		if (form.password !== form.confirmPassword){
			this.toastService.error("两个密码不一致");
			return false;
		}

		this.userService.resetPassword(form.name, form.sms, form.password)
			.subscribe(
				(resp) => {
					this.toastService.success("修改成功");
				},
				(error: any) => this.toastService.error(error));
		return false;
	}

	ngOnInit() {
	}

}
