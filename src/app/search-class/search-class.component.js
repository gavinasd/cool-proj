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
import { ActivatedRoute } from "@angular/router";
import { ClassService } from "../services/class.service";
import { ClassInfo } from "../models/models";
var SearchClassComponent = (function () {
    function SearchClassComponent(route, classService) {
        var _this = this;
        this.route = route;
        this.classService = classService;
        this.route.params.forEach(function (param) {
            _this.className = param['className'];
        });
    }
    SearchClassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.classInfoList$ = this.classService.searchClass(this.className);
        this.classInfoList$.map(function (classInfoList) {
            return classInfoList.map(function (classInfo) {
                var mClassInfo = new ClassInfo(classInfo._id, classInfo.name);
                return mClassInfo;
            });
        }).subscribe(function (classInfoList) {
            _this.classInfoList = classInfoList;
        });
    };
    SearchClassComponent = __decorate([
        Component({
            selector: 'app-search-class',
            templateUrl: './search-class.component.html',
            styleUrls: ['./search-class.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ClassService])
    ], SearchClassComponent);
    return SearchClassComponent;
}());
export { SearchClassComponent };
