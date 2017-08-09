var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from "../../../models/Questions/Question";
import { Mode } from "../../../models/assignments/Assignment";
var QuestionGroupDetailComponent = (function () {
    function QuestionGroupDetailComponent() {
        this.OnChangeAnswer = new EventEmitter();
        this.OnMarkScore = new EventEmitter();
        this.ModeType = Mode;
    }
    QuestionGroupDetailComponent.prototype.ngOnInit = function () {
    };
    QuestionGroupDetailComponent.prototype.changeAnswer = function () {
        this.OnChangeAnswer.emit(this.answer);
    };
    QuestionGroupDetailComponent.prototype.markScore = function (score) {
        this.OnMarkScore.emit(score);
    };
    QuestionGroupDetailComponent.prototype.homeWorkMode = function () {
        return this.mode == this.ModeType.HomeWork;
    };
    QuestionGroupDetailComponent.prototype.markingMode = function () {
        return this.mode == this.ModeType.Marking;
    };
    QuestionGroupDetailComponent.prototype.reviewMode = function () {
        return this.mode == this.ModeType.Review;
    };
    QuestionGroupDetailComponent.prototype.correct = function () {
        return this.markingScore == this.question.score;
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionGroupDetailComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuestionGroupDetailComponent.prototype, "groupContent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Question)
    ], QuestionGroupDetailComponent.prototype, "question", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuestionGroupDetailComponent.prototype, "lastAnswer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionGroupDetailComponent.prototype, "markingScore", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], QuestionGroupDetailComponent.prototype, "OnChangeAnswer", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], QuestionGroupDetailComponent.prototype, "OnMarkScore", void 0);
    QuestionGroupDetailComponent = __decorate([
        Component({
            selector: 'app-question-group-detail',
            templateUrl: './question-group-detail.component.html',
            styleUrls: ['./question-group-detail.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuestionGroupDetailComponent);
    return QuestionGroupDetailComponent;
}());
export { QuestionGroupDetailComponent };
