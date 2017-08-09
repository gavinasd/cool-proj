import { Assignment } from "../../models/assignments/Assignment";
import './assignment.actions';
import * as AssignmentAction from "./assignment.actions";
import { createSelector } from "@ngrx/store";
export var initialState = {
    assignment: new Assignment({}),
    currentGroupIndex: 0,
    currentContentIndex: 0,
    currentQuestionIndex: 0,
    spendTime: null,
    studentAnswer: null,
    markScore: null,
    loading: false,
    errMessage: null,
    complete: false
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case AssignmentAction.FETCH_SUCCESS: {
            return Object.assign({}, initialState, {
                loading: false,
                assignment: action.payload
            });
        }
        case AssignmentAction.FETCH_FAIL: {
            var message = action.errMessage;
            return Object.assign({}, state, {
                loading: false,
                errMessage: message
            });
        }
        case AssignmentAction.FETCH_INFO_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                spendTime: action.spendTime,
                studentAnswer: action.studentAnswer,
                markScore: action.markingScore
            });
        }
        case AssignmentAction.FETCH_INFO_FAILURE: {
            var message = action.errMessage;
            return Object.assign({}, state, {
                loading: false,
                errMessage: message
            });
        }
        case AssignmentAction.SUBMIT_SUCCESS: {
            return Object.assign({}, state, {
                loading: false
            });
        }
        case AssignmentAction.SUBMIT_FAILURE: {
            console.log(action.payload);
            return Object.assign({}, state, {
                loading: false,
                errMessage: action.payload
            });
        }
        case AssignmentAction.SET_SPEND_TIME: {
            var spendTime = Object.assign({}, state.spendTime, {
                changed: true,
                time: action.payload
            });
            return Object.assign({}, state, {
                spendTime: spendTime
            });
        }
        case AssignmentAction.SET_STUDENT_ANSWER: {
            var currentQuestionId = state.assignment.questionGroupList[state.currentGroupIndex]
                .questionList[state.currentQuestionIndex].id;
            var newAnswer = state.studentAnswer.answer;
            newAnswer.set(currentQuestionId, action.payload);
            return Object.assign({}, state, {
                studentAnswer: Object.assign({}, state.studentAnswer, {
                    changed: true,
                    answer: newAnswer
                })
            });
        }
        case AssignmentAction.SET_MARKING_SCORE: {
            var currentQuestionId = state.assignment.questionGroupList[state.currentGroupIndex]
                .questionList[state.currentQuestionIndex].id;
            var newScore = state.markScore.score;
            newScore.set(currentQuestionId, action.payload);
            return Object.assign({}, state, {
                studentAnswer: Object.assign({}, state.markScore, {
                    changed: true,
                    score: newScore
                })
            });
        }
        case AssignmentAction.NEXT: {
            var currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];
            if (state.currentContentIndex == 0 && currentGroup.content && currentGroup.content.length > 0) {
                return Object.assign({}, state, {
                    currentContentIndex: 1
                });
            }
            var questionListLength = currentGroup.questionList.length;
            if (state.currentQuestionIndex < questionListLength - 1) {
                return Object.assign({}, state, {
                    currentQuestionIndex: state.currentQuestionIndex + 1
                });
            }
            else if (state.currentQuestionIndex == questionListLength - 1
                && state.currentGroupIndex < state.assignment.questionGroupList.length - 1) {
                return Object.assign({}, state, {
                    currentGroupIndex: state.currentGroupIndex + 1,
                    currentContentIndex: 0,
                    currentQuestionIndex: 0
                });
            }
            else if (state.currentQuestionIndex == questionListLength - 1
                && state.currentGroupIndex == state.assignment.questionGroupList.length - 1) {
                return Object.assign({}, state, {
                    complete: true
                });
            }
            return state;
        }
        case AssignmentAction.PRE: {
            var currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];
            if (state.currentQuestionIndex > 0) {
                return Object.assign({}, state, {
                    currentQuestionIndex: state.currentQuestionIndex - 1
                });
            }
            else if (state.currentContentIndex == 1 && currentGroup.content && currentGroup.content.length > 0) {
                return Object.assign({}, state, {
                    currentContentIndex: 0
                });
            }
            else if (state.currentQuestionIndex == 0 && state.currentGroupIndex > 0) {
                return Object.assign({}, state, {
                    currentGroupIndex: state.currentGroupIndex - 1,
                    currentContentIndex: 1,
                    currentQuestionIndex: state.assignment.questionGroupList[state.currentGroupIndex - 1]
                        .questionList.length - 1
                });
            }
            return state;
        }
        case AssignmentAction.FETCH:
        case AssignmentAction.FETCH_INFO:
        case AssignmentAction.SUBMIT: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case AssignmentAction.RESET: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
export var getAssignment = function (state) { return state.assignment; };
export var getAssignmentName = createSelector(getAssignment, function (assignment) { return assignment.assignmentName; });
export var getCurrentQuestionGroup = function (state) { return state.assignment.questionGroupList[state.currentGroupIndex]; };
export var getCurrentGroupContent = function (state) {
    if (state.currentContentIndex == 0 && state.assignment.questionGroupList.length > 0) {
        return state.assignment.questionGroupList[state.currentGroupIndex].content;
    }
    else {
        return '';
    }
};
export var getCurrentQuestion = function (state) {
    return state.assignment.questionGroupList[state.currentGroupIndex]
        .questionList[state.currentQuestionIndex];
};
export var getStudentAnswer = function (state) {
    var questionId = state.assignment.questionGroupList[state.currentGroupIndex]
        .questionList[state.currentQuestionIndex].id;
    if (!state.studentAnswer) {
        return '';
    }
    return state.studentAnswer.answer.get(questionId) || '';
};
export var getMarkScore = function (state) {
    var questionId = state.assignment.questionGroupList[state.currentGroupIndex]
        .questionList[state.currentQuestionIndex].id;
    if (!state.markScore) {
        return 0;
    }
    return state.markScore.score.get(questionId) || 0;
};
export var getSpendTime = function (state) { return state.spendTime ? state.spendTime.time : -1; };
