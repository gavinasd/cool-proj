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
import { ClassInfo } from "../../models/models";
import { ClassService } from "../../services/class.service";
import { ToastService } from "../../services/toast.service";
var SearchResultItemComponent = (function () {
    function SearchResultItemComponent(classService, toastService) {
        this.classService = classService;
        this.toastService = toastService;
    }
    SearchResultItemComponent.prototype.ngOnInit = function () {
    };
    SearchResultItemComponent.prototype.followClass = function (form) {
        var _this = this;
        var verifyCode = form.verifyCode;
        this.classService.classAddStudent(this.classInfo.classId, verifyCode)
            .subscribe(function (json) {
            document.getElementById('closeModal').click();
            _this.toastService.success("成功加入班级");
        }, function (err) {
            document.getElementById('closeModal').click();
            _this.toastService.error(err);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", ClassInfo)
    ], SearchResultItemComponent.prototype, "classInfo", void 0);
    SearchResultItemComponent = __decorate([
        Component({
            selector: 'app-search-result-item',
            templateUrl: './search-result-item.component.html',
            styleUrls: ['./search-result-item.component.css']
        }),
        __metadata("design:paramtypes", [ClassService, ToastService])
    ], SearchResultItemComponent);
    return SearchResultItemComponent;
}());
export { SearchResultItemComponent };
