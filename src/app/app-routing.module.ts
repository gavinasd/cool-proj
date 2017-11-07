import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

export const routes:Routes = [
	{path:'',redirectTo:'index',pathMatch:'full'},
	{path:'class',loadChildren:'app/class-detail/class-detail.module#ClassDetailModule'},
	{path:'question', loadChildren:'app/assignment/assignment.module#AssignmentModule'},
	{path:'edit', loadChildren:'app/edit-assignment/edit-assignment.module#EditAssignmentModule'},
	{path:'search',loadChildren:'app/search-class/search-class.module#SearchClassModule'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule]
})
export class AppRoutingModule {}