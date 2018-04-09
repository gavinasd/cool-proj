/**
 * 这是作业列表里面的题目的父类，所有具体的题目都应该继承它
 */
import {QuestionType} from "../../shared/enums/QuestionType";

export class Question {
	questionId: string;         //题目的ID
	creatorId: string;          //题目的作者
	questionType: QuestionType;       //题目的类型
	question:string;            //题目
	answer:string;              //题目的答案
	explanation:string;         //解释
	score:number;


	constructor(obj:any) {
		this.questionId = (obj && obj._id) || (obj && obj.questionId);
		this.creatorId = obj && obj.creatorId;
		this.questionType = obj && obj.questionType;
		this.question = obj && obj.question;
		this.answer = obj && obj.answer;
		this.explanation = obj && obj.explanation;
		this.score = obj && obj.score;
	}


}
