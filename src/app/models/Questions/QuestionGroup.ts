import {Question} from "./Question";
import {VocabularyQuestion} from "./VocabularyQuestion";
import {TPOReadingQuestion} from "./TPOReadingQuestion";
import {TPOListeningQuestion} from "./TPOListeningQuestion";
import {TPOSpeakingQuestion} from "./TPOSpeakingQuestion";
import {QuestionType} from "../../shared/enums/QuestionType";
import {AssignmentType} from "../../shared/enums/AssignmentType";

export class QuestionGroup {
	public groupId: string;
	public type: AssignmentType;
	public content: string;
	public totalScore: number;
	public questionList: Question[];

	public constructor(obj: any) {
		this.totalScore = obj && obj.totalScore;
		this.groupId = obj && obj.groupId;
		this.type = obj && obj.type;
		this.content = obj && obj.content;
		this.questionList = [];
		if (obj && obj.questionList) {
			for (let question of obj.questionList) {
				let newQuestion: Question;
				switch (question.questionType) {
					case QuestionType.VOCABULARY_TYPE:
						newQuestion = new VocabularyQuestion(question);
						break;
					case QuestionType.TPO_READING_SINGLE_TYPE:
					case QuestionType.TPO_READING_INSERT_TYPE:
					case QuestionType.TPO_READING_TOPIC_TYPE:
					case QuestionType.TPO_READING_MULTIPLE_TYPE:
					case QuestionType.TPO_READING_CATEGORY_TYPE:
						newQuestion = new TPOReadingQuestion(question);
						break;
					case QuestionType.TPO_LISTENING_SINGLE_CHOICE_TYPE:
					case QuestionType.TPO_LISTENING_REPEAT_TYPE:
					case QuestionType.TPO_LISTENING_MULTIPLE_CHOICE_TYPE:
					case QuestionType.TPO_LISTENING_TABLE_CHOICE_TYPE:
					case QuestionType.TPO_LISTENING_SEQUENCE_TYPE:
						newQuestion = new TPOListeningQuestion(question);
						break;
					case QuestionType.TPO_SPEAKING_Q1Q2_TYPE:
					case QuestionType.TPO_SPEAKING_Q3Q4_TYPE:
					case QuestionType.TPO_SPEAKING_Q5Q6_TYPE:
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