var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { SearchClassComponent } from "./search-class.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
var SearchClassModule = (function () {
    function SearchClassModule() {
    }
    SearchClassModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                FormsModule,
            ],
            declarations: [
                SearchResultItemComponent,
                SearchClassComponent
            ],
            exports: [
                SearchResultItemComponent,
                SearchClassComponent
            ]
        })
    ], SearchClassModule);
    return SearchClassModule;
}());
export { SearchClassModule };
