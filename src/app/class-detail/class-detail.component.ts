import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/Rx';
import {ClassService} from "../services/class.service";

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit, OnDestroy {
    public classId: string;
    constructor(private route: ActivatedRoute, private classService: ClassService) {
        this.route.params.forEach((param: Params) => {
            this.classId = param['classId'];
        });
    }

    ngOnInit() {
    }


	ngOnDestroy(): void {
		console.log('destroy');
    }
}
