import {Component, OnInit} from '@angular/core';
import {Assignment} from "../../../../models/assignments/Assignment";
import {AssignmentService} from "../../../../core/services/assignment.service";
import {MatDialogRef} from "@angular/material";
import {AssignmentType} from "../../../enums/AssignmentType";

@Component({
	selector: 'app-add-assignment-dialog',
	templateUrl: './add-assignment-dialog.component.html',
	styleUrls: ['./add-assignment-dialog.component.css']
})
export class AddAssignmentDialogComponent implements OnInit {
	public allAssignment: Assignment[];
	public assignmentList: Assignment[];
	public type: string;
	public assignmentTypes = [
		{
			value: AssignmentType.TPO_READING,
			name: 'TPO阅读'
		},
		{
			value: AssignmentType.TPO_LISTENING,
			name: 'TPO听力'
		},
		{
			value: AssignmentType.TPO_SPEAKING,
			name: 'TPO口语'
		},
		{
			value: AssignmentType.TPO_INDEPENDENT_WRITING,
			name: '独立写作'
		},
		{
			value: AssignmentType.TPO_INTEGRATED_WRITING,
			name: '综合写作'
		}
	];

	constructor(private assignmentService: AssignmentService, public dialogRef: MatDialogRef<AddAssignmentDialogComponent>) {
	}

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList: Assignment[]) => {
			this.allAssignment = assignmentList;
		});
	}

	public changeType() {
		this.assignmentList = this.allAssignment.filter(assignment => assignment.assignmentType == this.type);
	}

}
