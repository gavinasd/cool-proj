import {Action} from "@ngrx/store";
import {Assignment} from "../../models/assignments/Assignment";
import {MarkingScore, SpendTime, StudentAnswer} from "../../models/assignments/AssignmentInfo";

export const FETCH =                '[ASSIGNMENT] FETCH';
export const FETCH_SUCCESS =        '[ASSIGNMENT] FETCH_SUCCESS';
export const FETCH_FAIL =           '[ASSIGNMENT] FETCH_FAIL';
export const FETCH_INFO =           '[ASSIGNMENT] FETCH_INFO';
export const FETCH_INFO_SUCCESS =   '[ASSIGNMENT] FETCH_INFO_SUCCESS';
export const FETCH_INFO_FAILURE =   '[ASSIGNMENT] FETCH_INFO_FAILURE';
export const SET_SPEND_TIME =       '[ASSIGNMENT] SET_SPEND_TIME';
export const SET_STUDENT_ANSWER =   '[ASSIGNMENT] SET_STUDENT_ANSWER';
export const SET_MARKING_SCORE =    '[ASSIGNMENT] SET_MARKING_SCORE';
export const NEXT =                 '[ASSIGNMENT] NEXT';
export const PRE =                  '[ASSIGNMENT] PRE';
export const SUBMIT =               '[ASSIGNMENT] SUBMIT';
export const SUBMIT_SUCCESS =       '[ASSIGNMENT] SUBMIT_SUCCESS';
export const SUBMIT_FAILURE =       '[ASSIGNMENT] SUBMIT_FAILURE';
export const SET_UNCOMPLETE =       '[ASSIGNMENT] SET_UNCOMPLETE';
export const SET_ASSIGNMENT_DONE =  '[ASSIGNMENT] SET_ASSIGNMENT_DONE';
export const RESET =                '[ASSIGNMENT] RESET';

export class FetchAssignmentAction implements Action{
	readonly type = FETCH;
	constructor(public payload:object){}
}

export class FetchAssignmentSuccessAction implements Action{
	readonly type = FETCH_SUCCESS;
	constructor(public payload:Assignment){}
}

export class FetchAssignmentFailureAction implements Action{
	readonly type = FETCH_FAIL;
	constructor(public errMessage: string){}
}

export class FetchInfoAction implements Action{
	readonly type = FETCH_INFO;
	constructor(public payload:object){}
}

export class FetchInfoSuccessAction implements Action{
	readonly type = FETCH_INFO_SUCCESS;
	constructor(public spendTime:SpendTime,
	            public studentAnswer: StudentAnswer,
				public markingScore: MarkingScore){}
}

export class FetchInfoFailureAction implements Action{
	readonly type = FETCH_INFO_FAILURE;
	constructor(public errMessage: string){}
}

export class SetSpendTimeAction implements Action{
	readonly type = SET_SPEND_TIME;
	constructor(public payload:number){}
}

export class SetStudentAnswerAction implements Action{
	readonly type = SET_STUDENT_ANSWER;
	constructor(public payload:string){}
}

export class SetMarkingScoreAction implements Action{
	readonly type = SET_MARKING_SCORE;
	constructor(public payload:number){}
}

export class NextAction implements Action{
	readonly type = NEXT;
	constructor(){}
}

export class PreAction implements Action{
	readonly type = PRE;
	constructor(){}
}

export class SubmitAction implements Action{
	readonly type = SUBMIT;
	constructor(public payload:object){}
}

export class SubmitSuccessAction implements Action{
	readonly type = SUBMIT_SUCCESS;
	constructor(){}
}

export class SubmitFailureAction implements Action{
	readonly type = SUBMIT_FAILURE;
	constructor(public payload: string){}
}

export class SetUnCompleteAction implements Action {
	readonly type = SET_UNCOMPLETE;
	constructor(){}
}

export class ResetAction implements Action{
	readonly type = RESET;
	constructor(){}
}

export type Actions
	= FetchAssignmentAction
	| FetchAssignmentSuccessAction
	| FetchAssignmentFailureAction
	| FetchInfoAction
	| FetchInfoSuccessAction
	| FetchInfoFailureAction
	| SetSpendTimeAction
	| SetStudentAnswerAction
	| SetMarkingScoreAction
	| NextAction
	| PreAction
	| SubmitAction
	| SubmitSuccessAction
	| SubmitFailureAction
	| SetUnCompleteAction
	| ResetAction;



