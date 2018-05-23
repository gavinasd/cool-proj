import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../core/services/user.service";
import {ToastService} from "../../../core/services/toast.service";
import {UserType} from "../../../shared/enums/UserType";
import {ResultVO} from "../../../shared/VO/ResultVO";
import {Observable} from "rxjs/Observable";
import {take} from "rxjs/operators";
import {interval} from "rxjs/observable/interval";

@Component({
	selector: 'app-register',
	templateUrl: 'register.component.html',
	styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
	public avatarList = [
		'people-1', 'people-2', 'people-3', 'people-4',
		'people-5', 'people-6', 'people-7', 'people-8',
		'man-1', 'man-2', 'man-3', 'man-4',
		'man-5', 'man-6', 'man-7', 'man-8',
	];

	public selectedAvatarUrl = 'man-7';

	public UserType: any = UserType;

	//标记是否正在发送短信
	public sendingSMS = false;

	public countdownTime = 60;


	constructor(private userService: UserService,
	            private toastService: ToastService,
	            private router: Router) {
	}

	ngOnInit() {
	}

	changeAvatar(avatar: string) {
		this.selectedAvatarUrl = avatar;
	}

	onSubmit(form: any): boolean {
		this.userService.register(form.name, this.selectedAvatarUrl,
			form.phone, form.smsCode, form.password, form.type)
			.subscribe(
				(resp) => this.router.navigate(['']),
				(error: any) => this.toastService.error(error));
		return false;
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
		interval(1000).pipe(take(60))
			.subscribe(() => {
				this.countdownTime --;

				if (this.countdownTime == 0) {
					this.sendingSMS = false;
					this.countdownTime = 60;
				}
			});
	}

}
