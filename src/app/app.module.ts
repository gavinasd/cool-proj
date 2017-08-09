import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Route} from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { LoginComponent } from './view/login_register/login/login.component';
import { RegisterComponent } from './view/login_register/register/register.component';

import { HttpService } from './services/http.service';
import { LoginRegisterComponent } from './view/login_register/login-register/login-register.component';
import { IndexComponent } from './view/course/index/index.component';
import { CourseListComponent } from './view/course/course-list/course-list.component';
import { CourseListItemComponent } from './view/course/course-list-item/course-list-item.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { NavbarComponent } from './shared/view/navbar/navbar.component';
import { ResListComponent } from './view/course/res-list/res-list.component';
import {UserService} from "./services/user.service";
import {ClassService} from "./services/class.service";
import {AssignmentService} from "./services/assignment.service";
import {AssignmentModule} from "./assignment/assignment.module";
import { MainComponent } from './view/main/main.component';
import {ToastyModule} from "ng2-toasty";
import {ToastService} from "./services/toast.service";
import {AssignmentListComponent} from "./class-detail/assignment-list/assignment-list.component";
import { SearchClassComponent } from './search-class/search-class.component';
import {SearchClassModule} from "./search-class/search-class.module";
import {ClassDetailModule} from "./class-detail/class-detail.module";
import {SharedModule} from "./shared/shared.module";
import {QuestionGroupListComponent} from "./assignment/question-group-list/question-group-list.component";
import {EditQuestionComponent} from "./assignment/edit-assignment/edit-question/edit-question.component";
import {EditAssignmentComponent} from "./assignment/edit-assignment/edit-assignment.component";
import {StoreModule} from "@ngrx/store";
import {reducers} from './redux/index.reducer';
import {EffectsModule} from "@ngrx/effects";
import {AssignmentEffect} from "./redux/assignment/assignment.effects";
import {MaterialModule} from "./view/common/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
	MdButtonModule,
	MdCardModule,
	MdCheckboxModule, MdDialogModule, MdExpansionModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule,
	MdSelectModule,
	MdSidenavModule,
	MdSlideToggleModule,
	MdTabsModule, MdToolbarModule
} from "@angular/material";

const routes:Routes = [
  	{path:'',redirectTo:'index',pathMatch:'full'},
  	{path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
  	{path:'index',component:IndexComponent},
	{path:'class/:classId',component:ClassDetailComponent},
    {path:'question/list/:classId/:assignmentId/:studentId/:mode',
	    component:QuestionGroupListComponent},
	{path:'question/edit/:assignmentId/:questionGroupId/:type',component:EditQuestionComponent},
	{path:'edit_assignment',component:EditAssignmentComponent},
    {path:'assignmentList/:classId',component:AssignmentListComponent},
    {path:'class/search/:className',component:SearchClassComponent},
];

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      LoginRegisterComponent,
      IndexComponent,
      CourseListComponent,
      CourseListItemComponent,
      ResListComponent,
      MainComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterialModule,
      FlexLayoutModule,
	  BrowserAnimationsModule,
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
      NgUploaderModule,
      AssignmentModule,
      SearchClassModule,
	  ClassDetailModule,
      SharedModule,
      ToastyModule.forRoot(),
      RouterModule.forRoot(routes),
	  StoreModule.forRoot(reducers),
	  EffectsModule.forRoot([AssignmentEffect])
  ],
  providers: [
      HttpService,
      UserService,
      ClassService,
      AssignmentService,
	  ToastService,
  ],
  exports:[
      NavbarComponent,
      CourseListItemComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
