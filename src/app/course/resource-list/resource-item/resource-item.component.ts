import {Component, Input, OnInit} from '@angular/core';
import {ResourceService} from '../../../core/services/resource.service';
import {environment} from '../../../../environments/environment';

@Component({
	selector: 'app-resource-item',
	templateUrl: './resource-item.component.html',
	styleUrls: ['./resource-item.component.scss']
})
export class ResourceItemComponent implements OnInit {
	@Input() resourcePath: string;
	@Input() resourceName: string;
	@Input() resourceId: string;

	downloadUrl = environment.downloadResourceUrl;

	constructor(private resourceService:ResourceService) {
	}

	ngOnInit() {
	}

	public getFileImg(): string {
		if (this.resourceName.endsWith('.doc') || this.resourceName.endsWith('.docx')) {
			return '/assets/resources/img/doc.png';
		} else if (this.resourceName.endsWith('.jpg')) {
			return '/assets/resources/img/jpg.png';
		} else if (this.resourceName.endsWith('.pdf')) {
			return '/assets/resources/img/pdf.png';
		} else if (this.resourceName.endsWith('.png')) {
			return '/assets/resources/img/png.png';
		} else if (this.resourceName.endsWith('.ppt') || this.resourceName.endsWith('pptx')) {
			return '/assets/resources/img/ppt.png';
		} else if (this.resourceName.endsWith('.zip') || this.resourceName.endsWith('.rar')) {
			return '/assets/resources/img/zip.png';
		}

		return '/assets/resources/img/file.png';
	}

	download(){
		this.resourceService.downloadResource(this.resourceId, this.resourcePath, this.resourceName);
	}

}
