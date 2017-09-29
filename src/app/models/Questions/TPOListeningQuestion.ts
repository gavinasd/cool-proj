import {Question} from "./Question";

export class TPOListeningQuestion extends Question{
	recordUrl:string;
	options:string[] = [];

	constructor(obj?:any){
		super(obj);
		this.recordUrl = obj && obj.recordUrl;
		this.options = obj && obj.options;
	}
}