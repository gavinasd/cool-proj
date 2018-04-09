import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {QuestionGroupListComponent} from "./question-group-list/question-group-list.component";
import {CanDeactivateGuard} from "../core/services/route-guard.service";
@NgModule({
	imports: [RouterModule.forChild([
		{   path: 'list/:courseId/:assignmentId/:studentId/:mode',
			canDeactivate:[CanDeactivateGuard],
			component: QuestionGroupListComponent },
	])],
	exports: [RouterModule]
})
export class AssignmentRoutingModule {}