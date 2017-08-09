import * as fromAssignment from './assignment/assignment.reducers';
import { createFeatureSelector, createSelector } from "@ngrx/store";
export var reducers = {
    assignment: fromAssignment.reducer
};
export var getAssignmentState = createFeatureSelector('assignment');
export var getAssignment = createSelector(getAssignmentState, fromAssignment.getAssignment);
export var getAssignmentName = createSelector(getAssignmentState, fromAssignment.getAssignmentName);
export var getAssignmentSpendTime = createSelector(getAssignmentState, fromAssignment.getSpendTime);
export var getCurrentGroup = createSelector(getAssignmentState, fromAssignment.getCurrentQuestionGroup);
export var getGroupType = createSelector(getCurrentGroup, function (group) { return group ? group.type : ''; });
export var getGroupContent = createSelector(getAssignmentState, fromAssignment.getCurrentGroupContent);
export var shouldShowContent = createSelector(getGroupContent, function (content) { return content && content.length > 0 ? true : false; });
export var getQuestionIndex = createSelector(getAssignmentState, function (state) { return state.currentQuestionIndex; });
export var getCurrentQuestion = createSelector(getAssignmentState, fromAssignment.getCurrentQuestion);
export var getQuestionListLength = createSelector(getCurrentGroup, function (group) { return group ? group.questionList.length : 0; });
export var getLastAnswer = createSelector(getAssignmentState, fromAssignment.getStudentAnswer);
export var getMarkingScore = createSelector(getAssignmentState, fromAssignment.getMarkScore);
export var getLoading = createSelector(getAssignmentState, function (state) { return state.loading; });
export var getComplete = createSelector(getAssignmentState, function (state) { return state.complete; });
export var getErrMessage = createSelector(getAssignmentState, function (state) { return state.errMessage; });
