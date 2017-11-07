import {
	ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
	ViewContainerRef
} from "@angular/core";
import {Question} from "../../models/Questions/Question";
import {Mode} from "../../models/assignments/Assignment";
import {AssignmentService} from "../../core/services/assignment.service";

@Directive({
	selector:'[question-detail-host]'
})
export class QuestionDetailHostDirective implements OnChanges{
	@Input() mode:Mode;
	@Input() assignmentType:string;
	@Input() groupContent:string;
	@Input() question:Question;
	@Input() lastAnswer:string;
	@Input() markingScore:number;
	@Input() shouldShowContent:boolean;
	@Input() questionIndex:number;
	@Input() questionListLength:number;
	@Input() contentIndex:number;
	@Input() OnChangeAnswer:Function;
	@Input() OnMarkScore:Function;
	private componentRef;

	constructor(private viewContainerRef:ViewContainerRef,
	            private componentFactoryResolver: ComponentFactoryResolver,
				private assignmentService: AssignmentService
	){}



	ngOnChanges(changes: SimpleChanges): void {
		if(!this.question){
			return;
		}
	}

	// createNewComponentRef(){
	// 	let component;
	// 	if(this.mode == Mode.HomeWork){
	// 		switch (this.question.questionType){
	// 			case this.assignmentService.getTPOReadingSingleChoice():
	// 				component = ReadingSingleChoiceHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTPOReadingInsertChoice():
	// 				component = ReadingInsertHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTPOReadingTopic():
	// 				component = ReadingTopicHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTpoListeningSingleChoice():
	// 				component = ListeningSingleChoiceHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTpoListeningMultipleChoice():
	// 				component = ListeningMultipleChoiceHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTpoListeningRepeatQuestion():
	// 				component = ListeningRepeatHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getIndependentWritingType():
	// 				component = IndependentWritingHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getIntegratedWritingType():
	// 				component = IntegratedWritingHomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ1Q2Type():
	// 				component = SpeakingQ1q2HomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ3Q4Type():
	// 				component = SpeakingQ3q4HomeworkComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ5Q6Type():
	// 				component = SpeakingQ5q6HomeworkComponent;
	// 				break;
	// 		}
	// 	}
	//
	// 	if(this.mode == Mode.Marking){
	// 		switch (this.question.questionType){
	// 			case this.assignmentService.getIndependentWritingType():
	// 				component = IndependentWritingMarkingComponent;
	// 				break;
	// 			case this.assignmentService.getIntegratedWritingType():
	// 				component = IntegratedWritingMarkingComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ1Q2Type():
	// 				component = SpeakingQ1q2MarkingComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ3Q4Type():
	// 				component = SpeakingQ3q4MarkingComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ5Q6Type():
	// 				component = SpeakingQ5q6MarkingComponent;
	// 				break;
	// 		}
	// 	}
	//
	// 	if(this.mode == Mode.Review){
	// 		switch (this.question.questionType){
	// 			case this.assignmentService.getTPOReadingSingleChoice():
	// 				component = ReadingSingleChoiceReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTPOReadingInsertChoice():
	// 				component = ReadingInsertReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTPOReadingTopic():
	// 				component = ReadingTopicReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTpoListeningSingleChoice():
	// 				component = ListeningSingleChoiceReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTpoListeningMultipleChoice():
	// 				component = ListeningMultipleChoiceReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTpoListeningRepeatQuestion():
	// 				component = ListeningRepeatReviewComponent;
	// 				break;
	// 			case this.assignmentService.getIndependentWritingType():
	// 				component = IndependentWritingReviewComponent;
	// 				break;
	// 			case this.assignmentService.getIntegratedWritingType():
	// 				component = IntegratedWritingReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ1Q2Type():
	// 				component = SpeakingQ1q2ReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ3Q4Type():
	// 				component = SpeakingQ3q4ReviewComponent;
	// 				break;
	// 			case this.assignmentService.getTpoSpeakingQ5Q6Type():
	// 				component = SpeakingQ5q6ReviewComponent;
	// 				break;
	// 		}
	// 	}
	//
	// 	if(this.question.questionType == this.assignmentService.getTPOReadingSingleChoice()){
	// 		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);  //解析一个component
	// 		this.viewContainerRef.clear();
	// 		this.componentRef = this.viewContainerRef.createComponent(componentFactory);
	// 	}
	// }
	//
	// initComponentData(){
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).mode = this.mode;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).groupContent = this.groupContent;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).question = this.question;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).lastAnswer = this.lastAnswer;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).markingScore = this.markingScore;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).shouldShowContent = this.shouldShowContent;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).questionIndex = this.questionIndex;
	// 	(<QuestionGroupDetailComponent>this.componentRef.instance).questionListLength = this.questionListLength;
	//
	// }

}