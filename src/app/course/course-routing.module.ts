import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseComponent} from "./course.component";
import {AssignmentListComponent} from "./assignment-list/assignment-list.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: ':classId',
			component: CourseComponent,
			children: [
				{
					path: 'd',
					component: CourseDetailComponent
				},
				{
					path: 'a',
					component: AssignmentListComponent
				}
			]
		}
	])],
	exports: [RouterModule]
})
export class CourseRoutingModule {
}