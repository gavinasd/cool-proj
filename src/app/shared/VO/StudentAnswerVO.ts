export class StudentAnswerVO {
	public questionId: string;
	public studentAnswer: string;

	constructor(obj: any) {
		this.questionId = obj && obj.questionId;
		this.studentAnswer = obj && obj.studentAnswer;
	}
}