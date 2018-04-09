import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../core/services/user.service";
import {ToastService} from "../../../core/services/toast.service";
import {UserType} from "../../../shared/enums/UserType";
import {ResultVO} from "../../../shared/VO/ResultVO";

@Component({
	selector: 'app-register',
	templateUrl: 'register.component.html',
	styleUrls: ['register.component.css']
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
			form.email, form.password, form.type)
			.subscribe(
				(resp) => this.router.navigate(['']),
				(error: any) => this.toastService.error(error.error.msg));
		return false;
	}

}
