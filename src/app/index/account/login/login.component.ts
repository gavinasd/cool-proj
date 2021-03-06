import { Component, OnInit } from '@angular/core';
import {Resolve, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {ToastService} from "../../../core/services/toast.service";
import {HttpService} from "../../../core/services/http.service";
import {ResultVO} from "../../../shared/VO/ResultVO";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private userService:UserService,
                private httpService:HttpService,
                private router:Router,
                private toastService:ToastService) { }

    ngOnInit() {
    }


    onSubmit(form:any):boolean{
      this.userService.login(form.phone,form.password)
          .subscribe(
              (resp)=>{
                  this.router.navigate(['']);
              },
              (error:any)=>{
                  this.toastService.error(error.error.msg);
              }
          );
      return false;
  }
}
