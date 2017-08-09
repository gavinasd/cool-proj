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
import { Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { AssignmentService } from "../../services/assignment.service";
import { ToastService } from "../../services/toast.service";
var ClassDetailNavComponent = (function () {
    function ClassDetailNavComponent(router, httpService, assignmentService, toastService) {
        this.router = router;
        this.httpService = httpService;
        this.assignmentService = assignmentService;
        this.toastService = toastService;
    }
    ClassDetailNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userType = Number(this.httpService.getUserType());
        this.userName = String(this.httpService.getCurrentUserName());
        if (this.userType == 1) {
            this.assignmentService.getAllAssignmentList().subscribe(function (assignmentList) {
                _this.assignmentList = assignmentList;
            });
        }
    };
    ClassDetailNavComponent.prototype.searchClass = function (form) {
        console.log(form.value.classForSearch);
        this.router.navigate(['/class/search', form.value.classForSearch]);
    };
    ClassDetailNavComponent.prototype.logout = function () {
        this.httpService.logout();
        this.router.navigate(['/login']);
    };
    ClassDetailNavComponent.prototype.gotoHome = function () {
        this.router.navigate(['/']);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ClassDetailNavComponent.prototype, "classId", void 0);
    ClassDetailNavComponent = __decorate([
        Component({
            selector: 'app-class-detail-nav',
            templateUrl: './class-detail-nav.component.html',
            styleUrls: ['./class-detail-nav.component.css']
        }),
        __metadata("design:paramtypes", [Router, HttpService,
            AssignmentService, ToastService])
    ], ClassDetailNavComponent);
    return ClassDetailNavComponent;
}());
export { ClassDetailNavComponent };
