

export class ResultVO<T> {
	constructor(public code: number,
	            public msg: string,
	            public data: T){}
}