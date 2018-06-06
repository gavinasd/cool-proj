import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseComponent} from "./course.component";
import {AssignmentListComponent} from "./assignment-list/assignment-list.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {ResourceListComponent} from './resource-list/resource-list.component';

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
				},
				{
					path: 'r',
					component: ResourceListComponent
				}
			]
		}
	])],
	exports: [RouterModule]
})
export class CourseRoutingModule {
}