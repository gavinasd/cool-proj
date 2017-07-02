

export class LastAnswer{
	questionId:string;
	lastAnswer:string;

	constructor(obj){
		this.questionId = obj && obj.questionId;
		this.lastAnswer = obj && obj.lastAnswer;
	}
}