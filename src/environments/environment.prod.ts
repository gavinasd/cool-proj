const host = 'http://123.207.109.53:3000/api';

export const environment = {
	production: false,
	getWordPronunciationUrl: 'http://dict.youdao.com/dictvoice?audio',
	/**
	 * 登录注册接口
	 */
	loginUrl: host + '/login',
	registerUrl: host + '/register',

	/**
	 * 班级class接口
	 */
	getClassListUrl: host + '/course/list',
	createClassUrl: host + '/course',
	getClassDetailUrl: host + '/course/detail',
	getClassAllUserUrl: host + '/course/users',
	//搜索班级
	searchClassUrl: host + '/course/search',
	//添加老师/学生
	addStudentUrl: host + '/course/addStudent',
	addTeacherUrl: host + '/course/addTeacher',
	//添加/获取 班级里面的作业列表
	addAssignmentToClassUrl: host + '/course/addAssignment',
	getAssignmentListInClassUrl: host + '/course/assignments',

	/**
	 * 作业assignment的接口
	 */
	//获取作业
	getAssignmentByIdUrl: host + '/assignment',
	getAllAssignmentListUrl: host + '/assignment/all',
	//获取学生的做题信息，学生提交作业
	getAssignmentInfoUrl: host + '/assignment/info',
	submitAssignmentInfoUrl: host + '/assignment/info',
	submitAssignmentDoneUrl: host + '/assignment/done',
	//编辑一份新的作业，包括创建作业，添加group，添加question，更新groupContent
	createAssignmentUrl: host + '/assignment',
	addQuestionGroupToAssignmentUrl: host + '/assignment/group',
	updateQuestionGroupContentUrl: host + '/assignment/group',
	deleteGroupUrl: host + '/assignment/deleteGroup',
	//这个是question相关
	addQuestionToGroupUrl: host + '/question',
	updateQuestionUrl: host + '/question',
	deleteQuestionUrl: host + '/question',


	addResourceUrl: host + '/resource/addResource',
	getQuestionGroupByIdUrl: host + '/question/group',
	uploadSpeakingRecordUrl: host + '/upload/record',
	studentRecordUrl: 'http://localhost:3000/uploads/',
	teacherEditorOptions: {
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen', 'bold', 'italic', 'strikeThrough', 'spellChecker', 'color'],
		colorsText: ['#d71345', '#f58220', '#ffe600', '#bed742', '#1d953f', '#2b4490', '#000000'],
		height: 500,
		quickInsertTags: [],
		spellcheck: true
	},
	studentEditorOptions: {
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
	editQuestionOptions: {
		placeholderText: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen', 'fontFamily', 'fontSize', 'bold', 'italic', 'strikeThrough', 'align', 'color',],
		colorsText: ['#d71345', '#f58220', '#ffe600', '#bed742', '#1d953f', '#2b4490', '#000000'],
		height: 500,
		quickInsertTags: [],
		spellcheck: true
	}
};
