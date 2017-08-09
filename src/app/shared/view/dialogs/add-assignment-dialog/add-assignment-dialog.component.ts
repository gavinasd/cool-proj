import { Component, OnInit } from '@angular/core';
import {Assignment} from "../../../../models/assignments/Assignment";
import {AssignmentService} from "../../../../services/assignment.service";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-assignment-dialog',
  templateUrl: './add-assignment-dialog.component.html',
  styleUrls: ['./add-assignment-dialog.component.css']
})
export class AddAssignmentDialogComponent implements OnInit {
	public assignmentList:Assignment[];

	constructor(private assignmentService:AssignmentService,public dialogRef: MdDialogRef<AddAssignmentDialogComponent>) { }

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList:Assignment[]) => {
			this.assignmentList = assignmentList;
		});
	}

}
