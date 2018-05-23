import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-follow-class-dialog',
  templateUrl: './follow-class-dialog.component.html',
  styleUrls: ['./follow-class-dialog.component.scss']
})
export class FollowClassDialogComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<FollowClassDialogComponent>) { }

	ngOnInit() {
	}

}
