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
			return Object.assign({}, initialState, state, {
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
				.questionList[state.currentQuestionIndex].questionId;
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
				.questionList[state.currentQuestionIndex].questionId;
			let newScore = state.markScore.score;
			newScore.set(currentQuestionId, (<AssignmentAction.SetMarkingScoreAction>action).payload);

			return Object.assign({}, state, {
				markScore: Object.assign({}, state.markScore, {
					changed: true,
					score: newScore
				})
			});
		}

		case AssignmentAction.NEXT:{
			//先把当前的group给找出来
			let currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];
			let content = currentGroup && currentGroup.content || '{}';

			const contentLength = getGroupContentLength(state.assignment);
			//如果这个group的contentIndex没有超过content的key的长度
			if(currentGroup.content && state.currentContentIndex < contentLength){
				return Object.assign({}, state, {
					//把contentIndex+1
					currentContentIndex: state.currentContentIndex + 1
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
			let content = currentGroup && currentGroup.content || '{}';
			const contentLength = Object.keys(JSON.parse(content)).length;
			const skipContent = (<AssignmentAction.PreAction>action).skipContent;

			//直接把questionIndex减1
			if(state.currentQuestionIndex > 0 ){
				return Object.assign({}, state, {
					currentQuestionIndex: state.currentQuestionIndex - 1,
					complete: false
				});
			}
			//如果这个group的content已经显示过，并且group里面有content需要展示
			else if(state.currentContentIndex <= contentLength && state.currentContentIndex > 0
				&& currentGroup.content && currentGroup.content.length > 0 ){
				//如果需要跳过content，并且前面还有group
				if(skipContent && state.currentGroupIndex > 0) {
					return Object.assign({}, state, {
						currentGroupIndex: state.currentGroupIndex - 1,
						currentContentIndex: Object.keys(JSON.parse(    //设置为已经显示过content
							state.assignment.questionGroupList[state.currentGroupIndex-1].content)).length,
						currentQuestionIndex: state.assignment.questionGroupList[state.currentGroupIndex-1]
							.questionList.length-1,         //questionIndex去到上一个group中的最后一个
						complete: false
					});
				}
				if(!skipContent){
					return Object.assign({}, state, {
						//把contentIndex-1, 下次需要显示
						currentContentIndex: state.currentContentIndex - 1,
						complete: false
					});
				}
			}
			//需要group少1位
			else if (state.currentGroupIndex > 0){
				return Object.assign({}, state, {
					currentGroupIndex: state.currentGroupIndex - 1,
					currentContentIndex: Object.keys(JSON.parse(    //设置为已经显示过content
						state.assignment.questionGroupList[state.currentGroupIndex-1].content)).length,
					currentQuestionIndex: state.assignment.questionGroupList[state.currentGroupIndex-1]
						.questionList.length-1,         //questionIndex去到上一个group中的最后一个
					complete: false
				});
			}

			return state;
		}

		case AssignmentAction.SKIP_CONTENT:{
			//先把当前的group给找出来
			let currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];
			let content = currentGroup && currentGroup.content || '{}';

			const contentLength = Object.keys(JSON.parse(content)).length;
			return Object.assign({}, state, {
				currentContentIndex: contentLength
			});
		}

		case AssignmentAction.SKIP_TO_QUESTION:{
			const groupIndex = (<AssignmentAction.SkipToQuestionAction>action).groupIndex;
			const questionIndex = (<AssignmentAction.SkipToQuestionAction>action).questionIndex;

			const currentGroup = state.assignment.questionGroupList[groupIndex];
			const content = currentGroup && currentGroup.content || '{}';
			const contentLength = getGroupContentLength(state.assignment);
			const questionListLength = currentGroup.questionList.length;
			if(questionIndex >= questionListLength || questionIndex < 0){
				return state;
			}

			else {
				return Object.assign({}, state, {
					currentGroupIndex: groupIndex,
					currentContentIndex: contentLength,
					currentQuestionIndex: questionIndex
				})
			}

		}

		case AssignmentAction.FETCH:
		case AssignmentAction.FETCH_INFO:
		case AssignmentAction.SUBMIT:{
			return Object.assign({}, state, {
				loading: true
			});
		}

		case AssignmentAction.SET_UNCOMPLETE:{
			return Object.assign({}, state, {
				complete: false
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

const getGroupContentLength = (assignment:Assignment)=>{
	return Assignment.getGroupContentLength(assignment.assignmentType);
};

export const getAssignment = (state: State) => state.assignment;

export const getAssignmentName = createSelector(getAssignment, (assignment) => assignment.assignmentName);

export const getAssignmentScoreList = (state:State) => {
	let scoreList : any[] = [];
	if(!state || !state.assignment){
		return scoreList;
	}

	let groupIndex = 0;
	for(let group of state.assignment.questionGroupList){
		let questionIndex = 0;

		for(let question of group.questionList){
			if(!state.markScore){
				continue;
			}
			let score = state.markScore.score.get(question.questionId) || 0;
			let scoreItem = {
				'groupIndex':groupIndex,
				'questionIndex': questionIndex,
				'correct': score == question.score
			};
			scoreList.push(scoreItem);
			questionIndex ++;
		}
		groupIndex ++ ;
	}
	return scoreList;
};

export const getCurrentQuestionGroup = (state: State) => state.assignment.questionGroupList[state.currentGroupIndex];

export const getCurrentGroupContent = (state: State) => {
	const currentGroup = state.assignment.questionGroupList[state.currentGroupIndex];
	const content = currentGroup && currentGroup.content || '';
	return content;
};

export const getCurrentContentIndex = (state: State) =>{
	return state.currentContentIndex;
};

export const shouldShowContent = (state:State) => {
	let content = getCurrentGroupContent(state);
	let contentIndex = getCurrentContentIndex(state);
	let contentLength = getGroupContentLength(state.assignment);

	if(content && content.length > 0){
		if(contentIndex < contentLength){
			return true;
		}
	}
	return false;
};

export const getCurrentQuestion = (state: State ) => {

	return state.assignment.questionGroupList[state.currentGroupIndex] &&
		state.assignment.questionGroupList[state.currentGroupIndex].questionList[state.currentQuestionIndex];
};

export const getStudentAnswer = (state: State) =>{
	const questionId = state.assignment.questionGroupList[state.currentGroupIndex] &&
		state.assignment.questionGroupList[state.currentGroupIndex].questionList[state.currentQuestionIndex].questionId;
	if(!state.studentAnswer){
		return '';
	}
	return state.studentAnswer.answer.get(questionId) || '';
};

export const getMarkScore = (state: State) =>{
	const questionId = state.assignment.questionGroupList[state.currentGroupIndex] &&
		state.assignment.questionGroupList[state.currentGroupIndex].questionList[state.currentQuestionIndex].questionId;

	if(!state.markScore){
		return 0;
	}
	return state.markScore.score.get(questionId) || 0;
};

//Fetch成功之前的值是-1，表示这里并没有fetch成功
export const getSpendTime = (state: State) =>{
	return state.spendTime?state.spendTime.time : -1;
};
