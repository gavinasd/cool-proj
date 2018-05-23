import {Component, OnInit} from '@angular/core';
import {Assignment} from "../../../../models/assignments/Assignment";
import {AssignmentService} from "../../../../core/services/assignment.service";
import {MatDialogRef} from "@angular/material";
import {AssignmentType} from "../../../enums/AssignmentType";

@Component({
	selector: 'app-add-assignment-dialog',
	templateUrl: './add-assignment-dialog.component.html',
	styleUrls: ['./add-assignment-dialog.component.scss']
})
export class AddAssignmentDialogComponent implements OnInit {
	public assignmentList: Assignment[];
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
	public selectedId: string = "";
	public selectedAssignmentType: string = "选择作业类型";
	public allAssignment: Assignment[] = [];

	constructor(private assignmentService: AssignmentService, public dialogRef: MatDialogRef<AddAssignmentDialogComponent>) {
	}

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList: Assignment[]) => {
			this.allAssignment = assignmentList;
			this.assignmentList = this.allAssignment.filter(assignment => assignment.assignmentType == AssignmentType.TPO_READING);
		});
	}

	public changeType(assignmentType: any) {
		this.selectedAssignmentType = assignmentType.name;
		this.assignmentList = this.allAssignment.filter(assignment => assignment.assignmentType == assignmentType.value);
	}

	public selectAssignment(assignmentId: string) {
		this.selectedId = assignmentId;
	}

	public closeDialog() {
		if(this.selectedId.length == 0) {
			this.dialogRef.close();
		}
		this.dialogRef.close({
			'assignment': this.selectedId
		});
	}

}
