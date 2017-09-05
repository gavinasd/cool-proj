import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Assignment} from "../../../../models/assignments/Assignment";
import {HttpService} from "../../../../services/http.service";
import {AssignmentService} from "../../../../services/assignment.service";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-class-detail-nav',
  templateUrl: './class-detail-nav.component.html',
  styleUrls: ['./class-detail-nav.component.css']
})
export class ClassDetailNavComponent implements OnInit {
	@Input() classId:string;
	public assignmentList:Assignment[];
	public userType:number;
	public userName:string;

	constructor(private router:Router, private httpService:HttpService,
	            private assignmentService:AssignmentService, private toastService:ToastService) { }

	ngOnInit() {
		this.userType = Number(this.httpService.getUserType());//把string转成number
		this.userName = String(this.httpService.getCurrentUserName());
		if(this.userType == 1) {
			this.assignmentService.getAllAssignmentList().subscribe((assignmentList:Assignment[]) => {
				this.assignmentList = assignmentList;
			});
		}
	}

	searchClass(form:NgForm){
		console.log(form.value.classForSearch);
		this.router.navigate(['/class/search',form.value.classForSearch]);
	}

	logout(){
		this.httpService.logout();
		this.router.navigate(['/login']);
	}

	gotoHome(){
		this.router.navigate(['/']);
	}
}
