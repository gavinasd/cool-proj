import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {AssignmentService} from "../../services/assignment.service";
import {AssignmentInfo} from "../../models/models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
    @Input() public classId:string;
    private more$:Subject<boolean> = new BehaviorSubject<boolean>(true);
    private page:number = 0;
    public loading:boolean = true;
    public listForShow:AssignmentInfo[] = [];

    constructor(private route:ActivatedRoute,
                private toastService:ToastService,
                private assignmentService:AssignmentService) {
    }

    ngOnInit() {
        console.log(this.classId);

		this.more$.switchMap(
			()=>{
        	    console.log('show more');
        	    this.page ++;
        	    this.loading = true;
        	    return this.assignmentService.getAssignmentList(this.classId, this.page);
	        })
	        .subscribe((assignmentList)=>{
				this.loading = false;
		        for(let assignment of assignmentList){
		        	this.listForShow.push(assignment);
		        }
	        });
    }

    //还有更多的作业可以显示
	public canShowMore():boolean{
		if(this.loading){
			//这个时候应该还没有获取到assignmentList
			return false;
		}
		else {
			return this.page*5 == this.listForShow.length;
		}
	}

	public showMore(){
    	this.more$.next(true);
	}


}
