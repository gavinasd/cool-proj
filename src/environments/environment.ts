// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  loginUrl: 'http://123.207.109.53:3000/api/login',
  registerUrl: 'http://123.207.109.53:3000/api/register',
  createClassUrl: 'http://123.207.109.53:3000/api/classes',
  addResourceUrl: 'http://123.207.109.53:3000/api/resource/addResource',
  getClassDetailUrl: 'http://123.207.109.53:3000/api/classes/detail',
  getQuestionListByAssignmentUrl: 'http://123.207.109.53:3000/api/question',
  addResponseUrlToQuestionUrl: 'http://123.207.109.53:3000/api/question/addResponse',
  addQuestionUrl: 'http://123.207.109.53:3000/api/classes/addQuestion',
  getAssignmentListUrl: 'http://123.207.109.53:3000/api/classes/getAssignmentList',
  getClassListUrl : 'http://123.207.109.53:3000/api/classes',
  getAllAssignmentListUrl : 'http://123.207.109.53:3000/api/assignment',
  searchClassUrl : 'http://123.207.109.53:3000/api/classes/search',
  addStudentUrl : 'http://123.207.109.53:3000/api/classes/addStudent',
  addTeacherUrl : 'http://123.207.109.53:3000/api/classes/addTeacher',
  getAssignmentByIdUrl : 'http://123.207.109.53:3000/api/assignment/assignmentId',
  getAssignmentDetailUrl : 'http://123.207.109.53:3000/api/assignment/detail',
  addAssignmentToClassUrl : 'http://123.207.109.53:3000/api/classes/addAssignment',
  getClassAllUserUrl : 'http://123.207.109.53:3000/api/classes/user'

};
