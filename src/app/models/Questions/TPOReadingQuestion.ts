import {Question} from "./Question";

export class TPOReadingQuestion extends Question{
  paragraph:number;
  options:string[] = [];

  constructor(obj?:any){
    super(obj);
    this.paragraph = obj && obj.paragraph;
    if(obj && obj.options){
    	for(let i = 0; i < obj.options.length; i ++ ){
    		this.options[i] = obj.options[i];
	    }
    }
  }
}
