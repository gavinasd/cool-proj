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
import { ClassService } from "../../services/class.service";
var ClassUserListComponent = (function () {
    function ClassUserListComponent(classService) {
        this.classService = classService;
    }
    ClassUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.classService.classGetAllUser(this.classId)
            .subscribe(function (data) {
            console.log(data);
            _this.teacherList = data.teacherList;
            _this.studentList = data.studentList;
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ClassUserListComponent.prototype, "classId", void 0);
    ClassUserListComponent = __decorate([
        Component({
            selector: 'app-class-user-list',
            templateUrl: './class-user-list.component.html',
            styleUrls: ['./class-user-list.component.css']
        }),
        __metadata("design:paramtypes", [ClassService])
    ], ClassUserListComponent);
    return ClassUserListComponent;
}());
export { ClassUserListComponent };
