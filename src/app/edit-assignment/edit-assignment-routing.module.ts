import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {EditAssignmentComponent} from "../edit-assignment/edit-assignment.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EditAssignmentComponent}
	])],
	exports: [RouterModule]
})
export class EditAssignmentRoutingModule {}