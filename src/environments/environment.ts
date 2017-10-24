// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    getWordPronunciationUrl:'http://dict.youdao.com/dictvoice?audio',
    loginUrl: 'http://localhost:3000/api/login',
    registerUrl: 'http://localhost:3000/api/register',
    createClassUrl: 'http://localhost:3000/api/classes',
    addResourceUrl: 'http://localhost:3000/api/resource/addResource',
    getClassDetailUrl: 'http://localhost:3000/api/classes/detail',
	getQuestionGroupListUrl: 'http://localhost:3000/api/question',
    getQuestionGroupByIdUrl: 'http://localhost:3000/api/question/group',
    addResponseUrlToQuestionUrl: 'http://localhost:3000/api/question/addResponse',
	addMarkingScoreUrl:'http://localhost:3000/api/question/addScore',
	addQuestionToGroupUrl: 'http://localhost:3000/api/classes/addQuestion',
    getAssignmentListUrl: 'http://localhost:3000/api/classes/getAssignmentList',
    getClassListUrl : 'http://localhost:3000/api/classes',
    getAllAssignmentListUrl : 'http://localhost:3000/api/assignment',
    searchClassUrl : 'http://localhost:3000/api/classes/search',
    addStudentUrl : 'http://localhost:3000/api/classes/addStudent',
    addTeacherUrl : 'http://localhost:3000/api/classes/addTeacher',
    getAssignmentByIdUrl : 'http://localhost:3000/api/assignment/assignmentId',
    getAssignmentDetailUrl : 'http://localhost:3000/api/assignment/detail',
    addAssignmentToClassUrl : 'http://localhost:3000/api/classes/addAssignment',
    getClassAllUserUrl : 'http://localhost:3000/api/classes/user',
	createAssignmentUrl : 'http://localhost:3000/api/assignment/createone',
	updateQuestionGroupContentUrl : 'http://localhost:3000/api/assignment/content',
	addQuestionGroupToAssignmentUrl : 'http://localhost:3000/api/assignment/addQuestionGroup',
	getQuestionLastAnswerUrl: 'http://localhost:3000/api/question/lastAnswer',
	getQuestionMarkingScoreUrl: 'http://localhost:3000/api/question/markingScore',
	getQuestionSpendTimeUrl: 'http://localhost:3000/api/question/spendTime',
	getAssignmentInfoUrl: 'http://localhost:3000/api/assignment/info',
	submitAssignmentInfoUrl: 'http://localhost:3000/api/assignment/info',
	submitAssignmentDoneUrl: 'http://localhost:3000/api/assignment/done',
	uploadSpeakingRecordUrl: 'http://localhost:3000/api/upload/record',
	studentRecordUrl: 'http://localhost:3000/uploads/',
	teacherEditorOptions: {
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen','bold','italic','strikeThrough','color',],
		colorsText:['#d71345','#f58220','#ffe600','#bed742','#1d953f','#2b4490','#000000'],
		height: 500,
		quickInsertTags: [],
		spellcheck: true,
	},
	studentEditorOptions:{
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: [],
		height: 500,
		quickInsertTags: [],
		spellcheck: false,
		events: {
			'froalaEditor.initialized': function (e, editor) {
				console.log(editor.toolbar.hide());
			}
		}
	}
};
