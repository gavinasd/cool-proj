import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ClassService} from "../core/services/class.service";
import {ClassInfo} from "../models/models";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
    selector: 'app-search-class',
    templateUrl: './search-class.component.html',
    styleUrls: ['./search-class.component.css']
})
export class SearchClassComponent implements OnInit {
    className$:Observable<string>;
    classInfoList:ClassInfo[];
    classInfoList$:Observable<any[]>;

    constructor(private route:ActivatedRoute, private classService:ClassService) {
		this.className$ = this.route.params.map((param:Params)=>{
			return param['className'];
		});
    }

    ngOnInit() {
	    this.className$.pipe(
		    switchMap(className => this.classService.searchClass(className)),
		    map((classInfoList:any[])=>{
			    return classInfoList.map((classInfo:any)=>{
				    let mClassInfo:ClassInfo = new ClassInfo(classInfo._id,classInfo.name, classInfo.teacherList);
				    return mClassInfo;
			    })
		    })
	    ).subscribe((classInfoList:ClassInfo[])=>{
            this.classInfoList = classInfoList;
        });
    }
}
