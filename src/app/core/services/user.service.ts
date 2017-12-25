import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {User} from "../../models/models";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class UserService {

	constructor(private httpService:HttpService) { }

	public login(email:string, password:string):Observable<string>{
		console.log('service login start');
		var body = JSON.stringify({
			'email':email,
			'password':password
		});
		return this.httpService
			.makePost(environment.loginUrl,body)
			.pipe(
				map((resp:any)=>{
					this.httpService.setToken(resp.token);
					this.httpService.setCurrentId(resp.id);
					this.httpService.setUserType(resp.userType);
					this.httpService.setCurrentUserName(resp.userName);
					this.httpService.setCurrentUserAvatar(resp.avatar);
					return resp;
				}),
				catchError(HttpService.handleError<string>('login'))
			);

	}

	public register(name:string, avatar:string, email:string,
					password:string, type:number):Observable<string>{

		let url = environment.registerUrl;
		var body = JSON.stringify({
			'nickName':name,
			'avatar': avatar,
			'email':email,
			'password':password,
			'userType':type.toString()
		});
		return this.httpService
			.makePost(url,body)
			.pipe(
				map((resp)=>{
					this.httpService.setToken(resp.token);
					this.httpService.setCurrentId(resp.id);
					this.httpService.setUserType(resp.userType);
					this.httpService.setCurrentUserName(resp.userName);
					this.httpService.setCurrentUserAvatar(resp.avatar);
					return resp.id;
				}),
				catchError(HttpService.handleError<string>('register'))
			);
	}
}
