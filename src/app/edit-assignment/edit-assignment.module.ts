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
	]
})
export class EditAssignmentModule { }
