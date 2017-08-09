import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['./create-class-dialog.component.css']
})
export class CreateClassDialogComponent{

	constructor(public dialogRef: MdDialogRef<CreateClassDialogComponent>) {}


}
