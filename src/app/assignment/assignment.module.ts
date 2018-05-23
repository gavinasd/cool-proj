import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {TpoReadingQuestionDetailComponent} from "./question-group-list/question-group-detail/tpo-reading-question-detail/tpo-reading-question-detail.component";
import {QuestionGroupDetailComponent} from "./question-group-list/question-group-detail/question-group-detail.component";
import {VocabularyQuestionDetailComponent} from "./question-group-list/question-group-detail/vocabulary-question-detail/vocabulary-question-detail.component";
import {QuestionHeaderComponent} from "./question-group-list/question-header/question-header.component";
import {QuestionGroupListComponent} from "./question-group-list/question-group-list.component";
import {QuestionPagerComponent} from './question-group-list/question-group-detail/common/question-pager/question-pager.component';
import {QuestionTimerComponent} from './question-group-list/question-header/question-timer/question-timer.component';
import {IndependentWritingQuestionDetailComponent} from './question-group-list/question-group-detail/independent-writing-question-detail/independent-writing-question-detail.component';
import {ScoreMarkerComponent} from './question-group-list/question-group-detail/common/question-marker/score-marker/score-marker.component';
import {CommonMarkerComponent} from './question-group-list/question-group-detail/common/question-marker/common-marker/common-marker.component';
import {IntegratedWritingQuestionDetailComponent} from './question-group-list/question-group-detail/integrated-writing-question-detail/integrated-writing-question-detail.component';
import {TpoListeningQuestionDetailComponent} from './question-group-list/question-group-detail/tpo-listening-question-detail/tpo-listening-question-detail.component';
import {DndModule} from "ng2-dnd";
import {QuestionIndexComponent} from './question-group-list/question-group-detail/common/question-index/question-index.component';
import {TpoSpeakingQuestionDetailComponent} from './question-group-list/question-group-detail/tpo-speaking-question-detail/tpo-speaking-question-detail.component';
import {AssignmentRoutingModule} from "./assignment-routing.module";
import {Convert09ToAZPipe} from "../shared/pipes/convert09-to-az.pipe";
import {QuestionDetailHostDirective} from "./question-group-list/question-detail-host";

@NgModule({
	imports: [
		SharedModule,
		AssignmentRoutingModule,
		DndModule.forRoot(),
	],
	declarations: [
		TpoReadingQuestionDetailComponent,
		VocabularyQuestionDetailComponent,
		QuestionGroupDetailComponent,
		TpoSpeakingQuestionDetailComponent,
		IndependentWritingQuestionDetailComponent,
		IntegratedWritingQuestionDetailComponent,
		TpoListeningQuestionDetailComponent,
		ScoreMarkerComponent,
		CommonMarkerComponent,
		QuestionHeaderComponent,
		QuestionIndexComponent,
		QuestionPagerComponent,
		QuestionGroupListComponent,
		QuestionTimerComponent,
		QuestionDetailHostDirective
	],
	entryComponents: [],
	providers: [Convert09ToAZPipe],
	exports: []
})
export class AssignmentModule {
}
