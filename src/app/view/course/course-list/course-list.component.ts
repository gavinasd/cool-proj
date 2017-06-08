import { Component, OnInit } from '@angular/core';
import {ClassInfo} from "../../../models/models";
import {ClassService} from "../../../services/class.service";
import {HttpService} from "../../../services/http.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-course-list',
  templateUrl: 'course-list.component.html',
  styleUrls: ['course-list.component.css']
})
export class CourseListComponent implements OnInit {
    tests:String[];
    classInfoList:ClassInfo[];
    classInfoList$:Observable<any[]>;

    constructor(private classService:ClassService, private httpService:HttpService) {
        this.tests = ["ab","d","c","d","ddfdf"];
    }

    ngOnInit() {
        this.classInfoList$ = this.classService.getClassList(this.httpService.getCurrentId());
        this.classInfoList$.map((classInfoList:any[])=>{
            return classInfoList.map((classInfo:any)=>{
                let mClassInfo:ClassInfo = new ClassInfo(classInfo._id,classInfo.name);
                return mClassInfo;
            })
        }).subscribe((classInfoList:ClassInfo[])=>{
            console.log(JSON.stringify(classInfoList));
            this.classInfoList = classInfoList;
        })


    }

}
