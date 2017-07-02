import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {AssignmentService} from "../../services/assignment.service";
import {ToastService} from "../../services/toast.service";
import {Assignment} from "../../models/assignments/Assignment";

@Component({
  selector: 'app-class-detail-nav',
  templateUrl: './class-detail-nav.component.html',
  styleUrls: ['./class-detail-nav.component.css']
})
export class ClassDetailNavComponent implements OnInit {
	@Input() classId:string;
	public assignmentList:Assignment[];
	public userType:number;

	constructor(private router:Router, private httpService:HttpService,
	            private assignmentService:AssignmentService, private toastService:ToastService) { }

	ngOnInit() {
		this.userType = Number(this.httpService.getUserType());//把string转成number
		if(this.userType == 1) {
			this.assignmentService.getAllAssignmentList().subscribe((assignmentList:Assignment[]) => {
				this.assignmentList = assignmentList;
			});
		}
	}

	addAssignment(form:any){
		console.log(form.assignment);
		this.assignmentService.addAssignmentToClass(this.classId,form.assignment)
			.subscribe(
				(json)=>{
					document.getElementById('closeModal').click();
					this.toastService.success("成功添加作业");
				},(err)=>{
					document.getElementById('closeModal').click();
					this.toastService.error(err);
				}
			)
	}

	searchClass(form:any){
		console.log(form.classForSearch);
		this.router.navigate(['/class/search',form.classForSearch]);
	}

	logout(){
		this.httpService.logout();
		this.router.navigate(['/login_register']);
	}
}
