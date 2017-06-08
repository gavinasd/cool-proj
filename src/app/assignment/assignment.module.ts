import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionListComponent} from "./question-list/question-list.component";
import {QuestionDetailComponent} from "./question-detail/question-detail.component";
import {AssignmentListComponent} from "./assignment-list/assignment-list.component";
import {TpoReadingQuestionDetailComponent} from "./tpo-reading-question-detail/tpo-reading-question-detail.component";
import {AssignmentService} from "../services/assignment.service";
import {HttpService} from "../services/http.service";
import {FormsModule} from "@angular/forms";
import { EditAssignmentComponent } from '../edit-assignment/edit-assignment/edit-assignment.component';
import { EditQuestionComponent } from '../edit-assignment/edit-question/edit-question.component';
import { EditTporeadingQuestionComponent } from '../edit-assignment/edit-tporeading-question/edit-tporeading-question.component';
import { GradeInfoDetailComponent } from './grade-info-detail/grade-info-detail.component';
import { GradeInfoItemDetailComponent } from './grade-info-item-detail/grade-info-item-detail.component';
import {RouterModule} from "@angular/router";
import { EditQuestionListComponent } from '../edit-assignment/edit-question-list/edit-question-list.component';
import { QuestionHeaderComponent } from './question-header/question-header.component';
import { AssignmentGradeDetailComponent } from './assignment-grade-detail/assignment-grade-detail.component';
import { AssignmentNavComponent } from './assignment-nav/assignment-nav.component';
import { ClassUserListComponent } from './class-user-list/class-user-list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	declarations: [
		QuestionListComponent,
		QuestionDetailComponent,
		AssignmentListComponent,
		TpoReadingQuestionDetailComponent,
		GradeInfoDetailComponent,
		GradeInfoItemDetailComponent,
		QuestionHeaderComponent,
		AssignmentGradeDetailComponent,
		AssignmentNavComponent,
		ClassUserListComponent,
	],
	providers:[
		AssignmentService,
		HttpService
	],
	exports:[
		AssignmentListComponent,
		QuestionListComponent,
		AssignmentNavComponent,
		ClassUserListComponent
	]
})
export class AssignmentModule { }
