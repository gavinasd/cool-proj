import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";
import {AssignmentInfo} from "../../models/models";

@Injectable()
export class ClassService {

    constructor(private httpService: HttpService) {
    }

    public createClass(className:string,verifier:string):Observable<any[]>{
        let url = environment.createClassUrl;
        url = url + '/' + this.httpService.getCurrentId();
        var body = JSON.stringify({
            name:className,
            verifier:verifier
        });

        return this.httpService.makePostWithToken(url,body)
            .map(resp=>resp.json()).catch(HttpService.handleError);

    }

    public getClassList(userId:string):Observable<any[]>{
        let url = environment.getClassListUrl;
        url = url + '/' + userId;
        return this.httpService.makeGetWithToken(url).map((resp)=>{
            return resp.json().classes;
        });
    }

    public searchClass(className:string):Observable<any>{
        let url = environment.searchClassUrl;
        url = url + '/' + className;
        return this.httpService.makeGetWithToken(url)
            .map(resp=>resp.json().classes);
    }

    public classAddStudent(classId:string, verifyCode:string):Observable<any>{
        let url = environment.addStudentUrl;
        var body = JSON.stringify({
            studentId:this.httpService.getCurrentId(),
            classId:classId,
            verifyCode:verifyCode
        });

        console.log(body);
        return this.httpService.makePostWithToken(url,body)
            .map(resp=>resp.json()).catch(HttpService.handleError);
    }

    public classGetAllUser(classId:string):Observable<any>{
        let url = environment.getClassAllUserUrl;
        url = url + '/' + classId + '/' + this.httpService.getCurrentId();
        return this.httpService.makeGetWithToken(url)
            .map(resp=>resp.json()).catch(HttpService.handleError);

    }

	/**
	 * 返回这个班级的作业列表，并且附上学生的做题情况
	 */
	public getAssignmentList(classId: string, page:number): Observable<AssignmentInfo[]> {
		let url = environment.getAssignmentListInClassUrl;
		let userId = this.httpService.getCurrentId();
		url = url + '/' + classId + '/' + userId + '/' + page;
		return this.httpService.makeGetWithToken(url)
			.map(resp => resp.json().gradeInfo).catch(HttpService.handleError);
	}

	/**
	 * 在班级中添加上一个作业
	 */
	public addAssignment(classId:string, assignmentId:string):Observable<any[]>{
		let url = environment.addAssignmentToClassUrl;
		var body = JSON.stringify({
			'userId': this.httpService.getCurrentId(),
			'classId':classId,
			'assignmentId':assignmentId
		});
		return this.httpService.makePostWithToken(url, body)
			.map(resp => resp.json())
			.catch(HttpService.handleError);
	}
}
