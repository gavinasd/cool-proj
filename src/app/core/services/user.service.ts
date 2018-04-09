import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {ResultVO} from "../../shared/VO/ResultVO";
import {LoginRegisterVO} from "../../shared/VO/LoginRegisterVO";

@Injectable()
export class UserService {

	constructor(private httpService:HttpService) { }

	public login(email:string, password:string):Observable<ResultVO<LoginRegisterVO>>{
		console.log('service login start');
		var body = JSON.stringify({
			'email':email,
			'password':password
		});
		return this.httpService
			.makePost(environment.loginUrl,body)
			.pipe(
				map((resp:ResultVO<LoginRegisterVO>)=>{
					this.httpService.setToken(resp.data.token);
					this.httpService.setCurrentId(resp.data.userId);
					this.httpService.setUserType(resp.data.userType);
					this.httpService.setCurrentUserName(resp.data.userName);
					this.httpService.setCurrentUserAvatar(resp.data.avatar);
					return resp;
				})
			);
	}

	public register(name:string, avatar:string, email:string,
					password:string, type:string):Observable<ResultVO<LoginRegisterVO>>{

		let url = environment.registerUrl;
		var body = JSON.stringify({
			'nickName':name,
			'avatar': avatar,
			'email':email,
			'password':password,
			'type':type
		});
		return this.httpService
			.makePost(url,body)
			.pipe(
				map((resp:ResultVO<LoginRegisterVO>)=>{
					this.httpService.setToken(resp.data.token);
					this.httpService.setCurrentId(resp.data.userId);
					this.httpService.setUserType(resp.data.userType);
					this.httpService.setCurrentUserName(resp.data.userName);
					this.httpService.setCurrentUserAvatar(resp.data.avatar);
					return resp;
				})
			);
	}
}
