
export class GradeVO {
	constructor(public assignmentId: string,
	            public studentId: string,
	            public studentName: string,
	            public studentAvatar: string,
	            public score: number,
	            public totalScore: number,
	            public finishQuestionNumber: number,
	            public totalQuestionNumber: number,
	            public spendTime: number,
	            public done: boolean) {
	}

	public undoneNum() :number {
		return this.totalQuestionNumber - this.finishQuestionNumber;
	}
}