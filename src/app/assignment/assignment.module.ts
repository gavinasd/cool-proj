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
import { QuestionTimerComponent } from './question-group-list/question-header/question-timer/question-timer.component';
import {MaterialModule} from "../view/common/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AddAssignmentDialogComponent} from "../shared/view/dialogs/add-assignment-dialog/add-assignment-dialog.component";
import {CreateAssignmentDialogComponent} from "../shared/view/dialogs/create-assignment-dialog/create-assignment-dialog.component";
import {AddQuestionDialogComponent} from "../shared/view/dialogs/add-question-dialog/add-question-dialog.component";
import { EditIndependentWritingQuestionComponent } from './edit-assignment/edit-question/edit-independent-writing-question/edit-independent-writing-question.component';
import { EditIntegratedWritingQuestionComponent } from './edit-assignment/edit-question/edit-integrated-writing-question/edit-integrated-writing-question.component';
import { IndependentWritingItemComponent } from './edit-assignment/edit-question-list/independent-writing-item/independent-writing-item.component';
import { IndependentWritingQuestionDetailComponent } from './question-group-list/question-group-detail/independent-writing-question-detail/independent-writing-question-detail.component';
import { ScoreMarkerComponent } from './question-group-list/question-group-detail/common/question-marker/score-marker/score-marker.component';
import { CommonMarkerComponent } from './question-group-list/question-group-detail/common/question-marker/common-marker/common-marker.component';
import {SubmitConfirmDialogComponent} from "../shared/view/dialogs/submit-confirm-dialog/submit-confirm-dialog.component";
import { IntegratedWritingQuestionDetailComponent } from './question-group-list/question-group-detail/integrated-writing-question-detail/integrated-writing-question-detail.component';
import { IntegratedWritingItemComponent } from './edit-assignment/edit-question-list/integrated-writing-item/integrated-writing-item.component';
import { EditTpolisteningQuestionComponent } from './edit-assignment/edit-question/edit-tpolistening-question/edit-tpolistening-question.component';
import { TpoListeningQuestionDetailComponent } from './question-group-list/question-group-detail/tpo-listening-question-detail/tpo-listening-question-detail.component';
import { Convert09ToAZPipe} from "../shared/pipes/convert09-to-az.pipe";
import {DndModule} from "ng2-dnd";
import { QuestionIndexComponent } from './question-group-list/question-group-detail/common/question-index/question-index.component';
import { EditTpospeakingQuestionComponent } from './edit-assignment/edit-question/edit-tpospeaking-question/edit-tpospeaking-question.component';
import { TpoSpeakingQuestionDetailComponent } from './question-group-list/question-group-detail/tpo-speaking-question-detail/tpo-speaking-question-detail.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		SharedModule,
		MaterialModule,
		FlexLayoutModule,
		DndModule.forRoot(),
		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot()
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
		QuestionTimerComponent,
		EditIndependentWritingQuestionComponent,
		EditIntegratedWritingQuestionComponent,
		IndependentWritingItemComponent,
		IndependentWritingQuestionDetailComponent,
		ScoreMarkerComponent,
		CommonMarkerComponent,
		IntegratedWritingQuestionDetailComponent,
		IntegratedWritingItemComponent,
		EditTpolisteningQuestionComponent,
		TpoListeningQuestionDetailComponent,
		QuestionIndexComponent,
		EditTpospeakingQuestionComponent,
		TpoSpeakingQuestionDetailComponent
	],
	entryComponents:[
		AddAssignmentDialogComponent,
		CreateAssignmentDialogComponent,
		AddQuestionDialogComponent,
		SubmitConfirmDialogComponent
	],
	providers:[
		AssignmentService,
		HttpService,
		Convert09ToAZPipe
	],
	exports:[
		QuestionGroupListComponent,
		VocabularyListComponent
	]
})
export class AssignmentModule { }
