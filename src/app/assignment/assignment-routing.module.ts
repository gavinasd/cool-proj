import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {QuestionGroupListComponent} from "./question-group-list/question-group-list.component";
import {EditQuestionComponent} from "../edit-assignment/edit-question/edit-question.component";
import {EditAssignmentComponent} from "../edit-assignment/edit-assignment.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'list/:classId/:assignmentId/:studentId/:mode', component: QuestionGroupListComponent },
	])],
	exports: [RouterModule]
})
export class AssignmentRoutingModule {}