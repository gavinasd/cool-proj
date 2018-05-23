
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'app-class-detail',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    public classId: string;
    constructor(private route: ActivatedRoute) {
        this.route.params.forEach((param: Params) => {
            this.classId = param['classId'];
        });
    }

    ngOnInit() {
    }
}
