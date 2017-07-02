import {Component, Input, OnInit} from '@angular/core';
import {ClassService} from "../../services/class.service";

@Component({
    selector: 'app-class-user-list',
    templateUrl: './class-user-list.component.html',
    styleUrls: ['./class-user-list.component.css']
})
export class ClassUserListComponent implements OnInit {
    @Input() classId:string;
    teacherList:any[];
    studentList:any[];

    constructor(private classService:ClassService) { }

    ngOnInit() {
        this.classService.classGetAllUser(this.classId)
            .subscribe((data)=>{
                console.log(data);
                this.teacherList = data.teacherList;
                this.studentList = data.studentList;
            });
    }

}
