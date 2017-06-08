import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {Question} from "../../models/models";

@Component({
  selector: 'app-edit-question-list',
  templateUrl: 'edit-question-list.component.html',
  styleUrls: ['edit-question-list.component.css']
})
export class EditQuestionListComponent implements OnInit,OnChanges{
    @Input() assignmentId:string;
    questionList:Question[];

    constructor(private assignmentService:AssignmentService) { }

    ngOnInit() {
    }

    ngOnChanges(){
        this.assignmentService.getQuestionListByAssignment(this.assignmentId)
            .subscribe((questionList)=>{
                console.log(questionList);
                this.questionList = questionList;
            });
    }

}
