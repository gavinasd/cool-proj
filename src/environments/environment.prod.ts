const host = 'https://zhuoyuketang.com:8443/api';

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
	 * 资源resource的接口
	 */
	resourceUrl: host + '/resource',

	//从已经存在的resource添加到班级
	addResourceFromExistUrl: host + '/resource/fromExist',
	//班级里面的全部resource
	getResourceListInCourseUrl: host + '/resource/list',
	//从班级里面delete掉resource
	deleteResourceFromCourseUrl: host + '/resource/fromCourse',
	//下载资源
	downloadResourceUrl: host + '/download',

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
};
