import { NgModule } from '@angular/core';
import {EditIndependentWritingQuestionComponent} from "./edit-question/edit-independent-writing-question/edit-independent-writing-question.component";
import {EditIntegratedWritingQuestionComponent} from "./edit-question/edit-integrated-writing-question/edit-integrated-writing-question.component";
import {EditAssignmentComponent} from "./edit-assignment.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {EditQuestionListComponent} from "./edit-question-list/edit-question-list.component";
import {EditTporeadingQuestionComponent} from "./edit-question/edit-tporeading-question/edit-tporeading-question.component";
import {EditVocabularyQuestionComponent} from "./edit-question/edit-vocabulary-question/edit-vocabulary-question.component";
import {EditVocabularyItemComponent} from "./edit-question-list/edit-vocabulary-item/edit-vocabulary-item.component";
import {EditTpolisteningQuestionComponent} from "./edit-question/edit-tpolistening-question/edit-tpolistening-question.component";
import {EditTpospeakingQuestionComponent} from "./edit-question/edit-tpospeaking-question/edit-tpospeaking-question.component";
import {IntegratedWritingItemComponent} from "./edit-question-list/integrated-writing-item/integrated-writing-item.component";
import {TpoReadingItemComponent} from "./edit-question-list/tpo-reading-item/tpo-reading-item.component";
import {IndependentWritingItemComponent} from "./edit-question-list/independent-writing-item/independent-writing-item.component";
import {SharedModule} from "../shared/shared.module";
import {EditAssignmentRoutingModule} from "./edit-assignment-routing.module";
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";
import { EditTpoReadingPassageDialogComponent } from './dialogs/edit-tpo-reading-passage-dialog/edit-tpo-reading-passage-dialog.component';
import { EditTpoReadingQuestionDialogComponent } from './dialogs/edit-tpo-reading-question-dialog/edit-tpo-reading-question-dialog.component';
import { TpoListeningItemComponent } from './edit-question-list/tpo-listening-item/tpo-listening-item.component';
import { EditTpoListeningContentDialogComponent } from './dialogs/edit-tpo-listening-content-dialog/edit-tpo-listening-content-dialog.component';
import { EditTpoListeningQuestionDialogComponent } from './dialogs/edit-tpo-listening-question-dialog/edit-tpo-listening-question-dialog.component';
import { EditIndependentWritingQuestionDialogComponent } from './dialogs/edit-independent-writing-question-dialog/edit-independent-writing-question-dialog.component';
import { EditIntegratedWritingQuestionDialogComponent } from './dialogs/edit-integrated-writing-question-dialog/edit-integrated-writing-question-dialog.component';
import { TpoSpeakingItemComponent } from './edit-question-list/tpo-speaking-item/tpo-speaking-item.component';
import { EditTpoSpeakingQuestionDialogComponent } from './dialogs/edit-tpo-speaking-question-dialog/edit-tpo-speaking-question-dialog.component';
import { ConfirmDeleteQuestionDialogComponent } from './dialogs/confirm-delete-question-dialog/confirm-delete-question-dialog.component';
import { ConfirmDeleteGroupDialogComponent } from './dialogs/confirm-delete-group-dialog/confirm-delete-group-dialog.component';
import { AddTpoReadingGroupDialogComponent } from './dialogs/add-tpo-reading-group-dialog/add-tpo-reading-group-dialog.component';
import { AddTpoReadingQuestionDialogComponent } from './dialogs/add-tpo-reading-question-dialog/add-tpo-reading-question-dialog.component';
import { AddTpoListeningGroupDialogComponent } from './dialogs/add-tpo-listening-group-dialog/add-tpo-listening-group-dialog.component';
import { AddTpoListeningQuestionDialogComponent } from './dialogs/add-tpo-listening-question-dialog/add-tpo-listening-question-dialog.component';
import { AddIntegratedQuestionDialogComponent } from './dialogs/add-integrated-question-dialog/add-integrated-question-dialog.component';
import { AddIndependentQuestionDialogComponent } from './dialogs/add-independent-question-dialog/add-independent-question-dialog.component';
import { AddTpoSpeakingQuestionDialogComponent } from './dialogs/add-tpo-speaking-question-dialog/add-tpo-speaking-question-dialog.component';

@NgModule({
	imports: [
	    SharedModule,
		EditAssignmentRoutingModule,
		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot()
	],
	declarations: [
		EditIndependentWritingQuestionComponent,
		EditIntegratedWritingQuestionComponent,
		EditAssignmentComponent,
		EditQuestionComponent,
		EditQuestionListComponent,
		EditTporeadingQuestionComponent,
		EditVocabularyQuestionComponent,
		EditVocabularyItemComponent,
		EditTpospeakingQuestionComponent,
		EditTpolisteningQuestionComponent,
		TpoReadingItemComponent,
		IndependentWritingItemComponent,
		IntegratedWritingItemComponent,
		EditTpoReadingPassageDialogComponent,
		EditTpoReadingQuestionDialogComponent,
		TpoListeningItemComponent,
		EditTpoListeningContentDialogComponent,
		EditTpoListeningQuestionDialogComponent,
		EditIndependentWritingQuestionDialogComponent,
		EditIntegratedWritingQuestionDialogComponent,
		TpoSpeakingItemComponent,
		EditTpoSpeakingQuestionDialogComponent,
		ConfirmDeleteQuestionDialogComponent,
		ConfirmDeleteGroupDialogComponent,
		AddTpoReadingGroupDialogComponent,
		AddTpoReadingQuestionDialogComponent,
		AddTpoListeningGroupDialogComponent,
		AddTpoListeningQuestionDialogComponent,
		AddIntegratedQuestionDialogComponent,
		AddIndependentQuestionDialogComponent,
		AddTpoSpeakingQuestionDialogComponent
	],
	entryComponents:[
		EditTpoReadingPassageDialogComponent,
		EditTpoReadingQuestionDialogComponent,
		EditTpoListeningContentDialogComponent,
		EditTpoListeningQuestionDialogComponent,
		EditIndependentWritingQuestionDialogComponent,
		EditIntegratedWritingQuestionDialogComponent,
		EditTpoSpeakingQuestionDialogComponent,
		ConfirmDeleteQuestionDialogComponent,
		ConfirmDeleteGroupDialogComponent,
		AddTpoReadingGroupDialogComponent,
		AddTpoReadingQuestionDialogComponent,
		AddTpoListeningGroupDialogComponent,
		AddTpoListeningQuestionDialogComponent,
		AddIntegratedQuestionDialogComponent,
		AddIndependentQuestionDialogComponent,
		AddTpoSpeakingQuestionDialogComponent
	]
})
export class EditAssignmentModule { }
