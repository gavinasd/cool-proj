

export class ScoreVO {

	public questionId:string;

	public score: number;

	constructor(obj :any) {
		this.questionId = obj && obj.questionId;
		this.score = obj && obj.score;
	}
}