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
import { ClassService } from "../../../services/class.service";
import { Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { ToastService } from "../../../services/toast.service";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { CreateClassDialogComponent } from "../dialogs/create-class-dialog/create-class-dialog.component";
var NavbarComponent = (function () {
    function NavbarComponent(router, httpService, dialog, classService, toastService) {
        this.router = router;
        this.httpService = httpService;
        this.dialog = dialog;
        this.classService = classService;
        this.toastService = toastService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.userName = String(this.httpService.getCurrentUserName());
        this.userType = Number(this.httpService.getUserType());
    };
    NavbarComponent.prototype.submitCreateClass = function (form) {
        var _this = this;
        console.log(form.verifier);
        console.log(form.className);
        this.classService.createClass(form.className, form.verifier)
            .subscribe(function (json) {
            document.getElementById('closeModal').click();
            _this.toastService.success('成功创建班级');
        }, function (err) {
            document.getElementById('closeModal').click();
            _this.toastService.error(err);
        });
    };
    NavbarComponent.prototype.openCreateClassDialog = function () {
        var _this = this;
        var config = new MdDialogConfig();
        config.width = '400px';
        this.dialog.open(CreateClassDialogComponent, config).afterClosed()
            .filter(function (result) { return !!result; })
            .subscribe(function (data) {
            _this.submitCreateClass(data);
        });
    };
    NavbarComponent.prototype.searchClass = function (form) {
        console.log(form.classForSearch);
        this.router.navigate(['/class/search', form.classForSearch]);
    };
    NavbarComponent.prototype.logout = function () {
        this.httpService.logout();
        this.router.navigate(['/login']);
    };
    NavbarComponent = __decorate([
        Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
        }),
        __metadata("design:paramtypes", [Router, HttpService, MdDialog,
            ClassService, ToastService])
    ], NavbarComponent);
    return NavbarComponent;
}());
export { NavbarComponent };
