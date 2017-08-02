import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AssignmentService} from "../services/assignment.service";
import {HttpService} from "../services/http.service";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {TpoReadingQuestionDetailComponent} from "./question-group-list/question-group-detail/tpo-reading-question-detail/tpo-reading-question-detail.component";
import {QuestionGroupDetailComponent} from "./question-group-list/question-group-detail/question-group-detail.component";
import {VocabularyQuestionDetailComponent} from "./question-group-list/question-group-detail/vocabulary-question-detail/vocabulary-question-detail.component";
import {QuestionHeaderComponent} from "./question-group-list/question-header/question-header.component";
import {QuestionGroupListComponent} from "./question-group-list/question-group-list.component";
import { QuestionPagerComponent } from './question-group-list/question-group-detail/common/question-pager/question-pager.component';
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";
import { VocabularyItemComponent } from './question-group-list/question-group-detail/vocabulary-question-detail/vocabulary-item/vocabulary-item.component';
import { VocabularyListComponent } from './question-group-list/question-group-detail/vocabulary-question-detail/vocabulary-list/vocabulary-list.component';
import {TpoReadingItemComponent} from "./edit-assignment/edit-question-list/tpo-reading-item/tpo-reading-item.component";
import {EditVocabularyItemComponent} from "./edit-assignment/edit-question-list/edit-vocabulary-item/edit-vocabulary-item.component";
import {EditVocabularyQuestionComponent} from "./edit-assignment/edit-question/edit-vocabulary-question/edit-vocabulary-question.component";
import {EditTporeadingQuestionComponent} from "./edit-assignment/edit-question/edit-tporeading-question/edit-tporeading-question.component";
import {EditQuestionListComponent} from "./edit-assignment/edit-question-list/edit-question-list.component";
import {EditQuestionComponent} from "./edit-assignment/edit-question/edit-question.component";
import {EditAssignmentComponent} from "./edit-assignment/edit-assignment.component";
import { QuestionMarkerComponent } from './question-group-list/question-group-detail/common/question-marker/question-marker.component';
import { QuestionTimerComponent } from './question-group-list/question-header/question-timer/question-timer.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		SharedModule,
		FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
	],
	declarations: [
		TpoReadingQuestionDetailComponent,
		VocabularyQuestionDetailComponent,
		QuestionGroupDetailComponent,
		QuestionHeaderComponent,
		QuestionGroupListComponent,
		QuestionPagerComponent,
		VocabularyItemComponent,
		VocabularyListComponent,
		EditAssignmentComponent,
		EditQuestionComponent,
		EditQuestionListComponent,
		EditTporeadingQuestionComponent,
		EditVocabularyQuestionComponent,
		EditVocabularyItemComponent,
		TpoReadingItemComponent,
		QuestionMarkerComponent,
		QuestionTimerComponent,
	],
	providers:[
		AssignmentService,
		HttpService,
	],
	exports:[
		QuestionGroupListComponent,
		VocabularyListComponent
	]
})
export class AssignmentModule { }
