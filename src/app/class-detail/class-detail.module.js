var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassDetailComponent } from "./class-detail.component";
import { ClassDetailNavComponent } from './class-detail-nav/class-detail-nav.component';
import { GradeInfoDetailComponent } from "./assignment-list/grade-info-detail/grade-info-detail.component";
import { GradeInfoItemDetailComponent } from "./assignment-list/grade-info-item-detail/grade-info-item-detail.component";
import { AssignmentListComponent } from "./assignment-list/assignment-list.component";
import { ClassUserListComponent } from "./class-user-list/class-user-list.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../view/common/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
var ClassDetailModule = (function () {
    function ClassDetailModule() {
    }
    ClassDetailModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SharedModule,
                RouterModule,
                MaterialModule,
                FlexLayoutModule
            ],
            declarations: [
                ClassDetailComponent,
                ClassDetailNavComponent,
                GradeInfoDetailComponent,
                GradeInfoItemDetailComponent,
                AssignmentListComponent,
                ClassUserListComponent
            ]
        })
    ], ClassDetailModule);
    return ClassDetailModule;
}());
export { ClassDetailModule };
