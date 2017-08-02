

export class SpendTime{
	constructor(public changed: boolean,
	            public time: number
	){}
}

export class StudentAnswer{
	constructor(public changed: boolean,
	            public answer:Map<string, string>
	){}
}

export class MarkingScore{
	constructor(public changed: boolean,
	            public score: Map<string, number>
	){}
}