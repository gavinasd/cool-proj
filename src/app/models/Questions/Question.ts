/**
 * 这是作业列表里面的题目的父类，所有具体的题目都应该继承它
 */
export class Question {
	public static TPO_READING_TYPE = 'tpo_reading';
	public static VOCABULARY_TYPE = 'vocabulary';

	id: string;                //题目的ID
	creator: string;            //题目的作者
	questionType: string;       //题目的类型
	question:string;            //题目
	answer:string;              //题目的答案
	explanation:string;         //解释


	constructor(obj:any,content?:string) {
		this.id = obj && obj._id;
		this.creator = obj && obj.creator;
		this.questionType = obj && obj.questionType;
		this.question = obj && obj.question;
		this.answer = obj && obj.answer;
		this.explanation = obj && obj.explanation;
	}
}
