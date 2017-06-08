import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {User} from "../models/models";

@Injectable()
export class UserService {

	constructor(private httpService:HttpService) { }

	public login(email:string, password:string):Observable<string>{
		console.log('service login start');
		var user:Observable<User>;
		var body = JSON.stringify({
			'email':email,
			'password':password
		});
		return this.httpService
			.makePost(environment.loginUrl,body)
			.map((resp)=>{
					this.httpService.setToken(resp.json().token);
					this.httpService.setCurrentId(resp.json().id);
                    this.httpService.setUserType(resp.json().userType);
                    this.httpService.setCurrentUserName(resp.json().userName);
					return resp.json();
				})
			.catch(HttpService.handleError);

	}

	public register(name:string, email:string,
					password:string, type:number):Observable<string>{

		console.log('service register start');
		var body = JSON.stringify({
			'nickName':name,
			'email':email,
			'password':password,
			'userType':type.toString()
		});
		return this.httpService
			.makePost(environment.registerUrl,body)
			.map((resp)=>{
				this.httpService.setToken(resp.json().token);
				this.httpService.setCurrentId(resp.json().id);
				this.httpService.setUserType(resp.json().userType);
				this.httpService.setCurrentUserName(resp.json().userName);
				return resp.json().id;
			})
			.catch(HttpService.handleError);
	}
}
