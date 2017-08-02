import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {AssignmentService} from "../../services/assignment.service";
import {Observable} from "rxjs/Observable";
import * as AssignmentAction from './assignment.actions';
import {Action, Store} from "@ngrx/store";
import * as fromApplication from "../index.reducer";


@Injectable()
export class AssignmentEffect{
	constructor(private action$:Actions, private store$:Store<fromApplication.ApplicationState>, private assignmentService: AssignmentService){}

	@Effect()
	fetch:Observable<Action> = this.action$
		.ofType(AssignmentAction.FETCH)
		.map(toPayload)
		.switchMap((data)=>{
			let assignmentId = data.assignmentId;

			return this.assignmentService.getAssignment(assignmentId);
		})
		.map((assignment) => new AssignmentAction.FetchAssignmentSuccessAction(assignment))
		.catch((err) => Observable.of(new AssignmentAction.FetchAssignmentFailureAction(err)));

	@Effect()
	fetchInfo:Observable<Action> = this.action$
		.ofType(AssignmentAction.FETCH_INFO)
		.map(toPayload)
		.switchMap(data => {
			let assignmentId = data.assignmentId;
			let studentId = data.studentId;

			return this.assignmentService.getAssignmentInfo(assignmentId, studentId);
		})
		.map((data) => new AssignmentAction.FetchInfoSuccessAction(data.spendTime, data.studentAnswer, data.markScore))
		.catch((err) => Observable.of(new AssignmentAction.FetchInfoFailureAction(err)));

	@Effect()
	submitInfo:Observable<Action> = this.action$
		.ofType(AssignmentAction.SUBMIT)
		.map(toPayload)
		.withLatestFrom(this.store$)
		.map(([payload, state]) => [payload, state.assignment])
		.switchMap(([payload, state])=> {
			const questionId = state.assignment.questionGroupList[state.currentGroupIndex]
				.questionList[state.currentGroupIndex].id;
			const spendTime = state.spendTime.changed?state.spendTime.time:null;
			const studentAnswer = state.studentAnswer.changed?state.studentAnswer.answer.get(questionId):null;
			const markScore = state.markScore.changed?state.markScore.score.get(questionId):null;

			const data = Object.assign({}, payload, {
				questionId: questionId,
				spendTime: spendTime,
				studentAnswer: studentAnswer,
				markScore: markScore
			});
			return this.assignmentService.submitAssignmentInfo(data)
				.map((data) => new AssignmentAction.SubmitSuccessAction())
				.catch((err) => Observable.of(new AssignmentAction.SubmitFailureAction(err)));
		});


}