import {Component, OnInit, Input} from '@angular/core';
import {ClassInfo} from "../../models/models";
import {ClassService} from "../../core/services/class.service";
import {ToastService} from "../../core/services/toast.service";
import {MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {FollowClassDialogComponent} from "../../shared/view/dialogs/follow-class-dialog/follow-class-dialog.component";

@Component({
    selector: 'app-search-result-item',
    templateUrl: './search-result-item.component.html',
    styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {
    @Input() classInfo:ClassInfo;

    constructor(private dialog: MdDialog, private classService:ClassService,public snackBar: MdSnackBar) { }

    ngOnInit() {
    }

    openFollowClassDialog(){
	    let config = new MdDialogConfig();
	    config.width = '400px';
	    this.dialog.open(FollowClassDialogComponent, config).afterClosed()
		    .filter(result => !!result)
		    .subscribe(data => {
			    this.followClass(data);
		    });
    }

    followClass(form:any){
        let verifyCode = form.verifyCode;
        const snackBarConfig = new MdSnackBarConfig;
        snackBarConfig.duration = 3000;
        this.classService.classAddStudent(this.classInfo.classId, verifyCode)
            .subscribe((json)=>{
				this.snackBar.open("成功加入班级", '', snackBarConfig);
            },(err)=>{
	            this.snackBar.open("验证码错误", '', snackBarConfig);
            });
    }

}
