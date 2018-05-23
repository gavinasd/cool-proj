import {Component, OnInit, Input} from '@angular/core';
import {ToastService} from "../../core/services/toast.service";
import {AssignmentInfo} from "../../models/models";
import {Subject} from "rxjs/Subject";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpService} from "../../core/services/http.service";
import {AddAssignmentDialogComponent} from "../../shared/view/dialogs/add-assignment-dialog/add-assignment-dialog.component";
import {Assignment} from "../../models/assignments/Assignment";
import {ClassService} from "../../core/services/class.service";
import {filter, switchMap} from "rxjs/operators";
import {UserType} from "../../shared/enums/UserType";
import {AssignmentGradeVO} from "../../shared/VO/AssignmentGradeVO";
import {AssignmentType} from "../../shared/enums/AssignmentType";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
	selector: 'app-assignment-list',
	templateUrl: './assignment-list.component.html',
	styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {
	public classId: string;
	private more$: Subject<boolean> = new BehaviorSubject<boolean>(true);
	private page: number = -1;
	public userType: string;
	public loading: boolean = true;
	public listForShow: AssignmentGradeVO[] = [];
	public openExpansionList: boolean[] = [];
	public UserType: any = UserType;

	constructor(private dialog: MatDialog,
	            private toastService: ToastService,
	            private httpService: HttpService,
	            private classService: ClassService,
	            private route: ActivatedRoute) {
		this.route.parent.params.forEach((param: Params) => {
			this.classId = param['classId'];
		});
	}

	ngOnInit() {
		this.userType = this.httpService.getUserType();

		this.more$.switchMap(
			() => {
				console.log('show more');
				this.page++;
				this.loading = true;
				return this.classService.getAssignmentList(this.classId, this.page);
			})
			.subscribe((assignmentList) => {
				this.loading = false;
				for (let assignment of assignmentList) {
					this.listForShow.push(assignment);
					if (this.openExpansionList.length == 0) {
						this.openExpansionList.push(true);
					}
					else {
						this.openExpansionList.push(false);
					}
				}
			});
	}

	needToMark(assignmentType: AssignmentType): boolean {
		return Assignment.needToMark(assignmentType);
	}

	toggleExpansion(i: number) {
		this.openExpansionList[i] = !this.openExpansionList[i];
	}

	openAddAssignmentDialog() {
		let config = new MatDialogConfig();
		config.width = '100%';
		config.height = '100%';
		config.disableClose = true;
		this.dialog.open(AddAssignmentDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result)
			)
			.subscribe(data => {
				this.addAssignment(data);
			});
	}

	addAssignment(form: any) {
		console.log(form.assignment);
		this.classService.addAssignment(this.classId, form.assignment)
			.pipe(
				switchMap(() => this.classService.getAssignmentList(this.classId, 0))
			)
			.subscribe(
				(assignmentList: AssignmentGradeVO[]) => {
					this.listForShow = [assignmentList[0]].concat(this.listForShow);
					this.openExpansionList = [true].concat(this.openExpansionList);
					this.toastService.success("成功添加作业");
				}, (err) => {
					this.toastService.error(err);
				}
			)
	}

	//还有更多的作业可以显示
	public canShowMore(): boolean {
		if (this.loading) {
			//这个时候应该还没有获取到assignmentList
			return false;
		}
		else {
			return (this.page + 1) * 5 == this.listForShow.length;
		}
	}

	public showMore() {
		this.more$.next(true);
	}


}
