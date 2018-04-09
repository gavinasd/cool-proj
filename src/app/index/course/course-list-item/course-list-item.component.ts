import {Component, OnInit, Input} from '@angular/core';
import {CourseItemVO} from "../../../shared/VO/CourseItemVO";

@Component({
	selector: 'app-course-list-item',
	templateUrl: './course-list-item.component.html',
	styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
	@Input() courseItem: CourseItemVO;

	constructor() {
	}

	ngOnInit() {
	}

}
