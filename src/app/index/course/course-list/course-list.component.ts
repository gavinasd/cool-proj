import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../../core/services/class.service";
import {HttpService} from "../../../core/services/http.service";
import {Observable} from "rxjs";
import {CourseItemVO} from "../../../shared/VO/CourseItemVO";

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
	courseItemList: CourseItemVO[] = [];
	courseItemList$: Observable<CourseItemVO[]>;
	private page = 0;
	public loading:boolean = false;

	constructor(private classService: ClassService, private httpService: HttpService) {
	}

	ngOnInit() {
		this.showMore();
	}

	showMore() {
		this.loading = true;

		this.courseItemList$ = this.classService.getClassList(this.httpService.getCurrentId(), this.page);
		this.courseItemList$.subscribe((courseItemList: CourseItemVO[]) => {
			this.page++;
			this.loading = false;
			this.courseItemList = this.courseItemList.concat(courseItemList);
		});
	}

	canShowMore(): boolean {
    	if (this.courseItemList.length == ( this.page ) * 6){
    		return true;
	    }
	    return false;
	}

}
