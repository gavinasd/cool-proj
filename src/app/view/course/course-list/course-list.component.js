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
import { ClassInfo } from "../../../models/models";
import { ClassService } from "../../../services/class.service";
import { HttpService } from "../../../services/http.service";
import 'rxjs/add/operator/map';
var CourseListComponent = (function () {
    function CourseListComponent(classService, httpService) {
        this.classService = classService;
        this.httpService = httpService;
        this.tests = ["ab", "d", "c", "d", "ddfdf"];
    }
    CourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.classInfoList$ = this.classService.getClassList(this.httpService.getCurrentId());
        this.classInfoList$.map(function (classInfoList) {
            return classInfoList.map(function (classInfo) {
                var mClassInfo = new ClassInfo(classInfo._id, classInfo.name);
                return mClassInfo;
            });
        }).subscribe(function (classInfoList) {
            console.log(JSON.stringify(classInfoList));
            _this.classInfoList = classInfoList;
        });
    };
    CourseListComponent = __decorate([
        Component({
            selector: 'app-course-list',
            templateUrl: 'course-list.component.html',
            styleUrls: ['course-list.component.css']
        }),
        __metadata("design:paramtypes", [ClassService, HttpService])
    ], CourseListComponent);
    return CourseListComponent;
}());
export { CourseListComponent };
