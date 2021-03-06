import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-tpo-listening-content-dialog',
  templateUrl: './edit-tpo-listening-content-dialog.component.html',
  styleUrls: ['./edit-tpo-listening-content-dialog.component.css']
})
export class EditTpoListeningContentDialogComponent implements OnInit {
	public recordUrl:string;
	public passage:string;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
                public dialogRef: MatDialogRef<EditTpoListeningContentDialogComponent>) {
    }

    ngOnInit() {
    	let content = <string>this.dialogData;
    	if(content && content.length > 0){
    		this.passage = JSON.parse(content).passage || '';
    		this.recordUrl = JSON.parse(content).recordUrl || '';
	    }
    }

    closeDialog(){
    	this.dialogRef.close();
    }

    closeDialogAndSave(){
    	if(this.passage == (JSON.parse(this.dialogData).passage || '')
		    && this.recordUrl == (JSON.parse(this.dialogData).recordUrl || '')){
    		this.dialogRef.close();
    		return;
	    }

    	let content = JSON.stringify({
		    recordUrl:this.recordUrl,
		    passage:this.passage
	    });
    	this.dialogRef.close(content);
    }

}
