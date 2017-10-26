import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SearchClassComponent} from "./search-class.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: ':className', component: SearchClassComponent },
	])],
	exports: [RouterModule]
})
export class SearchClassRoutingModule {}