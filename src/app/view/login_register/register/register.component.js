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
import { Router } from '@angular/router';
import { UserService } from "../../../services/user.service";
import { ToastService } from "../../../services/toast.service";
var RegisterComponent = (function () {
    function RegisterComponent(userService, toastService, router) {
        this.userService = userService;
        this.toastService = toastService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var type = 0;
        if (form.type == "teacher") {
            type = 1;
        }
        this.userService.register(form.name, form.email, form.password, type)
            .subscribe(function (resp) { return _this.router.navigate(['']); }, function (error) { return _this.toastService.error(error); });
        return false;
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: 'register.component.html',
            styleUrls: ['register.component.css']
        }),
        __metadata("design:paramtypes", [UserService,
            ToastService,
            Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
