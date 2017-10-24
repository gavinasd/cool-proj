import {QuestionGroup} from "../Questions/QuestionGroup";
/**
 * 这个是所有作业的父类，具体的作业需要继承它
 */
export class Assignment{
	id:string;
	creator:string;
	assignmentName:string;
	type:string;
	questionGroupList:QuestionGroup[] = [];

	public constructor(obj:any){
		this.id = obj && obj._id;
		this.creator = obj && obj.creator;
		this.assignmentName = obj && obj.assignmentName;
		this.type = obj && obj.type;
		if(obj && obj.questionGroupList){
			for(let group of obj.questionGroupList){
				this.questionGroupList.push(new QuestionGroup(group));
			}
		}
	}

	public static needToMark(type:string):boolean{
		if(type == 'independent_writing'
			|| type == 'integrated_writing'
			|| type == 'vocabulary'
			|| type == 'tpo_speaking'
		){
			return true;
		}
		return false;
	}
}

export enum Mode{
	HomeWork,   //学生做作业模式
	Marking,    //老师批改作业
	Review      //老师，学生查看批改后的作业
}