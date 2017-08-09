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
import { AssignmentService } from "../../../../services/assignment.service";
import { MdDialogRef } from "@angular/material";
var AddAssignmentDialogComponent = (function () {
    function AddAssignmentDialogComponent(assignmentService, dialogRef) {
        this.assignmentService = assignmentService;
        this.dialogRef = dialogRef;
    }
    AddAssignmentDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assignmentService.getAllAssignmentList().subscribe(function (assignmentList) {
            _this.assignmentList = assignmentList;
        });
    };
    AddAssignmentDialogComponent = __decorate([
        Component({
            selector: 'app-add-assignment-dialog',
            templateUrl: './add-assignment-dialog.component.html',
            styleUrls: ['./add-assignment-dialog.component.css']
        }),
        __metadata("design:paramtypes", [AssignmentService, MdDialogRef])
    ], AddAssignmentDialogComponent);
    return AddAssignmentDialogComponent;
}());
export { AddAssignmentDialogComponent };
