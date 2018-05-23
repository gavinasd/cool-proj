import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {Router} from "@angular/router";

@Injectable()
export class HttpService {

	constructor(private http: HttpClient, private router: Router) {

	}

	public testReadOneUser() {
		this.makeGetWithToken("http://localhost:3000/api/user/" + this.getCurrentId())
			.subscribe((resp) => {
				console.log(resp.json());
				console.log(JSON.stringify(resp.json()));
			});
	}

	public makeGet(url: string, params?:any):Observable<any> {
		return this.http.get<any>(url, {params: params});
	}

	public makeGetWithToken(url: string, params?: any): Observable<any> {
		var header = new HttpHeaders({
			'Authorization': 'Bearer ' + this.getToken()
		});
		return this.http.get<any>(url, {headers: header, params: params});
	}

	public makePost(url: string, body: any): Observable<any> {
		var header = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post(url, body,
			{headers: header});
	}

	public makePostWithToken(url: string, body: any): Observable<any> {
		var header = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.getToken()
		});
		return this.http.post(url, body, {headers: header});
	}

	public makePutWithToken(url: string, body: any): Observable<any> {
		var header = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.getToken()
		});
		return this.http.put(url, body, {headers: header});
	}

	public makeDeleteWithToken(url: string): Observable<any> {
		const header = new HttpHeaders({
			'Authorization': 'Bearer ' + this.getToken()
		});
		return this.http.delete(url, {headers: header});
	}

	public uploadFile(url: string, formData: FormData): Observable<any> {
		var header = new HttpHeaders({
			'Authorization': 'Bearer ' + this.getToken()
		});
		return this.http.post<any>(url, formData, {headers: header});
	}

	public getToken(): string {
		return localStorage.getItem("auth_token");
	}

	public setToken(token: string) {
		localStorage.setItem("auth_token", token);
	}

	public deleteToken() {
		localStorage.removeItem("auth_token");
	}

	public getCurrentId(): string {
		return localStorage.getItem("current_id");
	}

	public setCurrentId(id: string) {
		localStorage.setItem('current_id', id);
	}

	public deleteCurrentId() {
		localStorage.removeItem('current_id');
	}

	public getCurrentUserName() {
		return localStorage.getItem('current_name');
	}

	public setCurrentUserName(userName: string) {
		localStorage.setItem('current_name', userName);
	}

	public deleteUserName() {
		localStorage.removeItem('current_name');
	}

	public getCurrentUserAvatar() {
		return localStorage.getItem('current_avatar');
	}

	public setCurrentUserAvatar(avatar: string) {
		localStorage.setItem('current_avatar', avatar);
	}

	public deleteUserAvatar() {
		localStorage.removeItem('current_avatar');
	}

	public getUserType(): string {
		return localStorage.getItem("current_user_type");
	}

	public setUserType(userType: string) {
		localStorage.setItem('current_user_type', userType);
	}

	public deleteUserType() {
		localStorage.removeItem('current_user_type');
	}

	public isLoggedIn(): boolean {
		return this.getToken() ? true : false;
	}

	public logout() {
		this.deleteCurrentId();
		this.deleteUserName();
		this.deleteUserAvatar();
		this.deleteUserType();
		this.deleteToken();
	}


	public handleError<T>(operation = 'operation', result?: T) {
		return (error: HttpErrorResponse): Observable<T> => {

			if (error.status == 401) {
				this.router.navigate(['/login']);
			}

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.error(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return Observable.throw(error.error.msg);
		};
	}

}
