import {RouterModule} from "@angular/router";
import {IndexComponent} from "./course/index/index.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./account/login/login.component";
import {RegisterComponent} from "./account/register/register.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ResetPasswordComponent} from "./account/reset-password/reset-password.component";
@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'index', component: IndexComponent },
		{ path: 'login', component: LoginComponent },
		{ path: 'register', component: RegisterComponent},
		{ path: 'reset-password', component: ResetPasswordComponent},
		{ path: '**', component: PageNotFoundComponent}
	])],
	exports: [RouterModule]
})
export class IndexRoutingModule {}