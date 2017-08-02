import {Assignment} from "../../models/assignments/Assignment";
import './assignment.actions';
import * as AssignmentAction from "./assignment.actions";
import {createSelector} from "@ngrx/store";
import {MarkingScore, SpendTime, StudentAnswer} from "../../models/assignments/AssignmentInfo";

export interface State{
	assignment: Assignment;
	currentGroupIndex: number;
	currentContentIndex: number;
	currentQuestionIndex: number;
	spendTime: SpendTime;
	studentAnswer: StudentAnswer;
	markScore: MarkingScore;

	loading: boolean;
	errMessage: string;
	complete: boolean;
}

export const initialState: State = {
	assignment: new Assignment({}),
	currentGroupIndex: 0,
	currentContentIndex: 0,
	currentQuestionIndex: 0,
	spendTime: null,
	studentAnswer: null,
	markScore: null,

	loading: false,         //当与服务器发包的时候，loading设置为true，完成的时候为false
	errMessage:null,        //如果和服务器沟通的时候发生了错误，错误信息存储在这里
	complete:false          //Next到了最后一题就设置complete为true -> 这时就跳转
};

export function reducer(state:State = initialState, action: AssignmentAction.Actions ): State {
	switch (action.type){
		case AssignmentAction.FETCH_SUCCESS:{
			return Object.assign({}, initialState, {
				loading: false,
				assignment: (<AssignmentAction.FetchAssignmentSuccessAction>action).payload
			});
		}

		case AssignmentAction.FETCH_FAIL:{
			let message = (<AssignmentAction.FetchAssignmentFailureAction>action).errMessage;
			return Object.assign({}, state, {
				loading: false,
				errMessage: message
			});
		}

		case AssignmentAction.FETCH_INFO_SUCCESS: {
			return Object.assign({}, state, {
				loading: false,
				spendTime: (<AssignmentAction.FetchInfoSuccessAction>action).spendTime,
				studentAnswer: (<AssignmentAction.FetchInfoSuccessAction>action).studentAnswer,
				markScore: (<AssignmentAction.FetchInfoSuccessAction>action).markingScore
			});
		}

		case AssignmentAction.FETCH_INFO_FAILURE: {
			let message = (<AssignmentAction.FetchInfoFailureAction>action).errMessage;
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
			console.log((<AssignmentAction.SubmitFailureAction>action).payload);
			return Object.assign({}, state, {
				loading: false,
				errMessage: (<AssignmentAction.SubmitFailureAction>action).payload
			});
		}

		case AssignmentAction.SET_SPEND_TIME:{
			let spendTime = Object.assign({}, state.spendTime, {
				changed: true,
				time: (<AssignmentAction.SetSpendTimeAction>action).payload
			});
			return Object.assign({}, state, {
				spendTime: spendTime
			});
		}

		case AssignmentAction.SET_STUDENT_ANSWER:{
			const currentQuestionId = state.assignment.questionGroupList[state.currentGroupIndex]
				.questionList[state.currentQuestionIndex].id;
			let newAnswer = state.studentAnswer.answer;
			newAnswer.set(currentQuestionId, (<AssignmentAction.SetStudentAnswerAction>action).payload);

			return Object.assign({}, state, {
				studentAnswer: Object.assign({}, state.studentAnswer, {
					changed: true,
					answer: newAnswer
				})
			});
		}

		case AssignmentAction.SET_MARKING_SCORE:{
			const currentQuestionId = state.assignment.questionGroupList[state.currentGroupIndex]
				.questionList[state.currentQuestionIndex].id;
			let newScore = state.markScore.score;
			newScore.set(currentQuestionId, (<AssignmentAction.SetMarkingScoreAction>action).payload);

			return Object.assign({}, state, {
				studentAnswer: Object.assign({}, state.markScore, {
					changed: true,
					score: newScore
				})
			});
		}

		case AssignmentAction.NEXT:{
			//先把当前的group给找出来
			let currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];

			//如果这个group的content从来没有显示过，并且group里面有content需要展示
			if(state.currentContentIndex == 0 && currentGroup.content && currentGroup.content.length > 0){
				return Object.assign({}, state, {
					//把contentIndex设置为1，意思就是已经显示过这里的content了，下次无需再显示
					currentContentIndex: 1
				});

			}

			let questionListLength = currentGroup.questionList.length;
			//直接把questionIndex加1
			if(state.currentQuestionIndex < questionListLength -1 ){
				return Object.assign({}, state, {
					currentQuestionIndex: state.currentQuestionIndex + 1
				});
			}
			//需要进位
			else if (state.currentQuestionIndex == questionListLength -1
				&& state.currentGroupIndex < state.assignment.questionGroupList.length - 1){
				return Object.assign({}, state, {
					currentGroupIndex: state.currentGroupIndex + 1,
					currentContentIndex: 0,
					currentQuestionIndex: 0
				});
			}
			//已经到了最后一题，把complete设置为true，直接跳转
			else if (state.currentQuestionIndex == questionListLength - 1
				&& state.currentGroupIndex == state.assignment.questionGroupList.length -1){
				return Object.assign({}, state, {
					complete:true
				});
			}

			return state;
		}

		case AssignmentAction.PRE:{
			//先把当前的group给找出来
			let currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];

			//直接把questionIndex减1
			if(state.currentQuestionIndex > 0 ){
				return Object.assign({}, state, {
					currentQuestionIndex: state.currentQuestionIndex - 1
				});
			}
			//如果这个group的content已经显示过，并且group里面有content需要展示
			else if(state.currentContentIndex == 1 && currentGroup.content && currentGroup.content.length > 0){
				return Object.assign({}, state, {
					//把contentIndex设置为0，意思就是没有显示过这里的content了，下次需要显示
					currentContentIndex: 0
				});
			}
			//需要group少1位
			else if (state.currentQuestionIndex == 0 && state.currentGroupIndex > 0){
				return Object.assign({}, state, {
					currentGroupIndex: state.currentGroupIndex - 1,
					currentContentIndex: 1,             //设置为已经显示过content
					currentQuestionIndex: state.assignment.questionGroupList[state.currentGroupIndex-1]
						.questionList.length-1          //quesitonIndex去到上一个group中的最后一个
				});
			}

			return state;
		}

		case AssignmentAction.FETCH:
		case AssignmentAction.FETCH_INFO:
		case AssignmentAction.SUBMIT:{
			return Object.assign({}, state, {
				loading: true
			});
		}

		case AssignmentAction.RESET:{
			return initialState;
		}

		default:{
			return state;
		}
	}
}

