import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {environment} from "../../../environments/environment";
import {HttpParams} from "@angular/common/http";
import {Assignment} from "../../models/assignments/Assignment";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class BulletinService {

	constructor(private httpService: HttpService) {
	}

	getBulletinMessage(courseId: string) {
		let url = environment.bulletinMessageUrl;
		let param = new HttpParams().set("courseId", courseId);
		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map((resp: any) => resp.data),
				catchError(this.httpService.handleError<any>('getBulletinMessage'))
			);
	}

	createBulletinMessage(courseId:string, message:string) {
		let url = environment.bulletinMessageUrl;
		let body = JSON.stringify({
			'courseId': courseId,
			'userId': this.httpService.getCurrentId(),
			'message': message
		});
		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map((resp: any) => resp.data),
				catchError(this.httpService.handleError<any>('createBulletinMessage'))
			);
	}

}
