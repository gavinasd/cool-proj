import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Injectable()
export class ResourceService {

	constructor(private httpService: HttpService) {
	}

	addResource(formData: FormData): Observable<any> {
		const url = environment.resourceUrl;
		formData.append("userId", this.httpService.getCurrentId());
		return this.httpService.uploadFile(url, formData)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<any>('addResource'))
			);
	}

	addResourceFromExist(courseId: string, resourceId: string): Observable<any> {
		const url = environment.addResourceFromExistUrl;
		const body = {
			'userId': this.httpService.getCurrentId(),
			'courseId': courseId,
			'resourceId': resourceId
		};
		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<any>('addResourceFromExist'))
			);
	}

	getResourceListInUser(page: number): Observable<any> {
		const url = environment.resourceUrl;
		const param = new HttpParams()
			.set('userId', this.httpService.getCurrentId())
			.set('page', page.toString());

		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<any>('getResourceListInUser'))
			);
	}

	getResourceListInCourse(courseId: string, page: number): Observable<any> {
		const url = environment.getResourceListInCourseUrl;
		const param = new HttpParams()
			.set('courseId', courseId)
			.set('page', page.toString());

		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<any>('getResourceListInCourse'))
			);
	}

	deleteResource(courseId: string, resourceId: string): Observable<any> {
		const url = environment.deleteResourceFromCourseUrl;
		const param = new HttpParams()
			.set('courseId', courseId)
			.set('resourceId', resourceId)
			.set('userId', this.httpService.getCurrentId());

		return this.httpService.makeDeleteWithToken(url,param)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<any>('deleteResource'))
			);
	}

	downloadResource(resourceId:string, resourcePath:string, resourceName:string){
		const url = environment.downloadResourceUrl;
		const param = new HttpParams().set("resourceId", resourceId)
		this.httpService.download(url, param)
			.subscribe(
				(data)=>{
					FileSaver.saveAs(data, resourceName);
				},
				(error) => {
					console.log(error);
				});
	}

}
