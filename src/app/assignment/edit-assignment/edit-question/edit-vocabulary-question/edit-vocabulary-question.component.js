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
import { VocabularyQuestion } from "../../../../models/Questions/VocabularyQuestion";
import { Question } from "../../../../models/Questions/Question";
var EditVocabularyQuestionComponent = (function () {
    function EditVocabularyQuestionComponent(assignmentService, httpService, toastService) {
        this.assignmentService = assignmentService;
        this.httpService = httpService;
        this.toastService = toastService;
        this.wordList = [];
    }
    EditVocabularyQuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assignmentService.getQuestionGroupById(this.assignmentId, this.groupId)
            .subscribe(function (group) {
            _this.questionGroup = group;
            _this.wordList = JSON.parse(_this.questionGroup.content);
        });
    };
    EditVocabularyQuestionComponent.prototype.addOneWord = function (form) {
        var newWord = new Vocabulary(form.value.english, form.value.chinese);
        this.wordList.push(newWord);
        this.assignmentService.updateQuestionGroupContent(this.assignmentId, this.groupId, JSON.stringify(this.wordList))
            .subscribe(function (assignment) {
            console.log(assignment);
            form.resetForm();
        });
    };
    EditVocabularyQuestionComponent.prototype.addQuestion = function (form) {
        var _this = this;
        var question = new VocabularyQuestion({
            creator: this.httpService.getCurrentId(),
            questionType: Question.VOCABULARY_TYPE,
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
            form.reset();
        }, function (error) { return _this.toastService.error(error); });
        return false;
    };
    EditVocabularyQuestionComponent.prototype.play = function (word) {
        var audio = new Audio('http://dict.youdao.com/dictvoice?type=2&audio=' + word);
        audio.play();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EditVocabularyQuestionComponent.prototype, "assignmentId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EditVocabularyQuestionComponent.prototype, "groupId", void 0);
    EditVocabularyQuestionComponent = __decorate([
        Component({
            selector: 'app-edit-vocabulary-question',
            templateUrl: './edit-vocabulary-question.component.html',
            styleUrls: ['./edit-vocabulary-question.component.css']
        }),
        __metadata("design:paramtypes", [AssignmentService,
            HttpService,
            ToastService])
    ], EditVocabularyQuestionComponent);
    return EditVocabularyQuestionComponent;
}());
export { EditVocabularyQuestionComponent };
var Vocabulary = (function () {
    function Vocabulary(english, chinese) {
        this.english = english;
        this.chinese = chinese;
    }
    return Vocabulary;
}());
