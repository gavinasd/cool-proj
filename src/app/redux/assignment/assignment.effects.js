var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { AssignmentService } from "../../services/assignment.service";
import { Observable } from "rxjs/Observable";
import * as AssignmentAction from './assignment.actions';
import { Store } from "@ngrx/store";
var AssignmentEffect = (function () {
    function AssignmentEffect(action$, store$, assignmentService) {
        var _this = this;
        this.action$ = action$;
        this.store$ = store$;
        this.assignmentService = assignmentService;
        this.fetch = this.action$
            .ofType(AssignmentAction.FETCH)
            .map(toPayload)
            .switchMap(function (data) {
            var assignmentId = data.assignmentId;
            return _this.assignmentService.getAssignment(assignmentId);
        })
            .map(function (assignment) { return new AssignmentAction.FetchAssignmentSuccessAction(assignment); })
            .catch(function (err) { return Observable.of(new AssignmentAction.FetchAssignmentFailureAction(err)); });
        this.fetchInfo = this.action$
            .ofType(AssignmentAction.FETCH_INFO)
            .map(toPayload)
            .switchMap(function (data) {
            var assignmentId = data.assignmentId;
            var studentId = data.studentId;
            return _this.assignmentService.getAssignmentInfo(assignmentId, studentId);
        })
            .map(function (data) { return new AssignmentAction.FetchInfoSuccessAction(data.spendTime, data.studentAnswer, data.markScore); })
            .catch(function (err) { return Observable.of(new AssignmentAction.FetchInfoFailureAction(err)); });
        this.submitInfo = this.action$
            .ofType(AssignmentAction.SUBMIT)
            .map(toPayload)
            .withLatestFrom(this.store$)
            .map(function (_a) {
            var payload = _a[0], state = _a[1];
            return [payload, state.assignment];
        })
            .switchMap(function (_a) {
            var payload = _a[0], state = _a[1];
            var questionId = state.assignment.questionGroupList[state.currentGroupIndex]
                .questionList[state.currentGroupIndex].id;
            var spendTime = state.spendTime.changed ? state.spendTime.time : null;
            var studentAnswer = state.studentAnswer.changed ? state.studentAnswer.answer.get(questionId) : null;
            var markScore = state.markScore.changed ? state.markScore.score.get(questionId) : null;
            var data = Object.assign({}, payload, {
                questionId: questionId,
                spendTime: spendTime,
                studentAnswer: studentAnswer,
                markScore: markScore
            });
            return _this.assignmentService.submitAssignmentInfo(data)
                .map(function (data) { return new AssignmentAction.SubmitSuccessAction(); })
                .catch(function (err) { return Observable.of(new AssignmentAction.SubmitFailureAction(err)); });
        });
    }
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], AssignmentEffect.prototype, "fetch", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], AssignmentEffect.prototype, "fetchInfo", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Observable)
    ], AssignmentEffect.prototype, "submitInfo", void 0);
    AssignmentEffect = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions, Store, AssignmentService])
    ], AssignmentEffect);
    return AssignmentEffect;
}());
export { AssignmentEffect };
