import {Question} from "./Question";

export class TPOReadingQuestion extends Question{
  passage:string;
  options:string[] = [];

  constructor(obj?:any){
    super(obj);
    this.passage = obj && obj.passage;
    this.options = obj && obj.options;
  }
}
