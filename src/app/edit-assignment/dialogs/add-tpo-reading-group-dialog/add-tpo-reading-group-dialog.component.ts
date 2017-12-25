import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-add-tpo-reading-group-dialog',
  templateUrl: './add-tpo-reading-group-dialog.component.html',
  styleUrls: ['./add-tpo-reading-group-dialog.component.css']
})
export class AddTpoReadingGroupDialogComponent implements OnInit {
	public EditorOptions = environment.editQuestionOptions;
	public passage = '';

	constructor(public dialogRef: MatDialogRef<AddTpoReadingGroupDialogComponent>) { }

	ngOnInit() {
		this.EditorOptions.height = 450;
		this.EditorOptions.placeholderText = '输入文章段落';
	}

	closeDialogAndSave(){
		const content = JSON.stringify({
			'passage': this.passage
		});
		this.dialogRef.close(content);
	}

}
