/**
 * 这是作业列表里面的题目的父类，所有具体的题目都应该继承它
 */
export class Question {
	public static TPO_READING_SINGLE_TYPE = 'tpo_reading_single';
	public static TPO_READING_INSERT_TYPE = 'tpo_reading_insert';
	public static TPO_READING_TOPIC_TYPE = 'tpo_reading_topic';
	public static VOCABULARY_TYPE = 'vocabulary';
	public static INTEGRATED_WRITING_TYPE = 'integrated_writing';
	public static INDEPENDENT_WRITING_TYPE = 'independent_writing';
	public static TPO_LISTENING_SINGLE_CHOICE_TYPE = 'tpo_listening_single_choice';
	public static TPO_LISTENING_MULTIPLE_CHOICE_TYPE = 'tpo_listening_multiple_choice';
	public static TPO_LISTENING_REPEAT_TYPE = 'tpo_listening_repeat_type';
	public static TPO_SPEAKING_Q1Q2_TYPE = 'tpo_speaking_q1q2_type';
	public static TPO_SPEAKING_Q3Q4_TYPE = 'tpo_speaking_q3q4_type';
	public static TPO_SPEAKING_Q5Q6_TYPE = 'tpo_speaking_q5q6_type';

	id: string;                //题目的ID
	creator: string;            //题目的作者
	questionType: string;       //题目的类型
	question:string;            //题目
	answer:string;              //题目的答案
	explanation:string;         //解释
	score:number;


	constructor(obj:any,content?:string) {
		this.id = obj && obj._id;
		this.creator = obj && obj.creator;
		this.questionType = obj && obj.questionType;
		this.question = obj && obj.question;
		this.answer = obj && obj.answer;
		this.explanation = obj && obj.explanation;
		this.score = obj && obj.score;
	}


}
