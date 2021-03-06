import { Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
		const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('/assets/avatars.svg');

		iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
	}
}
