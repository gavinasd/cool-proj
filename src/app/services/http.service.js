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
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.testReadOneUser = function () {
        this.makeGetWithToken("http://localhost:3000/api/user/" + this.getCurrentId())
            .subscribe(function (resp) {
            console.log(resp.json());
            console.log(JSON.stringify(resp.json()));
        });
    };
    HttpService.prototype.makeGetWithToken = function (url) {
        var header = new Headers();
        header.append('Authorization', "Bearer " + this.getToken());
        return this.http.get(url, { headers: header });
    };
    HttpService.prototype.makePost = function (url, body) {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(url, body, { headers: header });
    };
    HttpService.prototype.makePostWithToken = function (url, body) {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(url, body, { headers: header });
    };
    HttpService.prototype.makePutWithToken = function (url, body) {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.put(url, body, { headers: header });
    };
    HttpService.prototype.getToken = function () {
        return localStorage.getItem("auth_token");
    };
    HttpService.prototype.setToken = function (token) {
        localStorage.setItem("auth_token", token);
    };
    HttpService.prototype.deleteToken = function () {
        localStorage.removeItem("auth_token");
    };
    HttpService.prototype.getCurrentId = function () {
        return localStorage.getItem("current_id");
    };
    HttpService.prototype.setCurrentId = function (id) {
        localStorage.setItem('current_id', id);
    };
    HttpService.prototype.deleteCurrentId = function () {
        localStorage.removeItem('current_id');
    };
    HttpService.prototype.getCurrentUserName = function () {
        return localStorage.getItem('current_name');
    };
    HttpService.prototype.setCurrentUserName = function (userName) {
        localStorage.setItem('current_name', userName);
    };
    HttpService.prototype.deleteUserName = function () {
        localStorage.removeItem('current_name');
    };
    HttpService.prototype.getUserType = function () {
        return localStorage.getItem("current_user_type");
    };
    HttpService.prototype.setUserType = function (userType) {
        localStorage.setItem('current_user_type', userType);
    };
    HttpService.prototype.deleteUserType = function () {
        localStorage.removeItem('current_user_type');
    };
    HttpService.prototype.isLoggedIn = function () {
        return this.getToken() ? true : false;
    };
    HttpService.prototype.logout = function () {
        this.deleteCurrentId();
        this.deleteUserName();
        this.deleteUserType();
        this.deleteToken();
    };
    HttpService.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body.message) || JSON.stringify(body.errmsg);
            errMsg = error.statusText + ":" + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    HttpService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], HttpService);
    return HttpService;
}());
export { HttpService };
