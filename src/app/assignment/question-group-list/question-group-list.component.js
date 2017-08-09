var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../services/toast.service";
import { AssignmentService } from "../../services/assignment.service";
import { Store } from "@ngrx/store";
import * as fromApplication from '../../redux/index.reducer';
import * as assignmentActions from '../../redux/assignment/assignment.actions';
var QuestionGroupListComponent = (function () {
    function QuestionGroupListComponent(route, toastService, assignmentService, router, store) {
        var _this = this;
        this.route = route;
        this.toastService = toastService;
        this.assignmentService = assignmentService;
        this.router = router;
        this.store = store;
        this.route.params.forEach(function (param) {
            _this.classId = param['classId'];
            _this.assignmentId = param['assignmentId'];
            _this.studentId = param['studentId'];
            _this.mode = param['mode'];
        });
        this.loading$ = this.store.select(fromApplication.getLoading);
        this.errMessage$ = this.store.select(fromApplication.getErrMessage);
        this.complete$ = this.store.select(fromApplication.getComplete);
        this.assignmentName$ = this.store.select(fromApplication.getAssignmentName);
        this.group$ = this.store.select(fromApplication.getCurrentGroup);
        this.groupType$ = this.store.select(fromApplication.getGroupType);
        this.groupContent$ = this.store.select(fromApplication.getGroupContent);
        this.shouldShowContent$ = this.store.select(fromApplication.shouldShowContent);
        this.currentQuestion$ = this.store.select(fromApplication.getCurrentQuestion);
        this.questionIndex$ = this.store.select(fromApplication.getQuestionIndex);
        this.questionListLength$ = this.store.select(fromApplication.getQuestionListLength);
        this.lastAnswer$ = this.store.select(fromApplication.getLastAnswer);
        this.markingScore$ = this.store.select(fromApplication.getMarkingScore);
    }
    QuestionGroupListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.complete$.subscribe(function (complete) {
            if (complete) {
                _this.router.navigate(['/class/' + _this.classId]);
            }
        });
        this.errMessage$.subscribe(function (errMessage) {
            console.log(errMessage);
        });
        this.store.dispatch(new assignmentActions.FetchAssignmentAction({
            assignmentId: this.assignmentId,
            studentId: this.studentId
        }));
        this.store.dispatch(new assignmentActions.FetchInfoAction({
            assignmentId: this.assignmentId,
            studentId: this.studentId
        }));
    };
    QuestionGroupListComponent.prototype.changeAnswer = function (answer) {
        this.store.dispatch(new assignmentActions.SetStudentAnswerAction(answer));
    };
    QuestionGroupListComponent.prototype.changeScore = function (score) {
        this.store.dispatch(new assignmentActions.SetMarkingScoreAction(score));
    };
    QuestionGroupListComponent.prototype.changeSpendTime = function (time) {
        this.store.dispatch(new assignmentActions.SetSpendTimeAction(time));
    };
    QuestionGroupListComponent.prototype.next = function () {
        var _this = this;
        this.store.dispatch(new assignmentActions.SubmitAction({
            classId: this.classId,
            assignmentId: this.assignmentId,
            studentId: this.studentId
        }));
        this.loading$.filter(function (loading) { return !loading; }).first().subscribe(function (loading) {
            _this.store.dispatch(new assignmentActions.NextAction());
        });
    };
    QuestionGroupListComponent.prototype.pre = function () {
        this.store.dispatch(new assignmentActions.PreAction());
    };
    QuestionGroupListComponent.prototype.ngOnDestroy = function () {
        this.store.dispatch(new assignmentActions.ResetAction());
    };
    QuestionGroupListComponent = __decorate([
        Component({
            selector: 'app-question-group-list',
            templateUrl: './question-group-list.component.html',
            styleUrls: ['./question-group-list.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ToastService,
            AssignmentService,
            Router,
            Store])
    ], QuestionGroupListComponent);
    return QuestionGroupListComponent;
}());
export { QuestionGroupListComponent };
