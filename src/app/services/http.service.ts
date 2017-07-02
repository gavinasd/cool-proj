import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import { Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment} from "../../environments/environment";

@Injectable()
export class HttpService {

	constructor(private http:Http) {

	}

	public testReadOneUser(){
		this.makeGetWithToken("http://localhost:3000/api/user/"+this.getCurrentId())
			.subscribe((resp)=>{
				console.log(resp.json());
				console.log(JSON.stringify(resp.json()));
			});
	}


	public makeGetWithToken(url:string):Observable<Response>{
		var header = new Headers();
		header.append('Authorization',"Bearer " + this.getToken());
		return this.http.get(url,{headers:header});
	}

	public makePost(url:string, body:any):Observable<Response>{
		var header = new Headers();
		header.append('Content-Type', 'application/json');
		return this.http.post(url,body,
			{headers:header});
	}

	public makePostWithToken(url:string, body:any):Observable<Response>{
		var header = new Headers();
		header.append('Content-Type', 'application/json');
		header.append('Authorization', 'Bearer ' + this.getToken());
		return this.http.post(url,body,{headers:header});
	}

	public makePutWithToken(url:string, body:any):Observable<Response>{
		var header = new Headers();
		header.append('Content-Type', 'application/json');
		header.append('Authorization', 'Bearer ' + this.getToken());
		return this.http.put(url,body,{headers:header});
	}

	public getToken():string{
		return localStorage.getItem("auth_token");
	}

	public setToken(token:string){
		localStorage.setItem("auth_token",token);
	}

	public deleteToken(){
		localStorage.removeItem("auth_token");
	}

	public getCurrentId():string{
		return localStorage.getItem("current_id");
	}

	public setCurrentId(id:string){
		localStorage.setItem('current_id', id);
	}

	public deleteCurrentId(){
		localStorage.removeItem('current_id');
	}

	public getCurrentUserName(){
        return localStorage.getItem('current_name');
	}

	public setCurrentUserName(userName:string){
        localStorage.setItem('current_name', userName);
    }

    public deleteUserName(){
        localStorage.removeItem('current_name');
    }

	public getUserType():string{
		return localStorage.getItem("current_user_type");
	}

	public setUserType(userType:string){
		localStorage.setItem('current_user_type', userType);
	}

	public deleteUserType(){
		localStorage.removeItem('current_user_type');
	}

	public isLoggedIn():boolean{
		return this.getToken()? true:false;
	}

	public logout(){
		this.deleteCurrentId();
		this.deleteUserName();
		this.deleteUserType();
		this.deleteToken();
	}

	public static handleError(error: Response | any){
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body.message) || JSON.stringify(body.errmsg);
			errMsg = `${error.statusText}:${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
