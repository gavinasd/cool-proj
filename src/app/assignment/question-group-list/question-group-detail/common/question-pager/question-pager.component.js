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
var QuestionPagerComponent = (function () {
    function QuestionPagerComponent() {
        this.next = new EventEmitter();
        this.pre = new EventEmitter();
    }
    QuestionPagerComponent.prototype.ngOnInit = function () {
    };
    QuestionPagerComponent.prototype.nextQuestion = function () {
        this.next.emit('next');
    };
    QuestionPagerComponent.prototype.preQuestion = function () {
        this.pre.emit('pre');
    };
    QuestionPagerComponent.prototype.getPagerContent = function () {
        if (!this.shouldShowContent) {
            return '第' + (this.questionIndex + 1) + '题/' +
                '共' + (this.questionListLength) + '题';
        }
        else {
            return '';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], QuestionPagerComponent.prototype, "shouldShowContent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionPagerComponent.prototype, "questionIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionPagerComponent.prototype, "questionListLength", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], QuestionPagerComponent.prototype, "next", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], QuestionPagerComponent.prototype, "pre", void 0);
    QuestionPagerComponent = __decorate([
        Component({
            selector: 'app-question-pager',
            templateUrl: './question-pager.component.html',
            styleUrls: ['./question-pager.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuestionPagerComponent);
    return QuestionPagerComponent;
}());
export { QuestionPagerComponent };