export const getAssignment = (state: State) => state.assignment;

export const getAssignmentName = createSelector(getAssignment, (assignment) => assignment.assignmentName);

export const getCurrentQuestionGroup = (state: State) => state.assignment.questionGroupList[state.currentGroupIndex];

export const getCurrentGroupContent = (state: State) => {
	if(state.currentContentIndex == 0 && state.assignment.questionGroupList.length > 0){
		return state.assignment.questionGroupList[state.currentGroupIndex].content;
	}
	else {
		return '';
	}
};

export const getCurrentQuestion = (state: State ) => {
	return state.assignment.questionGroupList[state.currentGroupIndex]
		.questionList[state.currentQuestionIndex];
};

export const getStudentAnswer = (state: State) =>{
	const questionId = state.assignment.questionGroupList[state.currentGroupIndex]
		.questionList[state.currentQuestionIndex].id;
	if(!state.studentAnswer){
		return '';
	}
	return state.studentAnswer.answer.get(questionId) || '';
};

export const getMarkScore = (state: State) =>{
	const questionId = state.assignment.questionGroupList[state.currentGroupIndex]
		.questionList[state.currentQuestionIndex].id;

	if(!state.markScore){
		return 0;
	}
	return state.markScore.score.get(questionId) || 0;
};

//Fetch成功之前的值是-1，表示这里并没有fetch成功
export const getSpendTime = (state: State) => state.spendTime?state.spendTime.time : -1;
