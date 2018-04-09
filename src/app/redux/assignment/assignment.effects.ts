import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {AssignmentService} from "../../core/services/assignment.service";
import {Observable} from "rxjs/Observable";
import * as AssignmentAction from './assignment.actions';
import {Action, Store} from "@ngrx/store";
import * as fromApplication from "../index.reducer";
import {catchError, map, switchMap} from "rxjs/operators";
import "rxjs/add/operator/withLatestFrom";


@Injectable()
export class AssignmentEffect {
	constructor(private action$: Actions, private store$: Store<fromApplication.ApplicationState>, private assignmentService: AssignmentService) {
	}

	@Effect()
	fetch: Observable<Action> = this.action$
		.ofType(AssignmentAction.FETCH)
		.pipe(
			map((action: AssignmentAction.FetchAssignmentAction) => action.payload),
			switchMap((data) => {
				let assignmentId = data.assignmentId;

				return this.assignmentService.getAssignment(assignmentId);
			}),
			map((assignment) => new AssignmentAction.FetchAssignmentSuccessAction(assignment)),
			catchError((err) => Observable.of(new AssignmentAction.FetchAssignmentFailureAction(err)))
		);


	@Effect()
	fetchInfo: Observable<Action> = this.action$
		.ofType(AssignmentAction.FETCH_INFO)
		.pipe(
			map((action: AssignmentAction.FetchInfoAction) => action.payload),
			switchMap(data => {
				const courseId = data.courseId;
				const assignmentId = data.assignmentId;
				const studentId = data.studentId;

				return this.assignmentService.getAssignmentInfo(courseId, assignmentId, studentId);
			}),
			map(data => new AssignmentAction.FetchInfoSuccessAction(data.spendTime, data.studentAnswer, data.markScore)),
			catchError((err) => Observable.of(new AssignmentAction.FetchInfoFailureAction(err)))
		);


	@Effect()
	submitInfo: Observable<Action> = this.action$
		.ofType(AssignmentAction.SUBMIT)
		.withLatestFrom(this.store$, (action: AssignmentAction.SubmitAction, state: fromApplication.ApplicationState) => {
			return [action.payload, state.assignment];
		})
		.pipe(
			switchMap(([payload, state]) => {
				const questionId = state.assignment.questionGroupList[state.currentGroupIndex]
					.questionList[state.currentQuestionIndex].questionId;
				const spendTime = state.spendTime.changed ? state.spendTime.time : -1;
				const studentAnswer = state.studentAnswer.changed ? state.studentAnswer.answer.get(questionId) : "";
				const markScore = state.markScore.changed ? state.markScore.score.get(questionId) : -1;

				const data = Object.assign({}, payload, {
					questionId: questionId,
					spendTime: spendTime,
					studentAnswer: studentAnswer,
					markScore: markScore
				});
				return this.assignmentService.submitAssignmentInfo(data)
					.pipe(map((data) => new AssignmentAction.SubmitSuccessAction()));
			}),
			catchError((err) => Observable.of(new AssignmentAction.SubmitFailureAction(err)))
		);

}