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
import { GradeInfo } from "../../../models/models";
import { HttpService } from "../../../services/http.service";
import { Mode } from "../../../models/assignments/Assignment";
var GradeInfoItemDetailComponent = (function () {
    function GradeInfoItemDetailComponent(httpService) {
        this.httpService = httpService;
        this.ModeType = Mode;
    }
    GradeInfoItemDetailComponent.prototype.ngOnInit = function () {
        this.userType = this.httpService.getUserType();
        this.gradePercentage = this.gradeInfo.score / this.gradeInfo.totalScore;
    };
    __decorate([
        Input(),
        __metadata("design:type", GradeInfo)
    ], GradeInfoItemDetailComponent.prototype, "gradeInfo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GradeInfoItemDetailComponent.prototype, "classId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GradeInfoItemDetailComponent.prototype, "assignmentId", void 0);
    GradeInfoItemDetailComponent = __decorate([
        Component({
            selector: 'app-grade-info-item-detail',
            templateUrl: './grade-info-item-detail.component.html',
            styleUrls: ['./grade-info-item-detail.component.css']
        }),
        __metadata("design:paramtypes", [HttpService])
    ], GradeInfoItemDetailComponent);
    return GradeInfoItemDetailComponent;
}());
export { GradeInfoItemDetailComponent };
