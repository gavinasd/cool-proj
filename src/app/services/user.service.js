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
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
var UserService = (function () {
    function UserService(httpService) {
        this.httpService = httpService;
    }
    UserService.prototype.login = function (email, password) {
        var _this = this;
        console.log('service login start');
        var user;
        var body = JSON.stringify({
            'email': email,
            'password': password
        });
        return this.httpService
            .makePost(environment.loginUrl, body)
            .map(function (resp) {
            _this.httpService.setToken(resp.json().token);
            _this.httpService.setCurrentId(resp.json().id);
            _this.httpService.setUserType(resp.json().userType);
            _this.httpService.setCurrentUserName(resp.json().userName);
            return resp.json();
        })
            .catch(HttpService.handleError);
    };
    UserService.prototype.register = function (name, email, password, type) {
        var _this = this;
        console.log('service register start');
        var body = JSON.stringify({
            'nickName': name,
            'email': email,
            'password': password,
            'userType': type.toString()
        });
        return this.httpService
            .makePost(environment.registerUrl, body)
            .map(function (resp) {
            _this.httpService.setToken(resp.json().token);
            _this.httpService.setCurrentId(resp.json().id);
            _this.httpService.setUserType(resp.json().userType);
            _this.httpService.setCurrentUserName(resp.json().userName);
            return resp.json().id;
        })
            .catch(HttpService.handleError);
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], UserService);
    return UserService;
}());
export { UserService };
