import { Component, OnInit } from '@angular/core';
import {ClassService} from "../../../services/class.service";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {ToastService} from "../../../services/toast.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {CreateClassDialogComponent} from "../dialogs/create-class-dialog/create-class-dialog.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public userName: string;
    public userType: number;

    constructor(private router: Router, private httpService: HttpService, private dialog: MdDialog,
                private classService: ClassService, private toastService: ToastService) { }

    ngOnInit() {
        this.userName = String(this.httpService.getCurrentUserName());
        this.userType = Number(this.httpService.getUserType()); // 把string转成number
    }

    submitCreateClass(form: any) {
        console.log(form.verifier);
        console.log(form.className);
        this.classService.createClass(form.className, form.verifier)
            .subscribe(
                (json) => {
                    document.getElementById('closeModal').click();
                    this.toastService.success('成功创建班级');
                }, (err) => {
                    document.getElementById('closeModal').click();
                    this.toastService.error(err);
                }
            )
    }

    openCreateClassDialog(){
    	let config = new MdDialogConfig();
	    config.width = '400px';
    	this.dialog.open(CreateClassDialogComponent, config).afterClosed()
		    .filter(result => !!result)
		    .subscribe(data => {
			    this.submitCreateClass(data);
		    });
    }

    searchClass(form: any){
        console.log(form.classForSearch);
        this.router.navigate(['/class/search', form.classForSearch]);
    }

    logout() {
        this.httpService.logout();
        this.router.navigate(['/login']);
    }
}