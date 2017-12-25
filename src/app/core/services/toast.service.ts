import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class ToastService {
	private snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig;

	constructor(private snackBar:MatSnackBar) {
		this.snackBarConfig.duration = 3000;
		this.snackBarConfig.verticalPosition = 'top';
	}

	public success(content:string):void{
		this.snackBarConfig.extraClasses = ['success-snackbar'];
		this.snackBar.open(content.trim(), '', this.snackBarConfig);
	}

	public error(content:string):void{
		this.snackBarConfig.extraClasses = ['error-snackbar'];
		this.snackBar.open(content.trim(), '', this.snackBarConfig);
	}

	public warning(content:string):void{
		this.success(content);
	}
}
