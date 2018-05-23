import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	NbCardModule, NbContextMenuModule, NbLayoutModule, NbMenuModule, NbRouteTabsetModule,
	NbTabsetModule
} from "@nebular/theme";
import {NbMenuComponent} from "@nebular/theme/components/menu/menu.component";

@NgModule({
	imports: [
		CommonModule,
		NbLayoutModule,
		NbTabsetModule,
		NbCardModule,
		NbContextMenuModule,
		NbMenuModule,
		NbRouteTabsetModule
	],
	declarations: [],
	exports: [
		NbLayoutModule,
		NbTabsetModule,
		NbCardModule,
		NbContextMenuModule,
		NbMenuModule,
		NbRouteTabsetModule,
	]
})
export class NebularModule {
}
