
import {Question} from "./Question";
import {VocabularyQuestion} from "./VocabularyQuestion";
import {TPOReadingQuestion} from "./TPOReadingQuestion";
import {TPOListeningQuestion} from "./TPOListeningQuestion";
import {TPOSpeakingQuestion} from "./TPOSpeakingQuestion";
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
					case Question.TPO_READING_SINGLE_TYPE:
					case Question.TPO_READING_INSERT_TYPE:
					case Question.TPO_READING_TOPIC_TYPE:
					case Question.TPO_READING_MULTIPLE_TYPE:
					case Question.TPO_READING_CATEGORY_TYPE:
						newQuestion = new TPOReadingQuestion(question);
						break;
					case Question.TPO_LISTENING_SINGLE_CHOICE_TYPE:
					case Question.TPO_LISTENING_REPEAT_TYPE:
					case Question.TPO_LISTENING_MULTIPLE_CHOICE_TYPE:
					case Question.TPO_LISTENING_TABLE_CHOICE_TYPE:
					case Question.TPO_LISTENING_SEQUENCE_TYPE:
						newQuestion = new TPOListeningQuestion(question);
						break;
					case Question.TPO_SPEAKING_Q1Q2_TYPE:
					case Question.TPO_SPEAKING_Q3Q4_TYPE:
					case Question.TPO_SPEAKING_Q5Q6_TYPE:
						newQuestion = new TPOSpeakingQuestion(question);
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