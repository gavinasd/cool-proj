export const environment = {
	production: false,
	getWordPronunciationUrl:'http://dict.youdao.com/dictvoice?audio',
	/**
	 * 登录注册接口
	 */
	loginUrl: 'http://123.207.109.53:3000/api/login',
	registerUrl: 'http://123.207.109.53:3000/api/register',

	/**
	 * 班级class接口
	 */
	getClassListUrl : 'http://123.207.109.53:3000/api/classes/list',
	createClassUrl: 'http://123.207.109.53:3000/api/classes/create',
	getClassDetailUrl: 'http://123.207.109.53:3000/api/classes/detail',
	getClassAllUserUrl : 'http://123.207.109.53:3000/api/classes/user',
	//搜索班级
	searchClassUrl : 'http://123.207.109.53:3000/api/classes/search',
	//添加老师/学生
	addStudentUrl : 'http://123.207.109.53:3000/api/classes/addStudent',
	addTeacherUrl : 'http://123.207.109.53:3000/api/classes/addTeacher',
	//添加/获取 班级里面的作业列表
	addAssignmentToClassUrl : 'http://123.207.109.53:3000/api/classes/addAssignment',
	getAssignmentListInClassUrl: 'http://123.207.109.53:3000/api/classes/getAssignmentList',

	/**
	 * 作业assignment的接口
	 */
	//获取作业
	getAssignmentByIdUrl : 'http://123.207.109.53:3000/api/assignment/id',
	getAllAssignmentListUrl : 'http://123.207.109.53:3000/api/assignment',
	//获取学生的做题信息，学生提交作业
	getAssignmentInfoUrl: 'http://123.207.109.53:3000/api/assignment/info',
	submitAssignmentInfoUrl: 'http://123.207.109.53:3000/api/assignment/info',
	submitAssignmentDoneUrl: 'http://123.207.109.53:3000/api/assignment/done',
	//编辑一份新的作业，包括创建作业，添加group，添加question，更新groupContent
	createAssignmentUrl : 'http://123.207.109.53:3000/api/assignment/create',
	addQuestionGroupToAssignmentUrl : 'http://123.207.109.53:3000/api/assignment/addQuestionGroup',
	addQuestionToGroupUrl: 'http://123.207.109.53:3000/api/assignment/addQuestion',
	updateQuestionGroupContentUrl : 'http://123.207.109.53:3000/api/assignment/content',
	updateQuestionUrl : 'http://123.207.109.53:3000/api/assignment/updateQuestion',
	deleteGroupUrl : 'http://123.207.109.53:3000/api/assignment/deleteGroup',
	deleteQuestionUrl : 'http://123.207.109.53:3000/api/assignment/deleteQuestion',


	addResourceUrl: 'http://123.207.109.53:3000/api/resource/addResource',
	getQuestionGroupByIdUrl: 'http://123.207.109.53:3000/api/question/group',
	uploadSpeakingRecordUrl: 'http://123.207.109.53:3000/api/upload/record',
	studentRecordUrl: 'http://123.207.109.53:3000/uploads/',
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
		toolbarButtons: ['fullscreen', 'fontFamily', 'fontSize','bold','italic','strikeThrough','color',],
		colorsText:['#d71345','#f58220','#ffe600','#bed742','#1d953f','#2b4490','#000000'],
		height: 500,
		quickInsertTags: [],
		spellcheck: true,
	}
};