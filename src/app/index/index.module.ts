import { NgModule } from '@angular/core';
import {CourseListComponent} from "./course/course-list/course-list.component";
import {CourseListItemComponent} from "./course/course-list-item/course-list-item.component";
import {IndexComponent} from "./course/index/index.component";
import {LoginComponent} from "./account/login/login.component";
import {RegisterComponent} from "./account/register/register.component";
import {IndexRoutingModule} from "./index-routing.module";
import {SharedModule} from "../shared/shared.module";
import {HttpService} from "../core/services/http.service";
import {UserService} from "../core/services/user.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import {NbMenuService, NbThemeModule} from "@nebular/theme";
import {NbMenuInternalService} from "@nebular/theme/components/menu/menu.service";

@NgModule({
	imports: [
		IndexRoutingModule,
		SharedModule,
		NbThemeModule.forRoot({ name: 'default' }),
	],
	declarations: [
		CourseListComponent,
		CourseListItemComponent,
		IndexComponent,
		LoginComponent,
		RegisterComponent,
		PageNotFoundComponent,
		ResetPasswordComponent
	],
	providers:[
		HttpService,
		UserService,
		NbMenuService,
		NbMenuInternalService
	]
})
export class IndexModule { }
