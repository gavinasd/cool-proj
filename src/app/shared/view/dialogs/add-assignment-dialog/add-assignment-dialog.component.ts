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
			this.assignmentList = this.allAssignment
				.filter(assignment => assignment.assignmentType == AssignmentType.TPO_READING)
				.sort((pre, next) => this.naturalSort(pre.assignmentName, next.assignmentName));
		});
	}

	public changeType(assignmentType: any) {
		this.selectedAssignmentType = assignmentType.name;
		this.assignmentList = this.allAssignment
			.filter(assignment => assignment.assignmentType == assignmentType.value)
			.sort((pre, next) => this.naturalSort(pre.assignmentName, next.assignmentName));
	}

	public selectAssignment(assignmentId: string) {
		this.selectedId = assignmentId;
	}

	public closeDialog() {
		if (this.selectedId.length == 0) {
			this.dialogRef.close();
		}
		this.dialogRef.close({
			'assignment': this.selectedId
		});
	}

	private naturalSort(a: String, b: string): number {
		function chunkify(t) {
			var tz = [], x = 0, y = -1, n = false, i, j;

			while (i = (j = t.charAt(x++)).charCodeAt(0)) {
				var m = (i == 46 || (i >= 48 && i <= 57));
				if (m !== n) {
					tz[++y] = "";
					n = m;
				}
				tz[y] += j;
			}
			return tz;
		}

		var aa = chunkify(a);
		var bb = chunkify(b);

		for (let x = 0; aa[x] && bb[x]; x++) {
			if (aa[x] !== bb[x]) {
				var c = Number(aa[x]), d = Number(bb[x]);
				if (c == aa[x] && d == bb[x]) {
					return c - d;
				} else return (aa[x] > bb[x]) ? 1 : -1;
			}
		}
		return aa.length - bb.length;
	}

}
