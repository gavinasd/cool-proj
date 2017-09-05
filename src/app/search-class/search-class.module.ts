import {NgModule, ApplicationModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import {SearchClassComponent} from "./search-class.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../view/common/material.module";
import {SharedModule} from "../shared/shared.module";
import {FollowClassDialogComponent} from "../shared/view/dialogs/follow-class-dialog/follow-class-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
	    MaterialModule,
	    FlexLayoutModule,
	    SharedModule
    ],
    declarations: [
        SearchResultItemComponent,
        SearchClassComponent
    ],
    exports:[
        SearchResultItemComponent,
        SearchClassComponent
    ],
	entryComponents:[
		FollowClassDialogComponent
	]
})
export class SearchClassModule { }
