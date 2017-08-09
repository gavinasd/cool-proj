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
import { QuestionGroup } from "../../../../models/Questions/QuestionGroup";
var TpoReadingItemComponent = (function () {
    function TpoReadingItemComponent() {
    }
    TpoReadingItemComponent.prototype.ngOnInit = function () {
        this.questionList = this.group.questionList;
    };
    __decorate([
        Input(),
        __metadata("design:type", QuestionGroup)
    ], TpoReadingItemComponent.prototype, "group", void 0);
    TpoReadingItemComponent = __decorate([
        Component({
            selector: 'app-tpo-reading-item',
            templateUrl: './tpo-reading-item.component.html',
            styleUrls: ['./tpo-reading-item.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], TpoReadingItemComponent);
    return TpoReadingItemComponent;
}());
export { TpoReadingItemComponent };
