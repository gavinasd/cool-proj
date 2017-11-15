import {enableProdMode} from "@angular/core";
export class User{
	//基本注册信息
	id:string;
	email:string;
	nickName:string;
	userType:Number;

	//班级信息
	classList:string[];
	courseList:string[];
	school:String;
	phone:String;
}

export class ResponseToQuestion{
	//创建者
	creator:string;
	//所属班级
	classId:string;
	//所属作业
	assignment:string;
	//对应的问题
	question:string;
	//回答的内容
	content:string;

	constructor(obj:any){
		this.creator = obj && obj.creator;
		this.classId = obj && obj.classId;
		this.assignment = obj && obj.assignment;
		this.question = obj && obj.question;
		this.content = obj && obj.content;
	}
}

export class AssignmentInfo{
    //作业ID
    assignmentId:string;
    //作业名称
    assignmentName:string;
    //作业类型
	assignmentType:string;
    //每个同学的成绩信息列表
    gradeInfoList:[GradeInfo];

    constructor(obj:any){
        this.assignmentId = obj && obj.assignmentId;
        this.assignmentName = obj && obj.assignmentName;
        this.assignmentType = obj && obj.assignmentType;
        this.gradeInfoList = obj && obj.gradeInfoList;
    }
}

export class GradeInfo{

    //学生ID
    studentId:string;
    //学生名字
    studentName:string;
    //学生的头像
	studentAvatar:string;
    //得分
    score:number;
    //作业的总分
    totalScore:number;
    //还没完成的题目数量
    undoneNum:number;
    //用时
	spendTime:number;
	//作业是否已经提交
	done:boolean;

    constructor(obj:any){
        this.studentId = obj && obj.studentId;
        this.studentName = obj && obj.studentName;
        this.studentAvatar = obj && obj.studentAvatar;
        this.score = obj && obj.score;
        this.totalScore = obj && obj.totalScore;
        this.undoneNum = obj && obj.undoneNum;
        this.spendTime = obj && obj.spendTime;
        this.done = obj && obj.done;
    }
}

export class ClassInfo{
    //班级ID
    classId:string;
    //班级名称
    className:string;
    //老师列表
	teacherList:any[];

    constructor(classId:string, className:string, teacherList:any[]){
        this.classId = classId;
        this.className = className;
        this.teacherList = teacherList;
    }
}