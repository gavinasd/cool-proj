// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  	production: false,
  	loginUrl:'http://localhost:3000/api/login',
  	registerUrl:'http://localhost:3000/api/register',
  	createClassUrl:'http://localhost:3000/api/classes',
  	addResourceUrl:'http://localhost:3000/api/resource/addResource',
  	getClassDetailUrl:'http://localhost:3000/api/classes/detail',
  	getQuestionListByAssignmentUrl:'http://localhost:3000/api/question',
	addResponseUrlToQuestionUrl:'http://localhost:3000/api/question/addResponse',
	addQuestionUrl:'http://localhost:3000/api/classes/addQuestion',
	getAssignmentListUrl:'http://localhost:3000/api/classes/getAssignmentList',
	getClassListUrl:'http://localhost:3000/api/classes',
	getAllAssignmentListUrl:'http://localhost:3000/api/assignment',
	searchClassUrl:'http://localhost:3000/api/classes/search',
	addStudentUrl:'http://localhost:3000/api/classes/addStudent',
	addTeacherUrl:'http://localhost:3000/api/classes/addTeacher',
	getAssignmentByIdUrl:'http://localhost:3000/api/assignment/assignmentId',
	getAssignmentDetailUrl:'http://localhost:3000/api/assignment/detail',
	addAssignmentToClassUrl:'http://localhost:3000/api/classes/addAssignment',
	getClassAllUserUrl:'http://localhost:3000/api/classes/user'
};
