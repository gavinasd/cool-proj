import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../environments/environment";
import {ClassInfo} from "../models/models";
import {Response} from "@angular/http";

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

    public getClassDetail(classId:string):Observable<Response>{
        let url = environment.getClassDetailUrl;
        let userId = this.httpService.getCurrentId();
        url = url +'/'+ classId +'/'+userId;
        return this.httpService.makeGetWithToken(url);
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
}
