import {Component, OnInit, Input} from '@angular/core';
import {ClassInfo} from "../../../models/models";

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
  @Input() classInfo:ClassInfo;
  constructor() {
  }

  ngOnInit() {
  }

}
