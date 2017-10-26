import {NgModule} from '@angular/core';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import {SearchClassComponent} from "./search-class.component";
import {SharedModule} from "../shared/shared.module";
import {SearchClassRoutingModule} from "./search-class-routing.module";

@NgModule({
    imports: [
	    SharedModule,
	    SearchClassRoutingModule
    ],
    declarations: [
        SearchResultItemComponent,
        SearchClassComponent
    ],
    exports:[],
})
export class SearchClassModule { }
