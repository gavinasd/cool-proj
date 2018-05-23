import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ClassService} from "../core/services/class.service";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {CourseItemVO} from "../shared/VO/CourseItemVO";

@Component({
	selector: 'app-search-class',
	templateUrl: './search-class.component.html',
	styleUrls: ['./search-class.component.scss']
})
export class SearchClassComponent implements OnInit {
	className$: Observable<string>;
	courseItemList: CourseItemVO[];

	constructor(private route: ActivatedRoute, private classService: ClassService) {
		this.className$ = this.route.params.pipe(
			map((param: Params) => {
				return param['className'];
			}));
	}

	ngOnInit() {
		this.className$.pipe(
			switchMap(className => this.classService.searchClass(className))
		).subscribe((courseItemList: CourseItemVO[]) => {
			this.courseItemList = courseItemList;
		});
	}
}
