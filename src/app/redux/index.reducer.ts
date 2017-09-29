import * as fromAssignment from './assignment/assignment.reducers';
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";


export interface ApplicationState {
	assignment: fromAssignment.State
}

export const reducers: ActionReducerMap<ApplicationState> = {
	assignment: fromAssignment.reducer
};

export const getAssignmentState = createFeatureSelector<fromAssignment.State>('assignment');
export const getAssignment = createSelector(getAssignmentState, fromAssignment.getAssignment);
export const getAssignmentName = createSelector(getAssignmentState, fromAssignment.getAssignmentName);
export const getAssignmentSpendTime = createSelector(getAssignmentState, fromAssignment.getSpendTime);
export const getAssignmentScoreList = createSelector(getAssignmentState, fromAssignment.getAssignmentScoreList);

export const getCurrentGroupIndex = createSelector(getAssignmentState, (state)=> state.currentGroupIndex);
export const getCurrentGroup = createSelector(getAssignmentState, fromAssignment.getCurrentQuestionGroup);
export const getGroupType = createSelector(getCurrentGroup, (group) =>group?group.type:'');
export const getGroupContent = createSelector(getAssignmentState, fromAssignment.getCurrentGroupContent);
export const getContentIndex = createSelector(getAssignmentState, fromAssignment.getCurrentContentIndex);
export const shouldShowContent = createSelector(getAssignmentState, fromAssignment.shouldShowContent);

export const getQuestionIndex = createSelector(getAssignmentState, (state) => state.currentQuestionIndex);
export const getCurrentQuestion = createSelector(getAssignmentState, fromAssignment.getCurrentQuestion);
export const getCurrentQuestionType = createSelector(getCurrentQuestion, (question)=>question?question.questionType:'');
export const getQuestionListLength = createSelector(getCurrentGroup, (group) =>group?group.questionList.length:0);
export const getLastAnswer = createSelector(getAssignmentState,fromAssignment.getStudentAnswer);
export const getMarkingScore = createSelector(getAssignmentState, fromAssignment.getMarkScore);

export const getLoading = createSelector(getAssignmentState, (state) => state.loading);
export const getComplete = createSelector(getAssignmentState, (state) => state.complete);
export const getErrMessage = createSelector(getAssignmentState, (state) => state.errMessage);