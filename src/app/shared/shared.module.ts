import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OddEvenPipe} from "./pipes/odd-even.pipe";
import {FooterComponent} from "./view/footer/footer.component";
import {MainNavComponent} from "./view/main-nav/main-nav.component";
import {NavbarComponent} from "./view/navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import { Convert09ToAZPipe } from './pipes/convert09-to-az.pipe';
import { SimpleAudioPlayerComponent } from './view/audio/simple-audio-player/simple-audio-player.component';

@NgModule({
    imports: [
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
	    SimpleAudioPlayerComponent
    ],
	exports:[
		OddEvenPipe,
		Convert09ToAZPipe,
		FooterComponent,
		MainNavComponent,
		NavbarComponent,
		SimpleAudioPlayerComponent
	]
})
export class SharedModule { }
