import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../../services/user.service";
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,
			  private toastService:ToastService,
			  private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:any):boolean{
    var type = 0;
    if(form.type == "teacher"){
        type = 1;
    }

    this.userService.register(form.name,form.email,form.password,type)
        .subscribe(
        	(resp)=>this.router.navigate(['']),
			(error:string)=>this.toastService.error(error));
    return false;
  }

}
