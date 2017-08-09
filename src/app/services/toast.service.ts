import { Injectable } from '@angular/core';
import {ToastyService, ToastOptions, ToastyConfig} from "ng2-toasty";

@Injectable()
export class ToastService {
	private toastOptions: ToastOptions;

	constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
		this.toastOptions = {
			title:"",
			msg:"",
			showClose:true,
			timeout:3000,
			theme:'bootstrap',
			onAdd:(toast:string)=>{
				console.log("toasting");
			},
			onRemove:(toast:string)=>{}
		};
	}

	public info(content:string):void{
		this.toastOptions.msg = content;
		this.toastOptions.title = '信息';
		this.toastyService.info(this.toastOptions);
	}

	public success(content:string):void{
		this.toastOptions.msg = content;
		this.toastOptions.title = '成功';
		this.toastyService.success(this.toastOptions);
	}

	public error(content:string):void{
		this.toastOptions.msg = content;
		this.toastOptions.title = '失败';
		this.toastyService.error(this.toastOptions);
	}

	public warning(content:string):void{
		this.toastOptions.msg = content;
		this.toastOptions.title = '警告';
		this.toastyService.warning(this.toastOptions);
	}
}
