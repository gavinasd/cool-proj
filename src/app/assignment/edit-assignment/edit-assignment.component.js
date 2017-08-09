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
import { Router } from "@angular/router";
import { AssignmentService } from "../../services/assignment.service";
import { QuestionGroup } from "../../models/Questions/QuestionGroup";
var EditAssignmentComponent = (function () {
    function EditAssignmentComponent(assignmentService, router) {
        this.assignmentService = assignmentService;
        this.router = router;
        this.selectAssignmentId = '';
    }
    EditAssignmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assignmentService.getAllAssignmentList().subscribe(function (assignmentList) {
            _this.assignmentList = assignmentList;
        });
    };
    EditAssignmentComponent.prototype.selectAssignment = function (assignmentId) {
        this.selectAssignmentId = assignmentId;
    };
    EditAssignmentComponent.prototype.createAssignment = function (form) {
        var _this = this;
        var assignmentName = form.value.assignmentName;
        this.assignmentService.createAssignment(assignmentName)
            .subscribe(function (newAssignment) {
            _this.assignmentList.push(newAssignment);
        });
    };
    EditAssignmentComponent.prototype.addQuestionGroupToAssignment = function (form) {
        var _this = this;
        this.assignmentService.addQuestionGroupToAssignment(this.selectAssignmentId, form.value.type)
            .subscribe(function (questionGroup) {
            form.reset();
            document.getElementById('closeModal2').click();
            var group = new QuestionGroup(questionGroup);
            _this.router.navigate(['/question/edit/' + _this.selectAssignmentId
                    + '/' + group.id + '/' + group.type]);
        });
    };
    EditAssignmentComponent = __decorate([
        Component({
            selector: 'app-edit-assignment',
            templateUrl: './edit-assignment.component.html',
            styleUrls: ['./edit-assignment.component.css']
        }),
        __metadata("design:paramtypes", [AssignmentService, Router])
    ], EditAssignmentComponent);
    return EditAssignmentComponent;
}());
export { EditAssignmentComponent };
