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
import { ActivatedRoute } from "@angular/router";
import { AssignmentService } from "../../../services/assignment.service";
import { HttpService } from "../../../services/http.service";
import { ToastService } from "../../../services/toast.service";
import { Question } from "../../../models/Questions/Question";
import { TPOReadingQuestion } from "../../../models/Questions/TPOReadingQuestion";
var EditQuestionComponent = (function () {
    function EditQuestionComponent(route, toastService, httpService, assignmentService) {
        var _this = this;
        this.route = route;
        this.toastService = toastService;
        this.httpService = httpService;
        this.assignmentService = assignmentService;
        this.question = new Question({});
        this.route.params.forEach(function (param) {
            _this.assignmentId = param['assignmentId'];
            _this.questionGroupId = param['questionGroupId'];
            _this.questionType = param['type'];
        });
    }
    EditQuestionComponent.prototype.ngOnInit = function () {
    };
    EditQuestionComponent.prototype.onChangeQuestionType = function () {
    };
    EditQuestionComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var question = new TPOReadingQuestion({
            creator: this.httpService.getCurrentId(),
            questionType: form.questionType,
            passage: form.passage,
            question: form.question,
            options: [form.option1, form.option2, form.option3, form.option4],
            answer: form.answer
        });
        console.log(question);
        this.assignmentService.addQuestionToGroup(this.assignmentId, this.questionGroupId, question)
            .subscribe(function (resp) {
            console.log(resp);
            _this.toastService.success("成功提交");
        }, function (error) { return _this.toastService.error(error); });
        return false;
    };
    EditQuestionComponent = __decorate([
        Component({
            selector: 'app-edit-question',
            templateUrl: 'edit-question.component.html',
            styleUrls: ['edit-question.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ToastService,
            HttpService,
            AssignmentService])
    ], EditQuestionComponent);
    return EditQuestionComponent;
}());
export { EditQuestionComponent };
var QuestionType = (function () {
    function QuestionType() {
    }
    return QuestionType;
}());
