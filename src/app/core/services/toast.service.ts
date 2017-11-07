import { Injectable } from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {ToastComponent} from "../../shared/view/toast/toast.component";

@Injectable()
export class ToastService {
	private snackBarConfig: MdSnackBarConfig = new MdSnackBarConfig;

	constructor(private snackBar:MdSnackBar) {
		this.snackBarConfig.duration = 3000;
	}

	public success(content:string):void{
		let snackBarRef = this.snackBar.openFromComponent(ToastComponent,this.snackBarConfig);
		snackBarRef.instance.error = false;
		snackBarRef.instance.content = content;
	}

	public error(content:string):void{
		let snackBarRef = this.snackBar.openFromComponent(ToastComponent,this.snackBarConfig);
		snackBarRef.instance.error = true;
		snackBarRef.instance.content = content;
	}

	public warning(content:string):void{
		this.success(content);
	}
}
