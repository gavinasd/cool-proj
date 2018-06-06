import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AssignmentService} from "./services/assignment.service";
import {ClassService} from "./services/class.service";
import {HttpService} from "./services/http.service";
import {ToastService} from "./services/toast.service";
import {UserService} from "./services/user.service";
import {SharedModule} from "../shared/shared.module";
import {CanDeactivateGuard} from "./services/route-guard.service";
import {BulletinService} from "./services/bulletin.service";
import {ResourceService} from './services/resource.service';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [],
	providers:[
		AssignmentService,
		ClassService,
		HttpService,
		ToastService,
		UserService,
		BulletinService,
		ResourceService,
		CanDeactivateGuard
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
