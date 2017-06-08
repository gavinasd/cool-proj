"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TpoReadingQuestionDetailComponent = (function () {
    function TpoReadingQuestionDetailComponent() {
        this.lastContent = []; //[questionId,content]列表
        this.onAnswerChanged = new core_1.EventEmitter();
    }
    TpoReadingQuestionDetailComponent.prototype.ngOnInit = function () {
    };
    TpoReadingQuestionDetailComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        //先找到上一次做题的内容
        var thatLastContent = this.lastContent.find(function (lastContent) { return lastContent.questionId == _this.question.question; });
        if (!thatLastContent) {
            //内存里面并没有上次作答的内容，那么当前内容就是数据库中保存的内容
            this.answer = this.question.content;
        }
        else {
            this.answer = thatLastContent.content;
        }
        this.changeAnswer();
    };
    //学生的回答发生了改变
    TpoReadingQuestionDetailComponent.prototype.changeAnswer = function () {
        var _this = this;
        var hasContent = false;
        this.lastContent.forEach(function (lastContent) {
            if (lastContent.questionId == _this.question.question) {
                lastContent.content = _this.answer;
                hasContent = true;
            }
        });
        if (!hasContent) {
            this.lastContent.push(new LastContent(this.question.question, this.answer));
        }
        this.onAnswerChanged.emit(this.answer);
    };
    TpoReadingQuestionDetailComponent.prototype.convert09ToAz = function (i) {
        return String.fromCharCode(65 + i);
    };
    return TpoReadingQuestionDetailComponent;
}());
__decorate([
    core_1.Input()
], TpoReadingQuestionDetailComponent.prototype, "question");
__decorate([
    core_1.Output()
], TpoReadingQuestionDetailComponent.prototype, "onAnswerChanged");
TpoReadingQuestionDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-tpo-reading-question-detail',
        templateUrl: 'tpo-reading-question-detail.component.html',
        styleUrls: ['tpo-reading-question-detail.component.css']
    })
], TpoReadingQuestionDetailComponent);
exports.TpoReadingQuestionDetailComponent = TpoReadingQuestionDetailComponent;
var LastContent = (function () {
    function LastContent(questionId, content) {
        this.questionId = questionId;
        this.content = content;
    }
    return LastContent;
}());
//# sourceMappingURL=tpo-reading-question-detail.component.js.map