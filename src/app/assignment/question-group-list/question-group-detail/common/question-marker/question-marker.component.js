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
var QuestionMarkerComponent = (function () {
    function QuestionMarkerComponent() {
        this.marking = new EventEmitter();
    }
    QuestionMarkerComponent.prototype.ngOnInit = function () {
    };
    QuestionMarkerComponent.prototype.correct = function () {
        this.marking.emit(this.score);
    };
    QuestionMarkerComponent.prototype.error = function () {
        this.marking.emit(0);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionMarkerComponent.prototype, "score", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], QuestionMarkerComponent.prototype, "marking", void 0);
    QuestionMarkerComponent = __decorate([
        Component({
            selector: 'app-question-marker',
            templateUrl: './question-marker.component.html',
            styleUrls: ['./question-marker.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuestionMarkerComponent);
    return QuestionMarkerComponent;
}());
export { QuestionMarkerComponent };
