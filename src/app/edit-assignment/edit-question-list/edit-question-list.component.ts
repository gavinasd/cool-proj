import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AssignmentService} from "../../core/services/assignment.service";
import {QuestionGroup} from "../../models/Questions/QuestionGroup";
import {Assignment} from "../../models/assignments/Assignment";

@Component({
  selector: 'app-edit-question-list',
  templateUrl: './edit-question-list.component.html',
  styleUrls: ['./edit-question-list.component.css']
})
export class EditQuestionListComponent implements OnInit, OnChanges {
    @Input() assignmentId: string;
    groupList: QuestionGroup[];

    constructor(protected assignmentService: AssignmentService) { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.assignmentService.getAssignment(this.assignmentId)
            .subscribe((assignment:Assignment) => {
                this.groupList = assignment.questionGroupList;
            });
    }

}
