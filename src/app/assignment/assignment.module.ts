import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {AssignmentGradeDetailComponent} from "./assignment-grade-detail/assignment-grade-detail.component";
import { QuestionPagerComponent } from './question-group-list/question-group-detail/question-pager/question-pager.component';
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";

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
		AssignmentGradeDetailComponent,
		QuestionPagerComponent
	],
	providers:[
		AssignmentService,
		HttpService
	],
	exports:[
		QuestionGroupListComponent
	]
})
export class AssignmentModule { }
