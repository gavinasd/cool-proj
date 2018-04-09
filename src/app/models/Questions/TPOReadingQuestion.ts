import {Question} from "./Question";

export class TPOReadingQuestion extends Question{
  paragraph:number;
  options:string[] = [];
  categoryList:string[] = [];

  constructor(obj?:any){
    super(obj);
    this.paragraph = obj && obj.paragraph;
    if(obj && obj.options){
    	for(let i = 0; i < obj.options.length; i ++ ){
    		this.options[i] = obj.options[i];
	    }
    }
	  if(obj && obj.categoryList){
		  for(let i = 0; i < obj.categoryList.length; i ++ ){
			  this.categoryList[i] = obj.categoryList[i];
		  }
	  }
  }
}
