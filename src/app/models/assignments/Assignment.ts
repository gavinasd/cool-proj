import {QuestionGroup} from "../Questions/QuestionGroup";
/**
 * 这个是所有作业的父类，具体的作业需要继承它
 */
export class Assignment{
	id:string;
	creator:string;
	assignmentName:string;
	questionGroupList:QuestionGroup[] = [];

	public constructor(obj:any){
		this.id = obj && obj._id;
		this.creator = obj && obj.creator;
		this.assignmentName = obj && obj.assignmentName;
		if(obj && obj.questionGroupList){
			for(let group of obj.questionGroupList){
				this.questionGroupList.push(new QuestionGroup(group));
			}
		}
	}
}
