import {Question} from "./Question";

export class TPOReadingQuestion extends Question{
  paragraph:number;
  options:string[] = [];

  constructor(obj?:any){
    super(obj);
    this.paragraph = obj && obj.paragraph;
    this.options = obj && obj.options;
  }
}
