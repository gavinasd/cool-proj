var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig } from "ng2-toasty";
var ToastService = (function () {
    function ToastService(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        this.toastOptions = {
            title: "",
            msg: "",
            showClose: true,
            timeout: 3000,
            theme: 'bootstrap',
            onAdd: function (toast) {
                console.log("toasting");
            },
            onRemove: function (toast) { }
        };
    }
    ToastService.prototype.info = function (content) {
        this.toastOptions.msg = content;
        this.toastOptions.title = '信息';
        this.toastyService.info(this.toastOptions);
    };
    ToastService.prototype.success = function (content) {
        this.toastOptions.msg = content;
        this.toastOptions.title = '成功';
        this.toastyService.success(this.toastOptions);
    };
    ToastService.prototype.error = function (content) {
        this.toastOptions.msg = content;
        this.toastOptions.title = '失败';
        this.toastyService.error(this.toastOptions);
    };
    ToastService.prototype.warning = function (content) {
        this.toastOptions.msg = content;
        this.toastOptions.title = '警告';
        this.toastyService.warning(this.toastOptions);
    };
    ToastService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastyService, ToastyConfig])
    ], ToastService);
    return ToastService;
}());
export { ToastService };
