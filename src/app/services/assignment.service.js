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
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpService } from "./http.service";
import { Question } from "../models/Questions/Question";
import { Assignment } from "../models/assignments/Assignment";
import { QuestionGroup } from "../models/Questions/QuestionGroup";
import { MarkingScore, SpendTime, StudentAnswer } from "../models/assignments/AssignmentInfo";
var AssignmentService = (function () {
    function AssignmentService(httpService) {
        this.httpService = httpService;
        this.index = Observable.from([0]);
        this.changeIndex = new BehaviorSubject(false);
    }
    AssignmentService.prototype.getTPOReadingQuestionType = function () {
        return Question.TPO_READING_TYPE;
    };
    AssignmentService.prototype.getVocabularyQuestionType = function () {
        return Question.VOCABULARY_TYPE;
    };
    AssignmentService.prototype.getQuestionTypes = function () {
        return [
            { 'value': Question.TPO_READING_TYPE, 'name': 'TPO阅读题' },
            { 'value': Question.VOCABULARY_TYPE, 'name': '词汇题' }
        ];
    };
    AssignmentService.prototype.reset = function () {
        this.questionList = Observable.from([]);
        this.index = Observable.from([0]);
        this.changeIndex = new BehaviorSubject(false);
    };
    AssignmentService.prototype.getQuestionListByAssignment = function (assignmentId) {
        var _this = this;
        var url = environment.getAssignmentDetailUrl;
        url = url + '/' + this.httpService.getCurrentId() + '/' + assignmentId;
        var questionListLength = 0;
        this.changeIndex.next(false);
        this.questionList = this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            var list = resp.json().results;
            questionListLength = list.length;
            return list;
        });
        this.index = this.changeIndex.scan(function (index, sign) {
            if (sign && index < questionListLength - 1) {
                index++;
            }
            else if (!sign && index > 0) {
                index--;
            }
            console.log("index", "change to:" + index);
            return index;
        }, 1);
        this.question = this.index.combineLatest(this.questionList, function (index, questionList) {
            if (questionList.length > 0) {
                return questionList[index];
            }
        });
        this.question.subscribe(function (question) {
            _this.currentQuestionId = question.question._id;
        });
        return this.questionList;
    };
    AssignmentService.prototype.addResponseToQuestion = function (response) {
        var url = environment.addResponseUrlToQuestionUrl;
        var body = JSON.stringify({
            'userId': response.creator,
            'classId': response.class,
            'assignmentId': response.assignment,
            'questionId': response.question,
            'content': response.content
        });
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json(); })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.addQuestionToGroup = function (assignmentId, groupId, question) {
        var url = environment.addQuestionToGroupUrl;
        var body = JSON.stringify({
            'userId': this.httpService.getCurrentId(),
            'assignmentId': assignmentId,
            'groupId': groupId,
            'question': question
        });
        console.log(body);
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json(); }).catch(HttpService.handleError);
    };
    AssignmentService.prototype.getAssignmentList = function (classId, page) {
        var url = environment.getAssignmentListUrl;
        var userId = this.httpService.getCurrentId();
        url = url + '/' + classId + '/' + userId + '/' + page;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) { return resp.json().gradeInfo; }).catch(HttpService.handleError);
    };
    AssignmentService.prototype.getAllAssignmentList = function () {
        var url = environment.getAllAssignmentListUrl;
        var userId = this.httpService.getCurrentId();
        url = url + '/' + userId;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            var assignmentList = [];
            for (var _i = 0, _a = resp.json().assignmentList; _i < _a.length; _i++) {
                var assignment = _a[_i];
                assignmentList.push(new Assignment(assignment));
            }
            return assignmentList;
        })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.getAssignmentName = function (assignmentId) {
        var url = environment.getAssignmentByIdUrl;
        url = url + '/' + assignmentId;
        console.log(url);
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) { return resp.json().assignment.assignmentName; })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.getQuestionGroupList = function (assignmentId, studentId) {
        var url = environment.getQuestionGroupListUrl;
        url = url + '/' + assignmentId + '/' + studentId;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            var groupList = [];
            for (var _i = 0, _a = resp.json().questionGroupList; _i < _a.length; _i++) {
                var questionGroup = _a[_i];
                var group = new QuestionGroup(questionGroup);
                groupList.push(group);
            }
            return groupList;
        })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.getAssignment = function (assignmentId) {
        var url = environment.getAssignmentByIdUrl;
        url = url + '/' + assignmentId;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            return new Assignment(resp.json());
        })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.getAssignmentInfo = function (assignmentId, studentId) {
        var url = environment.getAssignmentInfoUrl;
        url = url + '/' + assignmentId + '/' + studentId;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            var data = resp.json();
            var spendTime = new SpendTime(false, data.spendTime);
            var studentAnswer = new StudentAnswer(false, new Map());
            for (var _i = 0, _a = data.studentAnswer; _i < _a.length; _i++) {
                var answerItem = _a[_i];
                var questionId = answerItem.questionId;
                var answer = answerItem.studentAnswer;
                studentAnswer.answer.set(questionId, answer);
            }
            var markScore = new MarkingScore(false, new Map());
            for (var _b = 0, _c = data.markScore; _b < _c.length; _b++) {
                var scoreItem = _c[_b];
                var questionId = scoreItem.questionId;
                var score = scoreItem.score;
                markScore.score.set(questionId, score);
            }
            return {
                spendTime: spendTime,
                studentAnswer: studentAnswer,
                markScore: markScore
            };
        })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.submitAssignmentInfo = function (data) {
        var url = environment.submitAssignmentInfoUrl;
        var body = JSON.stringify({
            'classId': data.classId,
            'assignmentId': data.assignmentId,
            'questionId': data.questionId,
            'studentId': data.studentId,
            'spendTime': data.spendTime,
            'studentAnswer': data.studentAnswer,
            'markScore': data.markScore
        });
        if (!data.spendTime && !data.studentAnswer && !data.markScore) {
            return Observable.of('');
        }
        console.log(body);
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) {
            console.log(resp.json());
        })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.getQuestionSpendTime = function (assignmentId, studentId) {
        var url = environment.getQuestionSpendTimeUrl;
        if (studentId && studentId.length > 0) {
            url = url + '/' + studentId + '/' + assignmentId;
        }
        else {
            url = url + '/' + this.httpService.getCurrentId() + '/' + assignmentId;
        }
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            return resp.json().spendTime;
        });
    };
    AssignmentService.prototype.getQuestionGroupById = function (assignmentId, questionGroupId) {
        var url = environment.getQuestionGroupByIdUrl;
        url = url + '/' + assignmentId + '/' + questionGroupId;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) {
            var questionGroup = new QuestionGroup(resp.json().questionGroup);
            return questionGroup;
        });
    };
    AssignmentService.prototype.getAssignmentGradeDetail = function (assignmentId, userId) {
        var url = environment.getAssignmentDetailUrl;
        if (!userId) {
            userId = this.httpService.getCurrentId();
        }
        url = url + '/' + userId + '/' + assignmentId;
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) { return resp.json().results; })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.addAssignmentToClass = function (classId, assignmentId) {
        var url = environment.addAssignmentToClassUrl;
        var body = JSON.stringify({
            'userId': this.httpService.getCurrentId(),
            'classId': classId,
            'assignmentId': assignmentId
        });
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json(); })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.createAssignment = function (assignmentName) {
        var url = environment.createAssignmentUrl;
        var body = JSON.stringify({
            'creator': this.httpService.getCurrentId(),
            'assignmentName': assignmentName
        });
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json().assignment; })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.getAssignmentById = function (assignmentId) {
        var url = environment.getAssignmentByIdUrl;
        url = url + '/' + assignmentId;
        console.log(url);
        return this.httpService.makeGetWithToken(url)
            .map(function (resp) { return resp.json(); })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.updateQuestionGroupContent = function (assignmentId, groupId, content) {
        var url = environment.updateQuestionGroupContentUrl;
        var body = JSON.stringify({
            'assignmentId': assignmentId,
            'groupId': groupId,
            'content': content
        });
        console.log('updating content:' + content);
        return this.httpService.makePutWithToken(url, body)
            .map(function (resp) { return resp.json(); })
            .catch(HttpService.handleError);
    };
    AssignmentService.prototype.addQuestionGroupToAssignment = function (assignmentId, type) {
        var url = environment.addQuestionGroupToAssignmentUrl;
        var body = JSON.stringify({
            'userId': this.httpService.getCurrentId(),
            'assignmentId': assignmentId,
            'type': type
        });
        return this.httpService.makePostWithToken(url, body)
            .map(function (resp) { return resp.json().questionGroup; })
            .catch(HttpService.handleError);
    };
    AssignmentService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], AssignmentService);
    return AssignmentService;
}());
export { AssignmentService };
