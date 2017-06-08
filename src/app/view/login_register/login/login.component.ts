import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ToastService} from "../../../services/toast.service";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private userService:UserService,
                private httpService:HttpService,
                private router:Router,
                private toastService:ToastService) { }

    ngOnInit() {
    }


    onSubmit(form:any):boolean{
      console.log(form.email+form.password);
      this.userService.login(form.email,form.password)
          .subscribe(
              (resp)=>{
                  console.log(JSON.stringify(resp));
                  this.router.navigate(['']);
              },
              (error:string)=>{
                  console.log(error);
                  this.toastService.error(error);
              }
          );
      return false;
  }
}
