// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const host = 'http://localhost:8443/api';

export const environment = {
	production: false,
	getWordPronunciationUrl: 'http://dict.youdao.com/dictvoice?audio',
	/**
	 * 登录注册接口
	 */
	loginUrl: host + '/login',
	registerUrl: host + '/register',
	smsUrl: host + '/sms',
	resetPasswordUrl: host + '/resetPassword',

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

	//获取、添加留言板的内容
	bulletinMessageUrl: host + '/bulletinMessage',

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
		placeholder: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen', 'bold', 'italic', 'strikeThrough', 'spellChecker', 'color'],
		colorsText: ['#d71345', '#f58220', '#ffe600', '#bed742', '#1d953f', '#2b4490', '#000000'],
		height: '500px',
		quickInsertTags: [],
		resizer: 'stack',
		spellcheck: true,
		theme:'snow',
		readOnly:false,
		scrollingContainer: true,
	},
	studentEditorOptions: {
		placeholder: '',
		charCounterCount: false,
		toolbarButtons: [],
		height: '500px',
		quickInsertTags: [],
		spellcheck: false,
		resizer: 'stack',
		scrollingContainer: true,
		theme:'snow',
		readOnly:false,
		events: {
			'froalaEditor.initialized': function (e, editor) {
				console.log(editor.toolbar.hide());
			}
		}
	},
	editQuestionOptions: {
		placeholder: '',
		charCounterCount: false,
		toolbarButtons: ['fullscreen', 'fontFamily', 'fontSize', 'bold', 'italic', 'strikeThrough', 'align', 'color',],
		colorsText: ['#d71345', '#f58220', '#ffe600', '#bed742', '#1d953f', '#2b4490', '#000000'],
		height: '500px',
		quickInsertTags: [],
		resizer: 'stack',
		spellcheck: true,
		theme:'snow',
		readOnly:false,
		scrollingContainer: true,
	}
};
