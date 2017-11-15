import {Component, OnInit, Input} from '@angular/core';
import {ToastService} from "../../core/services/toast.service";
import {AssignmentInfo} from "../../models/models";
import {Subject} from "rxjs/Subject";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpService} from "../../core/services/http.service";
import {AddAssignmentDialogComponent} from "../../shared/view/dialogs/add-assignment-dialog/add-assignment-dialog.component";
import {Assignment} from "../../models/assignments/Assignment";
import {ClassService} from "../../core/services/class.service";

@Component({
    selector: 'app-assignment-list',
    templateUrl: './assignment-list.component.html',
    styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
    @Input() public classId:string;
    private more$:Subject<boolean> = new BehaviorSubject<boolean>(true);
    private page:number = 0;
    public userType:string;
    public loading:boolean = true;
    public listForShow:AssignmentInfo[] = [];

    constructor(private dialog: MdDialog,
                private toastService: ToastService,
                private httpService: HttpService,
                private classService:ClassService) {
    }

    ngOnInit() {
		this.userType = this.httpService.getUserType();

		this.more$.switchMap(
			()=>{
        	    console.log('show more');
        	    this.page ++;
        	    this.loading = true;
        	    return this.classService.getAssignmentList(this.classId, this.page);
	        })
	        .subscribe((assignmentList)=>{
				this.loading = false;
		        for(let assignment of assignmentList){
		        	this.listForShow.push(assignment);
		        }
	        });
    }

    needToMark(assignmentType:string):boolean{
    	return Assignment.needToMark(assignmentType);
    }

    openAddAssignmentDialog(){
	    let config = new MdDialogConfig();
	    config.width = '400px';
	    this.dialog.open(AddAssignmentDialogComponent, config).afterClosed()
		    .filter(result => !!result)
		    .subscribe(data => {
			    this.addAssignment(data);
		    });
    }

	addAssignment(form:any){
		console.log(form.assignment);
		this.classService.addAssignment(this.classId,form.assignment)
			.subscribe(
				(json)=>{
					this.toastService.success("成功添加作业");
				},(err)=>{
					this.toastService.error(err);
				}
			)
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
