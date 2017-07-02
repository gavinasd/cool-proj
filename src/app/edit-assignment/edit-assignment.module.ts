import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditAssignmentComponent} from "./edit-assignment.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {EditQuestionListComponent} from "./edit-question-list/edit-question-list.component";
import {EditTporeadingQuestionComponent} from "./edit-question/edit-tporeading-question/edit-tporeading-question.component";
import {AssignmentService} from "../services/assignment.service";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {EditVocabularyQuestionComponent} from './edit-question/edit-vocabulary-question/edit-vocabulary-question.component';
import { VocabularyItemComponent } from './edit-question-list/vocabulary-item/vocabulary-item.component';
import { TpoReadingItemComponent } from './edit-question-list/tpo-reading-item/tpo-reading-item.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
	    SharedModule
    ],
    declarations: [
        EditAssignmentComponent,
        EditQuestionComponent,
        EditQuestionListComponent,
        EditTporeadingQuestionComponent,
        EditVocabularyQuestionComponent,
	    VocabularyItemComponent,
	    TpoReadingItemComponent,
    ],
    providers:[
        AssignmentService
    ]
})
export class EditAssignmentModule { }
