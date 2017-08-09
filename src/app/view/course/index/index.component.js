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
import { HttpService } from '../../../services/http.service';
import { Router } from "@angular/router";
var IndexComponent = (function () {
    function IndexComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
    }
    IndexComponent.prototype.ngOnInit = function () {
        if (!this.httpService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
    };
    IndexComponent = __decorate([
        Component({
            selector: 'app-index',
            templateUrl: 'index.component.html',
            styleUrls: ['index.component.css']
        }),
        __metadata("design:paramtypes", [HttpService, Router])
    ], IndexComponent);
    return IndexComponent;
}());
export { IndexComponent };
