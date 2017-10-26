import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClassDetailComponent} from "./class-detail.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: ':classId', component: ClassDetailComponent }
	])],
	exports: [RouterModule]
})
export class ClassDetailRoutingModule {}