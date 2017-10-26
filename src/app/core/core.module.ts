import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssignmentService} from "./services/assignment.service";
import {ClassService} from "./services/class.service";
import {HttpService} from "./services/http.service";
import {ToastService} from "./services/toast.service";
import {UserService} from "./services/user.service";
import {HttpModule} from "@angular/http";

@NgModule({
	imports: [
	    CommonModule,
		HttpModule,
	],
	declarations: [],
	providers:[
		AssignmentService,
		ClassService,
		HttpService,
		ToastService,
		UserService
	]
})
export class CoreModule {
	constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
