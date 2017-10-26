import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassDetailComponent} from "./class-detail.component";
import {GradeInfoDetailComponent} from "./assignment-list/grade-info-detail/grade-info-detail.component";
import {GradeInfoItemDetailComponent} from "./assignment-list/grade-info-item-detail/grade-info-item-detail.component";
import {AssignmentListComponent} from "./assignment-list/assignment-list.component";
import {ClassUserListComponent} from "./class-user-list/class-user-list.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../shared/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ClassDetailRoutingModule} from "./class-detail-routing.module";

@NgModule({
	imports: [
		SharedModule,
		ClassDetailRoutingModule
	],
	declarations: [
		ClassDetailComponent,
		GradeInfoDetailComponent,
		GradeInfoItemDetailComponent,
		AssignmentListComponent,
		ClassUserListComponent
	]
})
export class ClassDetailModule { }
