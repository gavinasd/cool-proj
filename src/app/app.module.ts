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
import { ClassDetailComponent } from './view/course/class-detail/class-detail.component';
import { NavbarComponent } from './view/common/navbar/navbar.component';
import { FooterComponent } from './view/common/footer/footer.component';
import { ResListComponent } from './view/course/res-list/res-list.component';
import { QuestionListComponent } from './assignment/question-list/question-list.component';
import {UserService} from "./services/user.service";
import {ClassService} from "./services/class.service";
import {AssignmentService} from "./services/assignment.service";
import {AssignmentModule} from "./assignment/assignment.module";
import {EditQuestionComponent} from "./edit-assignment/edit-question/edit-question.component";
import { MainComponent } from './view/main/main.component';
import { MainNavComponent } from './view/common/main-nav/main-nav.component';
import {ToastyModule} from "ng2-toasty";
import {ToastService} from "./services/toast.service";
import {AssignmentListComponent} from "./assignment/assignment-list/assignment-list.component";
import {EditAssignmentModule} from "./edit-assignment/edit-assignment.module";
import {EditAssignmentComponent} from "./edit-assignment/edit-assignment/edit-assignment.component";
import { SearchClassComponent } from './search-class/search-class.component';
import {SearchClassModule} from "./search-class/search-class.module";
import {AssignmentGradeDetailComponent} from "./assignment/assignment-grade-detail/assignment-grade-detail.component";

const routes:Routes = [
  	{path:'',redirectTo:'index',pathMatch:'full'},
  	{path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
  	{path:'index',component:IndexComponent},
	{path:'class/:classId',component:ClassDetailComponent},
    {path:'question/class/:classId/assignment/:assignmentId',component:QuestionListComponent},
	{path:'edit_assignment',component:EditAssignmentComponent},
	{path:'question/edit/:assignmentId',component:EditQuestionComponent},
    {path:'assignmentList/:classId',component:AssignmentListComponent},
    {path:'class/search/:className',component:SearchClassComponent},
    {path:'assignment/grade/detail/:assignmentId',component:AssignmentGradeDetailComponent}
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
      ClassDetailComponent,
      NavbarComponent,
      FooterComponent,
      ResListComponent,
      MainComponent,
      MainNavComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      NgUploaderModule,
      AssignmentModule,
      EditAssignmentModule,
      SearchClassModule,
      ToastyModule.forRoot(),
      RouterModule.forRoot(routes)
  ],
  providers: [
      HttpService,
      UserService,
      ClassService,
      AssignmentService,
	    ToastService
  ],
  exports:[
      NavbarComponent,
      CourseListItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
