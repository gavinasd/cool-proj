import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdExpansionModule, MdIconModule, MdInputModule,
	MdListModule,
	MdMenuModule, MdRadioModule, MdSelectModule,
	MdSidenavModule,
	MdSlideToggleModule,
	MdTabsModule,
	MdToolbarModule
} from "@angular/material";

@NgModule({
	imports: [
	    CommonModule,
		MdToolbarModule,
		MdSidenavModule,
		MdTabsModule,
		MdListModule,
		MdIconModule,
		MdSlideToggleModule,
		MdCardModule,
		MdButtonModule,
		MdMenuModule,
		MdDialogModule,
		MdSelectModule,
		MdInputModule,
		MdCheckboxModule,
		MdExpansionModule,
		MdRadioModule
	],
	exports: [
		MdToolbarModule,
		MdSidenavModule,
		MdTabsModule,
		MdListModule,
		MdIconModule,
		MdSlideToggleModule,
		MdCardModule,
		MdButtonModule,
		MdMenuModule,
		MdDialogModule,
		MdSelectModule,
		MdInputModule,
		MdCheckboxModule,
		MdExpansionModule,
		MdRadioModule
	],
	declarations: []
})
export class MaterialModule { }
