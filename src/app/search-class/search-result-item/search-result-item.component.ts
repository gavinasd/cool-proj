import {Component, OnInit, Input} from '@angular/core';
import {ClassInfo} from "../../models/models";
import {ClassService} from "../../services/class.service";
import {ToastService} from "../../services/toast.service";

@Component({
    selector: 'app-search-result-item',
    templateUrl: './search-result-item.component.html',
    styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {
    @Input() classInfo:ClassInfo;

    constructor(private classService:ClassService,private toastService:ToastService) { }

    ngOnInit() {
    }

    followClass(form:any){
        let verifyCode = form.verifyCode;
        this.classService.classAddStudent(this.classInfo.classId, verifyCode)
            .subscribe((json)=>{
                document.getElementById('closeModal').click();
                this.toastService.success("成功加入班级");
            },(err)=>{
                document.getElementById('closeModal').click();
                this.toastService.error(err);
            });
    }

}
