import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AssignmentService} from '../../services/assignment.service';
import {Question} from "../../models/Questions/Question";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";

@Component({
  selector: 'app-edit-question-list',
  templateUrl: 'edit-question-list.component.html',
  styleUrls: ['edit-question-list.component.css']
})
export class EditQuestionListComponent implements OnInit, OnChanges {
    @Input() assignmentId: string;
    groupList: QuestionGroup[];

    constructor(protected assignmentService: AssignmentService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.assignmentService.getQuestionGroupList(this.assignmentId)
            .subscribe((groupList:QuestionGroup[]) => {
                console.log(groupList);
                this.groupList = groupList;
            });
    }

}
