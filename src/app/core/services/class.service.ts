import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";
import {AssignmentInfo} from "../../models/models";
import {catchError, map} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {CourseItemVO} from "../../shared/VO/CourseItemVO";
import {UserVO} from "../../shared/VO/UserVO";
import {AssignmentGradeVO} from "../../shared/VO/AssignmentGradeVO";

@Injectable()
export class ClassService {

	constructor(private httpService: HttpService) {
	}

	public createClass(className: string, verifier: string): Observable<any[]> {
		let url = environment.createClassUrl;
		var body = JSON.stringify({
			userId: this.httpService.getCurrentId(),
			courseName: className,
			verifier: verifier
		});

		return this.httpService.makePostWithToken(url, body)
			.pipe(
				map(resp => resp),
				catchError(this.httpService.handleError<any[]>('createClass'))
			);
	}

	public getClassList(userId: string, page:number): Observable<CourseItemVO[]> {
		let url = environment.getClassListUrl;
		let param = new HttpParams()
			.set("userId", this.httpService.getCurrentId())
			.set("page", page.toString());
		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<any[]>('getClassList'))
			);
	}

	public searchClass(courseName: string): Observable<CourseItemVO[]> {
		let url = environment.searchClassUrl;
		let param = new HttpParams().set("courseName", courseName);
		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map(resp => resp.data)
			);
	}

	public classAddStudent(courseId: string, verifyCode: string): Observable<any> {
		let url = environment.addStudentUrl;
		var body = JSON.stringify({
			studentId: this.httpService.getCurrentId(),
			courseId: courseId,
			verifier: verifyCode
		});

		return this.httpService.makePutWithToken(url, body);
	}

	public classGetAllUser(courseId: string): Observable<UserVO[]> {
		let url = environment.getClassAllUserUrl;
		let param = new HttpParams().set("courseId", courseId);
		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map(resp => resp.data)
			);
	}

	/**
	 * 返回这个班级的作业列表，并且附上学生的做题情况
	 */
	public getAssignmentList(courseId: string, page: number): Observable<AssignmentGradeVO[]> {
		let url = environment.getAssignmentListInClassUrl;
		let param = new HttpParams().set("courseId", courseId)
			.set("userId", this.httpService.getCurrentId())
			.set("page", page.toString());

		return this.httpService.makeGetWithToken(url, param)
			.pipe(
				map(resp => resp.data),
				catchError(this.httpService.handleError<AssignmentInfo[]>('getAssignmentList'))
			);
	}

	/**
	 * 在班级中添加上一个作业
	 */
	public addAssignment(courseId: string, assignmentId: string): Observable<any[]> {
		let url = environment.addAssignmentToClassUrl;
		var body = JSON.stringify({
			'userId': this.httpService.getCurrentId(),
			'courseId': courseId,
			'assignmentId': assignmentId
		});
		return this.httpService.makePutWithToken(url, body);
	}
}
