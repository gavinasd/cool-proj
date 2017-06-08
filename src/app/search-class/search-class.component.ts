import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ClassService} from "../services/class.service";
import {ClassInfo} from "../models/models";
import {Observable} from "rxjs";

@Component({
    selector: 'app-search-class',
    templateUrl: './search-class.component.html',
    styleUrls: ['./search-class.component.css']
})
export class SearchClassComponent implements OnInit {
    className:string;
    classInfoList:ClassInfo[];
    classInfoList$:Observable<any[]>;

    constructor(private route:ActivatedRoute, private classService:ClassService) {
        this.route.params.forEach((param:Params)=>{
            this.className = param['className'];
        });
    }

    ngOnInit() {
        this.classInfoList$ = this.classService.searchClass(this.className);
        this.classInfoList$.map((classInfoList:any[])=>{
            return classInfoList.map((classInfo:any)=>{
                let mClassInfo:ClassInfo = new ClassInfo(classInfo._id,classInfo.name);
                return mClassInfo;
            })
        }).subscribe((classInfoList:ClassInfo[])=>{
            this.classInfoList = classInfoList;
        });
    }

}
