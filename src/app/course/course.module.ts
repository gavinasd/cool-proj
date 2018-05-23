import {NgModule} from '@angular/core';
import {GradeInfoDetailComponent} from "./assignment-list/grade-info-detail/grade-info-detail.component";
import {GradeInfoItemDetailComponent} from "./assignment-list/grade-info-item-detail/grade-info-item-detail.component";
import {AssignmentListComponent} from "./assignment-list/assignment-list.component";
import {ClassUserListComponent} from "./class-user-list/class-user-list.component";
import {SharedModule} from "../shared/shared.module";
import { BulletinMessageBoardComponent } from './bulletin-message-board/bulletin-message-board.component';
import {CourseComponent} from "./course.component";
import {CourseRoutingModule} from "./course-routing.module";
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
	imports: [
		SharedModule,
		CourseRoutingModule
	],
	declarations: [
		CourseComponent,
		GradeInfoDetailComponent,
		GradeInfoItemDetailComponent,
		AssignmentListComponent,
		ClassUserListComponent,
		BulletinMessageBoardComponent,
		CourseDetailComponent
	]
})
export class CourseModule {
}
