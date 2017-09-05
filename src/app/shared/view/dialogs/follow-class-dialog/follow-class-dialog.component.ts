import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-follow-class-dialog',
  templateUrl: './follow-class-dialog.component.html',
  styleUrls: ['./follow-class-dialog.component.css']
})
export class FollowClassDialogComponent implements OnInit {

	constructor(public dialogRef: MdDialogRef<FollowClassDialogComponent>) { }

	ngOnInit() {
	}

}
