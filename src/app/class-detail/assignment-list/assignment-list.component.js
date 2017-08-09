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
import { ToastService } from "../../services/toast.service";
import { AssignmentService } from "../../services/assignment.service";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpService } from "../../services/http.service";
import { AddAssignmentDialogComponent } from "../../shared/view/dialogs/add-assignment-dialog/add-assignment-dialog.component";
var AssignmentListComponent = (function () {
    function AssignmentListComponent(dialog, toastService, httpService, assignmentService) {
        this.dialog = dialog;
        this.toastService = toastService;
        this.httpService = httpService;
        this.assignmentService = assignmentService;
        this.more$ = new BehaviorSubject(true);
        this.page = 0;
        this.loading = true;
        this.listForShow = [];
    }
    AssignmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userType = this.httpService.getUserType();
        this.more$.switchMap(function () {
            console.log('show more');
            _this.page++;
            _this.loading = true;
            return _this.assignmentService.getAssignmentList(_this.classId, _this.page);
        })
            .subscribe(function (assignmentList) {
            _this.loading = false;
            for (var _i = 0, assignmentList_1 = assignmentList; _i < assignmentList_1.length; _i++) {
                var assignment = assignmentList_1[_i];
                _this.listForShow.push(assignment);
            }
        });
    };
    AssignmentListComponent.prototype.openAddAssignmentDialog = function () {
        var _this = this;
        var config = new MdDialogConfig();
        config.width = '400px';
        this.dialog.open(AddAssignmentDialogComponent, config).afterClosed()
            .filter(function (result) { return !!result; })
            .subscribe(function (data) {
            _this.addAssignment(data);
        });
    };
    AssignmentListComponent.prototype.addAssignment = function (form) {
        var _this = this;
        console.log(form.assignment);
        this.assignmentService.addAssignmentToClass(this.classId, form.assignment)
            .subscribe(function (json) {
            _this.toastService.success("成功添加作业");
        }, function (err) {
            _this.toastService.error(err);
        });
    };
    AssignmentListComponent.prototype.canShowMore = function () {
        if (this.loading) {
            return false;
        }
        else {
            return this.page * 5 == this.listForShow.length;
        }
    };
    AssignmentListComponent.prototype.showMore = function () {
        this.more$.next(true);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AssignmentListComponent.prototype, "classId", void 0);
    AssignmentListComponent = __decorate([
        Component({
            selector: 'app-assignment-list',
            templateUrl: './assignment-list.component.html',
            styleUrls: ['./assignment-list.component.css']
        }),
        __metadata("design:paramtypes", [MdDialog,
            ToastService,
            HttpService,
            AssignmentService])
    ], AssignmentListComponent);
    return AssignmentListComponent;
}());
export { AssignmentListComponent };
