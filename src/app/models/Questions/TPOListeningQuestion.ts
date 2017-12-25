import {Question} from "./Question";

export class TPOListeningQuestion extends Question{
	recordUrl:string;
	options:string[] = [];

	constructor(obj?:any){
		super(obj);
		this.recordUrl = obj && obj.recordUrl;
		if(obj && obj.options){
			for(let i = 0; i < obj.options.length; i ++ ){
				this.options[i] = obj.options[i];
			}
		}
	}
}