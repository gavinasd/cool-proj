var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddEvenPipe } from "./pipes/odd-even.pipe";
import { FooterComponent } from "./view/footer/footer.component";
import { MainNavComponent } from "./view/main-nav/main-nav.component";
import { NavbarComponent } from "./view/navbar/navbar.component";
import { FormsModule } from "@angular/forms";
import { Convert09ToAZPipe } from './pipes/convert09-to-az.pipe';
import { SimpleAudioPlayerComponent } from './view/audio/simple-audio-player/simple-audio-player.component';
import { HalfPipe } from './pipes/half.pipe';
import { PronunciationOfWordPipe } from './pipes/pronunciation-of-word.pipe';
import { MaterialModule } from "../view/common/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CreateClassDialogComponent } from './view/dialogs/create-class-dialog/create-class-dialog.component';
import { AddAssignmentDialogComponent } from './view/dialogs/add-assignment-dialog/add-assignment-dialog.component';
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                CommonModule,
                FormsModule
            ],
            declarations: [
                OddEvenPipe,
                Convert09ToAZPipe,
                FooterComponent,
                MainNavComponent,
                NavbarComponent,
                Convert09ToAZPipe,
                SimpleAudioPlayerComponent,
                HalfPipe,
                PronunciationOfWordPipe,
                CreateClassDialogComponent,
                AddAssignmentDialogComponent
            ],
            entryComponents: [CreateClassDialogComponent],
            exports: [
                OddEvenPipe,
                Convert09ToAZPipe,
                HalfPipe,
                PronunciationOfWordPipe,
                FooterComponent,
                MainNavComponent,
                NavbarComponent,
                SimpleAudioPlayerComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
