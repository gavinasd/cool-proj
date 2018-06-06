import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ToastService} from '../../core/services/toast.service';
import {HttpService} from '../../core/services/http.service';
import {ClassService} from '../../core/services/class.service';
import {ActivatedRoute, Params} from '@angular/router';
import {UserType} from '../../shared/enums/UserType';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AssignmentGradeVO} from '../../shared/VO/AssignmentGradeVO';
import {ResourceVO} from '../../shared/VO/ResourceVO';
import {ResourceService} from '../../core/services/resource.service';
import {filter, switchMap} from 'rxjs/operators';
import {AddAssignmentDialogComponent} from '../../shared/view/dialogs/add-assignment-dialog/add-assignment-dialog.component';
import {AddResourceDialogComponent} from '../../shared/view/dialogs/add-resource-dialog/add-resource-dialog.component';

@Component({
	selector: 'app-resource-list',
	templateUrl: './resource-list.component.html',
	styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
	@Input() courseId: string;
	public UserType: any = UserType;
	public userType: string;
	private more$: Subject<boolean> = new BehaviorSubject<boolean>(true);
	private page: number = -1;
	public loading: boolean = true;
	public listForShow: ResourceVO[] = [];

	constructor(private dialog: MatDialog,
	            private toastService: ToastService,
	            private httpService: HttpService,
	            private resourceService: ResourceService,
	            private route: ActivatedRoute) {
		this.route.parent.params.forEach((param: Params) => {
			this.courseId = param['classId'];
		});
	}

	ngOnInit() {
		this.userType = this.httpService.getUserType();
		this.more$.switchMap(
			() => {
				this.page++;
				this.loading = true;
				return this.resourceService.getResourceListInCourse(this.courseId, this.page);
			})
			.subscribe((resourceList) => {
				this.loading = false;
				for (let resource of resourceList) {
					this.listForShow.push(resource);
				}
			});
	}

	public openAddResourceDialog() {
		let config = new MatDialogConfig();
		config.disableClose = true;
		this.dialog.open(AddResourceDialogComponent, config).afterClosed()
			.pipe(
				filter(result => !!result),
				switchMap(data => {
					if (data.type == 'upload') {
						let formData = new FormData();
						formData.append('resource', data.file, data.file.name);
						formData.append('courseId', this.courseId);
						return this.resourceService.addResource(formData);
					}
					if (data.type == 'exist') {
						return this.resourceService.addResourceFromExist(this.courseId, data.resourceId);
					}
				})
			)
			.subscribe(
				(resource:ResourceVO) => {
					this.listForShow = [resource].concat(this.listForShow);
				},
				(error)=>{
					this.toastService.error(error);
				}
			);
	}

	//还有更多的作业可以显示
	public canShowMore(): boolean {
		if (this.loading) {
			//这个时候应该还没有获取到assignmentList
			return false;
		}
		else {
			return (this.page + 1) * 10 == this.listForShow.length;
		}
	}

	public showMore() {
		this.more$.next(true);
	}

}
