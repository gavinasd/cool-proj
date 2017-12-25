import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-passage-dialog',
  templateUrl: './edit-tpo-reading-passage-dialog.component.html',
  styleUrls: ['./edit-tpo-reading-passage-dialog.component.css']
})
export class EditTpoReadingPassageDialogComponent implements OnInit {
	public EditorOptions = environment.studentEditorOptions;
	public passage = '';

	constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
	            public dialogRef: MatDialogRef<EditTpoReadingPassageDialogComponent>) {
	}

    ngOnInit() {
		this.passage = this.dialogData;
	    this.EditorOptions.height = 450;
	    this.EditorOptions.placeholderText = '输入文章段落';
    }

}
