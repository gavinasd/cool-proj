
import {Question} from "./Question";
import {VocabularyQuestion} from "./VocabularyQuestion";
import {TPOReadingQuestion} from "./TPOReadingQuestion";
export class QuestionGroup{
	public type:string;
	public totalScore:number;
	public id:string;
	public content:string;
	public questionList:Question[];

	public constructor(obj:any){
		this.type = obj && obj.type;
		this.totalScore = obj && obj.totalScore;
		this.id = obj && obj._id;
		this.content = obj && obj.content;
		this.questionList = [];
		if(obj && obj.questionList){
			for(let question of obj.questionList){
				let newQuestion:Question;
				switch (question.questionType){
					case Question.VOCABULARY_TYPE:
						newQuestion = new VocabularyQuestion(question);
						break;
					case Question.TPO_READING_TYPE:
						newQuestion = new TPOReadingQuestion(question);
						break;
					default:
						newQuestion = new Question(question);
						break;
				}
				this.questionList.push(newQuestion);
			}
		}
	}
}