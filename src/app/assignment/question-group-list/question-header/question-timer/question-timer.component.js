var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import * as fromApplication from "../../../../redux/index.reducer";
import * as assignmentActions from '../../../../redux/assignment/assignment.actions';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
var QuestionTimerComponent = (function () {
    function QuestionTimerComponent(store) {
        this.store = store;
        this.lastTime = new Date();
        this.content = '';
        this.spendTime$ = store.select(fromApplication.getAssignmentSpendTime);
    }
    QuestionTimerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spendTime$.filter(function (spendTime) { return spendTime >= 0; })
            .first().subscribe(function (spendTime) {
            _this.lastTime = new Date(Date.now() - spendTime * 1000);
        });
        Observable.interval(1000).subscribe(function (data) {
            var time = (Date.now() - _this.lastTime.getTime()) / 1000;
            _this.store.dispatch(new assignmentActions.SetSpendTimeAction(time));
            _this.content = _this.getHHMMSS();
        });
    };
    QuestionTimerComponent.prototype.ngAfterViewInit = function () {
    };
    QuestionTimerComponent.prototype.getHHMMSS = function () {
        var diffSeconds = (Date.now() - this.lastTime.getTime()) / 1000;
        var HH = Math.floor((diffSeconds / 3600));
        var MM = Math.floor((diffSeconds % 3600) / 60);
        var SS = Math.floor(diffSeconds % 60);
        var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":"
            + ((MM < 10) ? ("0" + MM) : MM) + ':'
            + ((SS < 10) ? ("0" + SS) : SS);
        return formatted;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuestionTimerComponent.prototype, "assignmentId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuestionTimerComponent.prototype, "studentId", void 0);
    QuestionTimerComponent = __decorate([
        Component({
            selector: 'app-question-timer',
            templateUrl: './question-timer.component.html',
            styleUrls: ['./question-timer.component.css']
        }),
        __metadata("design:paramtypes", [Store])
    ], QuestionTimerComponent);
    return QuestionTimerComponent;
}());
export { QuestionTimerComponent };
