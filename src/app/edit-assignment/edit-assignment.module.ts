import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditAssignmentComponent} from "./edit-assignment/edit-assignment.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {EditQuestionListComponent} from "./edit-question-list/edit-question-list.component";
import {EditTporeadingQuestionComponent} from "./edit-tporeading-question/edit-tporeading-question.component";
import {AssignmentService} from "../services/assignment.service";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        EditAssignmentComponent,
        EditQuestionComponent,
        EditQuestionListComponent,
        EditTporeadingQuestionComponent
    ],
    providers:[
        AssignmentService
    ]
})
export class EditAssignmentModule { }
