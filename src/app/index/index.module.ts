import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "./course/course-list/course-list.component";
import {CourseListItemComponent} from "./course/course-list-item/course-list-item.component";
import {IndexComponent} from "./course/index/index.component";
import {LoginComponent} from "./login_register/login/login.component";
import {RegisterComponent} from "./login_register/register/register.component";
import {IndexRoutingModule} from "./index-routing.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {HttpService} from "../core/services/http.service";
import {UserService} from "../core/services/user.service";

@NgModule({
	imports: [
		IndexRoutingModule,
		SharedModule,
	],
	declarations: [
		CourseListComponent,
		CourseListItemComponent,
		IndexComponent,
		LoginComponent,
		RegisterComponent
	],
	providers:[
		HttpService,
		UserService
	]
})
export class IndexModule { }
