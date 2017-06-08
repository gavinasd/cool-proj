import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import 'rxjs/Rx';
import {ClassService} from "../../../services/class.service";

@Component({
  selector: 'app-class-detail',
  templateUrl: 'class-detail.component.html',
  styleUrls: ['class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
	private classId:string;
  	constructor(private route:ActivatedRoute, private classService:ClassService) {
        this.route.params.forEach((param:Params)=>{
            this.classId = param['classId'];
        });
	}

  	ngOnInit() {
  	}

}
