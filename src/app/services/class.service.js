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
var ClassService = (function () {
    function ClassService(httpService) {
        this.httpService = httpService;
    }
    ClassService.prototype.createClass = function (className, verifier) {
        var url = environment.createClassUrl;
        url = url + '/' + this.httpService.getCurrentId();
        var body = JSON.stringify({
            name: className,
            verifier: verifier
        });
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json(); }).catch(HttpService.handleError);
    };
    ClassService.prototype.getClassList = function (userId) {
        var url = environment.getClassListUrl;
        url = url + '/' + userId;
        return this.httpService.makeGetWithToken(url).map(function (resp) {
            return resp.json().classes;
        });
    };
    ClassService.prototype.getClassDetail = function (classId) {
        var url = environment.getClassDetailUrl;
        var userId = this.httpService.getCurrentId();
        url = url + '/' + classId + '/' + userId;
        return this.httpService.makeGetWithToken(url);
    };
    ClassService.prototype.searchClass = function (className) {
        var url = environment.searchClassUrl;
        url = url + '/' + className;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) { return resp.json().classes; });
    };
    ClassService.prototype.classAddStudent = function (classId, verifyCode) {
        var url = environment.addStudentUrl;
        var body = JSON.stringify({
            studentId: this.httpService.getCurrentId(),
            classId: classId,
            verifyCode: verifyCode
        });
        console.log(body);
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json(); }).catch(HttpService.handleError);
    };
    ClassService.prototype.classGetAllUser = function (classId) {
        var url = environment.getClassAllUserUrl;
        url = url + '/' + classId + '/' + this.httpService.getCurrentId();
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) { return resp.json(); }).catch(HttpService.handleError);
    };
    ClassService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], ClassService);
    return ClassService;
}());
export { ClassService };
