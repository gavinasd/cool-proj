var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdExpansionModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdRadioModule, MdSelectModule, MdSidenavModule, MdSlideToggleModule, MdTabsModule, MdToolbarModule } from "@angular/material";
var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
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
                MdRadioModule
            ],
            exports: [
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
                MdRadioModule
            ],
            declarations: []
        })
    ], MaterialModule);
    return MaterialModule;
}());
export { MaterialModule };
