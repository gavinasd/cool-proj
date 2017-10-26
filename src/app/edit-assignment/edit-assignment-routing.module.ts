import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {EditQuestionComponent} from "../edit-assignment/edit-question/edit-question.component";
import {EditAssignmentComponent} from "../edit-assignment/edit-assignment.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: ':assignmentId/:questionGroupId/:type', component: EditQuestionComponent},
		{ path: '', component: EditAssignmentComponent}
	])],
	exports: [RouterModule]
})
export class EditAssignmentRoutingModule {}