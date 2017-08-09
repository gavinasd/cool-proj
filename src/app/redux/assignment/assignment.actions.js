export var FETCH = '[ASSIGNMENT] FETCH';
export var FETCH_SUCCESS = '[ASSIGNMENT] FETCH_SUCCESS';
export var FETCH_FAIL = '[ASSIGNMENT] FETCH_FAIL';
export var FETCH_INFO = '[ASSIGNMENT] FETCH_INFO';
export var FETCH_INFO_SUCCESS = '[ASSIGNMENT] FETCH_INFO_SUCCESS';
export var FETCH_INFO_FAILURE = '[ASSIGNMENT] FETCH_INFO_FAILURE';
export var SET_SPEND_TIME = '[ASSIGNMENT] SET_SPEND_TIME';
export var SET_STUDENT_ANSWER = '[ASSIGNMENT] SET_STUDENT_ANSWER';
export var SET_MARKING_SCORE = '[ASSIGNMENT] SET_MARKING_SCORE';
export var NEXT = '[ASSIGNMENT] NEXT';
export var PRE = '[ASSIGNMENT] PRE';
export var SUBMIT = '[ASSIGNMENT] SUBMIT';
export var SUBMIT_SUCCESS = '[ASSIGNMENT] SUBMIT_SUCCESS';
export var SUBMIT_FAILURE = '[ASSIGNMENT] SUBMIT_FAILURE';
export var RESET = '[ASSIGNMENT] RESET';
var FetchAssignmentAction = (function () {
    function FetchAssignmentAction(payload) {
        this.payload = payload;
        this.type = FETCH;
    }
    return FetchAssignmentAction;
}());
export { FetchAssignmentAction };
var FetchAssignmentSuccessAction = (function () {
    function FetchAssignmentSuccessAction(payload) {
        this.payload = payload;
        this.type = FETCH_SUCCESS;
    }
    return FetchAssignmentSuccessAction;
}());
export { FetchAssignmentSuccessAction };
var FetchAssignmentFailureAction = (function () {
    function FetchAssignmentFailureAction(errMessage) {
        this.errMessage = errMessage;
        this.type = FETCH_FAIL;
    }
    return FetchAssignmentFailureAction;
}());
export { FetchAssignmentFailureAction };
var FetchInfoAction = (function () {
    function FetchInfoAction(payload) {
        this.payload = payload;
        this.type = FETCH_INFO;
    }
    return FetchInfoAction;
}());
export { FetchInfoAction };
var FetchInfoSuccessAction = (function () {
    function FetchInfoSuccessAction(spendTime, studentAnswer, markingScore) {
        this.spendTime = spendTime;
        this.studentAnswer = studentAnswer;
        this.markingScore = markingScore;
        this.type = FETCH_INFO_SUCCESS;
    }
    return FetchInfoSuccessAction;
}());
export { FetchInfoSuccessAction };
var FetchInfoFailureAction = (function () {
    function FetchInfoFailureAction(errMessage) {
        this.errMessage = errMessage;
        this.type = FETCH_INFO_FAILURE;
    }
    return FetchInfoFailureAction;
}());
export { FetchInfoFailureAction };
var SetSpendTimeAction = (function () {
    function SetSpendTimeAction(payload) {
        this.payload = payload;
        this.type = SET_SPEND_TIME;
    }
    return SetSpendTimeAction;
}());
export { SetSpendTimeAction };
var SetStudentAnswerAction = (function () {
    function SetStudentAnswerAction(payload) {
        this.payload = payload;
        this.type = SET_STUDENT_ANSWER;
    }
    return SetStudentAnswerAction;
}());
export { SetStudentAnswerAction };
var SetMarkingScoreAction = (function () {
    function SetMarkingScoreAction(payload) {
        this.payload = payload;
        this.type = SET_MARKING_SCORE;
    }
    return SetMarkingScoreAction;
}());
export { SetMarkingScoreAction };
var NextAction = (function () {
    function NextAction() {
        this.type = NEXT;
    }
    return NextAction;
}());
export { NextAction };
var PreAction = (function () {
    function PreAction() {
        this.type = PRE;
    }
    return PreAction;
}());
export { PreAction };
var SubmitAction = (function () {
    function SubmitAction(payload) {
        this.payload = payload;
        this.type = SUBMIT;
    }
    return SubmitAction;
}());
export { SubmitAction };
var SubmitSuccessAction = (function () {
    function SubmitSuccessAction() {
        this.type = SUBMIT_SUCCESS;
    }
    return SubmitSuccessAction;
}());
export { SubmitSuccessAction };
var SubmitFailureAction = (function () {
    function SubmitFailureAction(payload) {
        this.payload = payload;
        this.type = SUBMIT_FAILURE;
    }
    return SubmitFailureAction;
}());
export { SubmitFailureAction };
var ResetAction = (function () {
    function ResetAction() {
        this.type = RESET;
    }
    return ResetAction;
}());
export { ResetAction };
