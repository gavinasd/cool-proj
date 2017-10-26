import {RouterModule} from "@angular/router";
import {IndexComponent} from "./course/index/index.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login_register/login/login.component";
import {RegisterComponent} from "./login_register/register/register.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'index', component: IndexComponent },
		{ path: 'login', component: LoginComponent },
		{ path: 'register', component: RegisterComponent}
	])],
	exports: [RouterModule]
})
export class IndexRoutingModule {}