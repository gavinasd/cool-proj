var User = (function () {
    function User() {
    }
    return User;
}());
export { User };
var ResponseToQuestion = (function () {
    function ResponseToQuestion(obj) {
        this.creator = obj && obj.creator;
        this.class = obj && obj.class;
        this.assignment = obj && obj.assignment;
        this.question = obj && obj.question;
        this.content = obj && obj.content;
    }
    return ResponseToQuestion;
}());
export { ResponseToQuestion };
var AssignmentInfo = (function () {
    function AssignmentInfo(obj) {
        this.assignmentId = obj && obj.assignmentId;
        this.assignmentName = obj && obj.assignmentName;
        this.gradeInfoList = obj && obj.gradeInfoList;
    }
    return AssignmentInfo;
}());
export { AssignmentInfo };
var GradeInfo = (function () {
    function GradeInfo(obj) {
        this.studentId = obj && obj.studentId;
        this.studentName = obj && obj.studentName;
        this.score = obj && obj.score;
        this.totalScore = obj && obj.totalScore;
        this.undoneNum = obj && obj.undoneNum;
    }
    return GradeInfo;
}());
export { GradeInfo };
var ClassInfo = (function () {
    function ClassInfo(classId, className) {
        this.classId = classId;
        this.className = className;
    }
    return ClassInfo;
}());
export { ClassInfo };
