
//老师用来批改分数的数据结构
export class MarkingScore{
	questionId:string;
	score:number;

	constructor(obj){
		this.questionId = obj && obj.questionId;
		this.score = obj && obj.score;
	}
}

//用来和server沟通，提交批改分数的数据结构
export class MarkingScoreToQuestion{
	//创建者
	creator:string;
	//所属班级
	class:string;
	//所属作业
	assignment:string;
	//对应的问题
	question:string;
	//分数
	score:number;

	constructor(obj:any){
		this.creator = obj && obj.creator;
		this.class = obj && obj.class;
		this.assignment = obj && obj.assignment;
		this.question = obj && obj.question;
		this.score = obj && obj.score;
	}
}
