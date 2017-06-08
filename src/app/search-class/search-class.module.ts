import {NgModule, ApplicationModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import {SearchClassComponent} from "./search-class.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    declarations: [
        SearchResultItemComponent,
        SearchClassComponent
    ],
    exports:[
        SearchResultItemComponent,
        SearchClassComponent
    ]
})
export class SearchClassModule { }
