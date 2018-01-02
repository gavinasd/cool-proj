// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    getWordPronunciationUrl:'http://dict.youdao.com/dictvoice?audio',
	/**
	 * 登录注册接口
	 */
    loginUrl: 'http://localhost:3000/api/login',
    registerUrl: 'http://localhost:3000/api/register',

	/**
	 * 班级class接口
	 */
	getClassListUrl : 'http://localhost:3000/api/classes/list',
	createClassUrl: 'http://localhost:3000/api/classes/create',
	getClassDetailUrl: 'http://localhost:3000/api/classes/detail',
	getClassAllUserUrl : 'http://localhost:3000/api/classes/user',
	//搜索班级
	searchClassUrl : 'http://localhost:3000/api/classes/search',
	//添加老师/学生
	addStudentUrl : 'http://localhost:3000/api/classes/addStudent',
	addTeacherUrl : 'http://localhost:3000/api/classes/addTeacher',
	//添加/获取 班级里面的作业列表
	addAssignmentToClassUrl : 'http://localhost:3000/api/classes/addAssignment',
	getAssignmentListInClassUrl: 'http://localhost:3000/api/classes/getAssignmentList',

	/**
	 * 作业assignment的接口
	 */
	//获取作业
	getAssignmentByIdUrl : 'http://localhost:3000/api/assignment/id',
	getAllAssignmentListUrl : 'http://localhost:3000/api/assignment',
	//获取学生的做题信息，学生提交作业
	getAssignmentInfoUrl: 'http://localhost:3000/api/assignment/info',
	submitAssignmentInfoUrl: 'http://localhost:3000/api/assignment/info',
	submitAssignmentDoneUrl: 'http://localhost:3000/api/assignment/done',
	//编辑一份新的作业，包括创建作业，添加group，添加question，更新groupContent
	createAssignmentUrl : 'http://localhost:3000/api/assignment/create',
	addQuestionGroupToAssignmentUrl : 'http://localhost:3000/api/assignment/addQuestionGroup',
	addQuestionToGroupUrl: 'http://localhost:3000/api/assignment/addQuestion',
	updateQuestionGroupContentUrl : 'http://localhost:3000/api/assignment/content',
	updateQuestionUrl : 'http://localhost:3000/api/assignment/updateQuestion',
	deleteGroupUrl : 'http://localhost:3000/api/assignment/deleteGroup',
	deleteQuestionUrl : 'http://localhost:3000/api/assignment/deleteQuestion',


	addResourceUrl: 'http://localhost:3000/api/resource/addResource',
	getQuestionGroupByIdUrl: 'http://localhost:3000/api/question/group',
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
	},
	editQuestionOptions:{
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen', 'fontFamily', 'fontSize','bold','italic','strikeThrough','align','color',],
		colorsText:['#d71345','#f58220','#ffe600','#bed742','#1d953f','#2b4490','#000000'],
		height: 500,
		quickInsertTags: [],
		spellcheck: true,
	}
};
