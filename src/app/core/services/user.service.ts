import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {ResultVO} from "../../shared/VO/ResultVO";
import {LoginRegisterVO} from "../../shared/VO/LoginRegisterVO";
import {HttpParams} from "@angular/common/http";
import {Assignment} from "../../models/assignments/Assignment";

@Injectable()
export class UserService {

	constructor(private httpService: HttpService) {
	}

	public login(phone: string, password: string): Observable<ResultVO<LoginRegisterVO>> {
		var body = JSON.stringify({
			'phone': phone,
			'password': password
		});
		return this.httpService
			.makePost(environment.loginUrl, body)
			.pipe(
				map((resp: ResultVO<LoginRegisterVO>) => {
					this.httpService.setToken(resp.data.token);
					this.httpService.setCurrentId(resp.data.userId);
					this.httpService.setUserType(resp.data.userType);
					this.httpService.setCurrentUserName(resp.data.userName);
					this.httpService.setCurrentUserAvatar(resp.data.avatar);
					return resp;
				})
			);
	}

	public register(name: string, avatar: string, phone: string, smsCode: string,
	                password: string, type: string): Observable<ResultVO<any>> {

		let url = environment.registerUrl;
		var body = JSON.stringify({
			'nickName': name,
			'avatar': avatar,
			'phone': phone,
			'smsCode': smsCode,
			'password': password,
			'type': type
		});
		return this.httpService
			.makePost(url, body)
			.pipe(
				map((resp: ResultVO<LoginRegisterVO>) => {
					this.httpService.setToken(resp.data.token);
					this.httpService.setCurrentId(resp.data.userId);
					this.httpService.setUserType(resp.data.userType);
					this.httpService.setCurrentUserName(resp.data.userName);
					this.httpService.setCurrentUserAvatar(resp.data.avatar);
					return resp;
				}),
				catchError(this.httpService.handleError<any>('register'))
			);
	}

	public resetPassword(phone: string, sms: string, password: string): Observable<ResultVO<any>> {
		let url = environment.resetPasswordUrl;
		const body = JSON.stringify({
			'phone': phone,
			'sms': sms,
			'password': password
		});
		return this.httpService.makePost(url, body)
			.pipe(
				map((resp: any) => resp.data),
				catchError(this.httpService.handleError<any>('resetPassword'))
			);

	}

	public genSmsCode(phone: string): Observable<ResultVO<any>> {
		let url = environment.smsUrl;
		let param = new HttpParams().set("phone", phone);
		return this.httpService.makeGet(url, param)
			.pipe(
				map((resp: any) => resp.data),
				catchError(this.httpService.handleError<Assignment[]>('genSmsCode'))
			);
	}
}
