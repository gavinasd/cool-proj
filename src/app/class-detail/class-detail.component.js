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
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { ClassService } from "../services/class.service";
var ClassDetailComponent = (function () {
    function ClassDetailComponent(route, classService) {
        var _this = this;
        this.route = route;
        this.classService = classService;
        this.route.params.forEach(function (param) {
            _this.classId = param['classId'];
        });
    }
    ClassDetailComponent.prototype.ngOnInit = function () {
    };
    ClassDetailComponent.prototype.ngOnDestroy = function () {
        console.log('destroy');
    };
    ClassDetailComponent = __decorate([
        Component({
            selector: 'app-class-detail',
            templateUrl: './class-detail.component.html',
            styleUrls: ['./class-detail.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ClassService])
    ], ClassDetailComponent);
    return ClassDetailComponent;
}());
export { ClassDetailComponent };
