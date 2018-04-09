import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AssignmentType} from "../../../enums/AssignmentType";

@Component({
	selector: 'app-create-assignment-dialog',
	templateUrl: './create-assignment-dialog.component.html',
	styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent {

	public assignmentTypes = [
		{
			value: AssignmentType.VOCABULARY_ASSIGNMENT,
			name: '词汇'
		},
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

	constructor(public dialogRef: MatDialogRef<CreateAssignmentDialogComponent>) {
	}

}
