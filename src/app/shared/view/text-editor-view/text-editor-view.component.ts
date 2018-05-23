import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {exportNgVar} from "@angular/platform-browser/src/dom/util";
import {environment} from "../../../../environments/environment";

@Component({
	selector: 'app-text-editor-view',
	templateUrl: './text-editor-view.component.html',
	styleUrls: ['./text-editor-view.component.scss']
})
export class TextEditorViewComponent implements OnInit {

	@Input() passage: String;

	options = {
		readOnly: true,
		theme: "snow",
		placeholder: "",
		modules: {
			toolbar: false
		}
	};

	constructor() {
	}

	ngOnInit() {
	}

}
