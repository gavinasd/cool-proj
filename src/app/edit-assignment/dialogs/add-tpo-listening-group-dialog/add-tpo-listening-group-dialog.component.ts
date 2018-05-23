import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MatDialogRef} from "@angular/material";
import {ToastService} from "../../../core/services/toast.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-tpo-listening-group-dialog',
  templateUrl: './add-tpo-listening-group-dialog.component.html',
  styleUrls: ['./add-tpo-listening-group-dialog.component.css']
})
export class AddTpoListeningGroupDialogComponent implements OnInit {
	public passageEditorOptions;
	public passage:string;

	constructor(public dialogRef: MatDialogRef<AddTpoListeningGroupDialogComponent>,
	            private toastService: ToastService) {
		this.passageEditorOptions = Object.create(environment.studentEditorOptions);
		this.passageEditorOptions.placeholder = '请输入听力材料原文';
		this.passageEditorOptions.height = '300px';
	}

	ngOnInit() {
	}


	closeDialog(){
		this.dialogRef.close();
	}

	closeDialogAndSave(form:NgForm){
		let data = form.value.passageRecord.split('/');
		if(data.length != 3){
			this.toastService.error('格式不对');
			return;
		}
		const recordUrl = '/assets/tpo/listening/test' + data[0]
			+ '/sound/listening_passage'+data[1]+'_'+data[2]+'.mp3';
		const content = JSON.stringify({
			'recordUrl':recordUrl,
			'passage': this.passage
		});

		this.dialogRef.close(content);
	}
}
