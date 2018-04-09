import { Component, OnInit } from '@angular/core';
import {ClassService} from "../../../core/services/class.service";
import {HttpService} from "../../../core/services/http.service";
import {Observable} from "rxjs";
import {CourseItemVO} from "../../../shared/VO/CourseItemVO";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
    tests:String[];
    courseItemList:CourseItemVO[];
    courseItemList$:Observable<CourseItemVO[]>;

    constructor(private classService:ClassService, private httpService:HttpService) {
        this.tests = ["ab","d","c","d","ddfdf"];
    }

    ngOnInit() {
        this.courseItemList$ = this.classService.getClassList(this.httpService.getCurrentId());
        this.courseItemList$.subscribe((courseItemList:CourseItemVO[])=>{
            this.courseItemList = courseItemList;
        });
    }

}
