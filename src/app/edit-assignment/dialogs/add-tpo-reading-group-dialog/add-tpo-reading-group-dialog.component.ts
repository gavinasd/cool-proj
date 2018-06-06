import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-add-tpo-reading-group-dialog',
  templateUrl: './add-tpo-reading-group-dialog.component.html',
  styleUrls: ['./add-tpo-reading-group-dialog.component.css']
})
export class AddTpoReadingGroupDialogComponent implements OnInit {
	public passage = '';

	constructor(public dialogRef: MatDialogRef<AddTpoReadingGroupDialogComponent>) { }

	ngOnInit() {
	}

	closeDialogAndSave(){
		const content = JSON.stringify({
			'passage': this.passage
		});
		this.dialogRef.close(content);
	}
}
