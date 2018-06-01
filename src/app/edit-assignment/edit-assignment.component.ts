import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Assignment} from "../models/assignments/Assignment";
import {AssignmentService} from "../core/services/assignment.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {CreateAssignmentDialogComponent} from "../shared/view/dialogs/create-assignment-dialog/create-assignment-dialog.component";
import {filter} from "rxjs/operators";

@Component({
	selector: 'app-edit-assignment',
	templateUrl: './edit-assignment.component.html',
	styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
	assignmentList: Assignment[];
	selectAssignmentId: string = '';

	constructor(public assignmentService: AssignmentService,
	            private router: Router,
	            private dialog: MatDialog) {
	}

	ngOnInit() {
		this.assignmentService.getAllAssignmentList().subscribe((assignmentList: Assignment[]) => {
			this.assignmentList = assignmentList;
		});
	}

	selectAssignment(assignmentId: string) {
		this.selectAssignmentId = assignmentId;
	}

	openCreateAssignmentDialog() {
		let config = new MatDialogConfig();
		config.width = '400px';
		this.dialog.open(CreateAssignmentDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result)
			).subscribe(data => {
			this.createAssignment(data);
		});
	}

	createAssignment(form: any) {
		const assignmentName = form.assignmentName;
		const assignmentType = form.type;

		this.assignmentService.createAssignment(assignmentName, assignmentType)
			.subscribe((newAssignment: Assignment) => {
				this.assignmentList.push(new Assignment(newAssignment));
			});
	}

	goHome() {
		this.router.navigate(['/']);
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
