import {Question} from "./Question";

/**
 * 单词题
 */
export class VocabularyQuestion extends Question{
    options:string[];         //单词题的几个选项

	constructor(obj?:any,content?:string){
        super(obj,content);
        this.options = obj && obj.options;
    }
}
