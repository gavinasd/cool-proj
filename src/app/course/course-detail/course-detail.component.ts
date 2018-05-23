import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
	selector: 'app-course-detail',
	templateUrl: './course-detail.component.html',
	styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

	classId: string;

	constructor(private route: ActivatedRoute) {
		this.route.parent.params.forEach((param: Params) => {
			this.classId = param['classId'];
		});
	}

	ngOnInit() {
		window.scroll(0,0);
	}

}
