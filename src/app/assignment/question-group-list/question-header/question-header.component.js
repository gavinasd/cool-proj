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
import { Mode } from "../../../models/assignments/Assignment";
import { Router } from "@angular/router";
var QuestionHeaderComponent = (function () {
    function QuestionHeaderComponent(router) {
        this.router = router;
        this.ModeType = Mode;
    }
    QuestionHeaderComponent.prototype.ngOnInit = function () {
    };
    QuestionHeaderComponent.prototype.homeworkMode = function () {
        return this.mode == this.ModeType.HomeWork;
    };
    QuestionHeaderComponent.prototype.gotoHome = function () {
        this.router.navigate(['/']);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuestionHeaderComponent.prototype, "assignmentName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionHeaderComponent.prototype, "mode", void 0);
    QuestionHeaderComponent = __decorate([
        Component({
            selector: 'app-question-header',
            templateUrl: './question-header.component.html',
            styleUrls: ['./question-header.component.css']
        }),
        __metadata("design:paramtypes", [Router])
    ], QuestionHeaderComponent);
    return QuestionHeaderComponent;
}());
export { QuestionHeaderComponent };
