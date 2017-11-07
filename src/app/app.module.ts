import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {reducers} from './redux/index.reducer';
import {EffectsModule} from "@ngrx/effects";
import {AssignmentEffect} from "./redux/assignment/assignment.effects";
import {IndexModule} from "./index/index.module";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
	  CoreModule,
	  IndexModule,
	  SharedModule,
	  StoreModule.forRoot(reducers),
	  EffectsModule.forRoot([AssignmentEffect])
  ],
  providers: [],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
