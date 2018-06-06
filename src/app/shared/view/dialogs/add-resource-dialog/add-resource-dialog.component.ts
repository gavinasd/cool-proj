import {Component, OnInit} from '@angular/core';
import {ResourceVO} from '../../../VO/ResourceVO';
import {ResourceService} from '../../../../core/services/resource.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatDialogRef} from '@angular/material';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
	selector: 'app-add-resource-dialog',
	templateUrl: './add-resource-dialog.component.html',
	styleUrls: ['./add-resource-dialog.component.scss']
})
export class AddResourceDialogComponent implements OnInit {

	private more$: Subject<boolean> = new BehaviorSubject<boolean>(true);
	private page: number = -1;
	public loading: boolean = true;
	public listForShow: ResourceVO[] = [];
	public selectedId: string = '';
	public fileName: string = '';
	public uploadFile: File;


	constructor(private resourceService: ResourceService,
	            public dialogRef: MatDialogRef<AddResourceDialogComponent>,
	            private toastService: ToastService) {
	}

	ngOnInit() {
		this.more$.switchMap(
			() => {
				this.page++;
				this.loading = true;
				return this.resourceService.getResourceListInUser(this.page);
			})
			.subscribe((resourceList) => {
				this.loading = false;
				for (let resource of resourceList) {
					this.listForShow.push(resource);
				}
			});
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

	public getFileImg(fileName: string): string {
		if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
			return '/assets/resources/img/doc.png';
		} else if (fileName.endsWith('.jpg')) {
			return '/assets/resources/img/jpg.png';
		} else if (fileName.endsWith('.pdf')) {
			return '/assets/resources/img/pdf.png';
		} else if (fileName.endsWith('.png')) {
			return '/assets/resources/img/png.png';
		} else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
			return '/assets/resources/img/ppt.png';
		} else if (fileName.endsWith('.zip')) {
			return '/assets/resources/img/zip.png';
		}

		return '/assets/resources/img/file.png';
	}

	public toggleSelectResource(resourceId: string) {
		this.selectedId = resourceId;
		this.fileName = '';
		this.uploadFile = null;
	}

	public selectFile(event) {
		this.selectedId = '';
		if(event.target.files.length > 1) {
			this.toastService.error("一次只上传一个文件");
			return;
		}
		if(event.target.files[0].size > 10485760) {
			this.toastService.error("上传文件不要超过10MB");
			return;
		}
		this.uploadFile = event.target.files[0];
		this.fileName = this.uploadFile.name;
	}

	public closeDialog() {
		if (this.uploadFile && this.uploadFile.size > 0) {
			this.dialogRef.close({
				'type': 'upload',
				'file': this.uploadFile
			});
		} else if (this.selectedId.length > 0) {
			this.dialogRef.close({
				'type': 'exist',
				'resourceId': this.selectedId
			});
		} else {
			this.dialogRef.close();
		}
	}

}
