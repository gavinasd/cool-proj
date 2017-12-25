import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OddEvenPipe} from "./pipes/odd-even.pipe";
import {FooterComponent} from "./view/footer/footer.component";
import {NavbarComponent} from "./view/navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import { Convert09ToAZPipe } from './pipes/convert09-to-az.pipe';
import { SimpleAudioPlayerComponent } from './view/audio/simple-audio-player/simple-audio-player.component';
import { HalfPipe } from './pipes/half.pipe';
import { PronunciationOfWordPipe } from './pipes/pronunciation-of-word.pipe';
import {MaterialModule} from "./view/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { CreateClassDialogComponent } from './view/dialogs/create-class-dialog/create-class-dialog.component';
import { AddAssignmentDialogComponent } from './view/dialogs/add-assignment-dialog/add-assignment-dialog.component';
import { CreateAssignmentDialogComponent } from './view/dialogs/create-assignment-dialog/create-assignment-dialog.component';
import { AddQuestionDialogComponent } from './view/dialogs/add-question-dialog/add-question-dialog.component';
import { SubmitConfirmDialogComponent } from './view/dialogs/submit-confirm-dialog/submit-confirm-dialog.component';
import { FollowClassDialogComponent } from './view/dialogs/follow-class-dialog/follow-class-dialog.component';
import {ClassDetailNavComponent} from "./view/navbar/class-detail-nav/class-detail-nav.component";
import { AudioPlayerComponent } from './view/audio/audio-player/audio-player.component';
import { TpoReviewPlayerComponent } from './view/audio/tpo-review-player/tpo-review-player.component';
import { BackgroundAudioPlayerComponent } from './view/audio/background-audio-player/background-audio-player.component';
import { TpoSpeakingRecorderComponent } from './view/recorder/tpo-speaking-recorder/tpo-speaking-recorder.component';
import { CountDownTimerComponent } from './view/count-down-timer/count-down-timer.component';
import {RouterModule} from "@angular/router";
import {VocabularyListComponent} from "./view/vocabulary/vocabulary-list/vocabulary-list.component";
import {VocabularyItemComponent} from "./view/vocabulary/vocabulary-item/vocabulary-item.component";
import { ToastComponent } from './view/toast/toast.component';
import {HttpClientModule} from "@angular/common/http";
import { CustomToastComponent } from './view/toast/custom-toast/custom-toast.component';
import { TpoTableForViewComponent } from './views/tpo-table-for-view/tpo-table-for-view.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
	    HttpClientModule,
	    FormsModule,
	    MaterialModule,
    ],
    declarations: [
    	OddEvenPipe, Convert09ToAZPipe, FooterComponent,
	    NavbarComponent, ClassDetailNavComponent, Convert09ToAZPipe, SimpleAudioPlayerComponent,
	    HalfPipe, PronunciationOfWordPipe, CreateClassDialogComponent,
	    AddAssignmentDialogComponent, CreateAssignmentDialogComponent,
	    AddQuestionDialogComponent, SubmitConfirmDialogComponent, FollowClassDialogComponent, AudioPlayerComponent,
	    TpoReviewPlayerComponent, BackgroundAudioPlayerComponent, TpoSpeakingRecorderComponent,
	    CountDownTimerComponent,VocabularyListComponent,VocabularyItemComponent, ToastComponent, CustomToastComponent, TpoTableForViewComponent
    ],
	entryComponents:[CreateClassDialogComponent,AddAssignmentDialogComponent,CreateAssignmentDialogComponent,
		AddQuestionDialogComponent, SubmitConfirmDialogComponent, FollowClassDialogComponent, ToastComponent],
	exports:[
		OddEvenPipe, Convert09ToAZPipe, HalfPipe,
		PronunciationOfWordPipe, FooterComponent,
		NavbarComponent,ClassDetailNavComponent,
		SimpleAudioPlayerComponent, AudioPlayerComponent,
		TpoReviewPlayerComponent, BackgroundAudioPlayerComponent,
		TpoSpeakingRecorderComponent, CountDownTimerComponent,
		VocabularyListComponent,
		MaterialModule,
		FlexLayoutModule,
		FormsModule,
		HttpClientModule,
		CommonModule,
		RouterModule,
		TpoTableForViewComponent
	]
})
export class SharedModule { }
