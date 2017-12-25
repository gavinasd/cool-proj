import {Component, OnInit, Input} from '@angular/core';
import {ClassInfo} from "../../models/models";
import {ClassService} from "../../core/services/class.service";
import {ToastService} from "../../core/services/toast.service";
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {FollowClassDialogComponent} from "../../shared/view/dialogs/follow-class-dialog/follow-class-dialog.component";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-search-result-item',
    templateUrl: './search-result-item.component.html',
    styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {
    @Input() classInfo:ClassInfo;

    constructor(private dialog: MatDialog,
                private classService:ClassService,
                public toastService: ToastService,
                private router: Router) { }

    ngOnInit() {
    }

    openFollowClassDialog(){
	    let config = new MatDialogConfig();
	    config.width = '400px';
	    this.dialog.open(FollowClassDialogComponent, config).afterClosed()
		    .filter(result => !!result)
		    .subscribe(data => {
			    this.followClass(data);
		    });
    }

    followClass(form:any){
        let verifyCode = form.verifyCode;
        const snackBarConfig = new MatSnackBarConfig;
        snackBarConfig.duration = 3000;
        this.classService.classAddStudent(this.classInfo.classId, verifyCode)
            .subscribe((json)=>{
				this.toastService.success("成功加入班级,正在跳转到首页···");
	            Observable.interval(2000).pipe(
	            	first(),
	            ).subscribe(v=>{
		            this.router.navigate(['/']);
	            });
            },(err)=>{
	            this.toastService.error("验证码错误");
            });
    }

}
