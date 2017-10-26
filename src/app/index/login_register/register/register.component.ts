import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../../core/services/user.service";
import { ToastService } from "../../../core/services/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
	public avatarList = [
		'people-1','people-2','people-3','people-4',
		'people-5','people-6','people-7','people-8',
		'man-1','man-2','man-3','man-4',
		'man-5','man-6','man-7','man-8',
	];

	public selectedAvatarUrl = 'man-7';


	constructor(private userService:UserService,
				  private toastService:ToastService,
				  private router:Router) { }

	ngOnInit() {
	}

	changeAvatar(avatar:string){
		this.selectedAvatarUrl = avatar;
	}

	onSubmit(form:any):boolean{
	  var type = 0;
	  if(form.type == "teacher"){
	      type = 1;
	  }

	  this.userService.register(form.name, this.selectedAvatarUrl, form.email, form.password, type)
	      .subscribe(
	      	(resp)=>this.router.navigate(['']),
				(error:string)=>this.toastService.error(error));
	  return false;
	}

}
