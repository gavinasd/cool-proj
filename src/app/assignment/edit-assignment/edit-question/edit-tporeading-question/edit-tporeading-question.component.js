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
import { AssignmentService } from "../../../../services/assignment.service";
import { HttpService } from "../../../../services/http.service";
import { ToastService } from "../../../../services/toast.service";
import { TPOReadingQuestion } from "../../../../models/Questions/TPOReadingQuestion";
import { Question } from "../../../../models/Questions/Question";
var EditTporeadingQuestionComponent = (function () {
    function EditTporeadingQuestionComponent(assignmentService, httpService, toastService) {
        this.assignmentService = assignmentService;
        this.httpService = httpService;
        this.toastService = toastService;
        this.EditorOptions = {
            wordPasteModal: false
        };
    }
    EditTporeadingQuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assignmentService.getQuestionGroupById(this.assignmentId, this.groupId)
            .subscribe(function (group) {
            _this.questionGroup = group;
        });
    };
    EditTporeadingQuestionComponent.prototype.addContent = function (form) {
        this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.groupId, '')
            .subscribe(function (assignment) {
            console.log(assignment);
            form.resetForm();
        });
    };
    EditTporeadingQuestionComponent.prototype.addQuestion = function (form) {
        var _this = this;
        var question = new TPOReadingQuestion({
            creator: this.httpService.getCurrentId(),
            questionType: Question.TPO_READING_TYPE,
            passage: this.editorPassage,
            question: form.value.question,
            options: [form.value.option1, form.value.option2,
                form.value.option3, form.value.option4],
            answer: form.value.answer
        });
        console.log(question);
        this.assignmentService.addQuestionToGroup(this.assignmentId, this.groupId, question)
            .subscribe(function (resp) {
            console.log(resp);
            _this.toastService.success("成功提交");
            _this.editorPassage = '';
            form.reset();
        }, function (error) { return _this.toastService.error(error); });
        return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EditTporeadingQuestionComponent.prototype, "assignmentId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EditTporeadingQuestionComponent.prototype, "groupId", void 0);
    EditTporeadingQuestionComponent = __decorate([
        Component({
            selector: 'app-edit-tporeading-question',
            templateUrl: 'edit-tporeading-question.component.html',
            styleUrls: ['edit-tporeading-question.component.css']
        }),
        __metadata("design:paramtypes", [AssignmentService,
            HttpService,
            ToastService])
    ], EditTporeadingQuestionComponent);
    return EditTporeadingQuestionComponent;
}());
export { EditTporeadingQuestionComponent };
