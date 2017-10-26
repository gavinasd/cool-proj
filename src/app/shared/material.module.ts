import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdExpansionModule, MdGridListModule,
	MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule, MdProgressBarModule, MdRadioModule, MdSelectModule,
	MdSidenavModule,
	MdSlideToggleModule, MdSnackBarModule,
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
		MdRadioModule,
		MdGridListModule,
		MdSnackBarModule,
		MdProgressBarModule,
		MdChipsModule
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
		MdRadioModule,
		MdGridListModule,
		MdSnackBarModule,
		MdProgressBarModule,
		MdChipsModule
	],
	declarations: []
})
export class MaterialModule { }
