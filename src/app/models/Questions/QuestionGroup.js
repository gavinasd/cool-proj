import { Question } from "./Question";
import { VocabularyQuestion } from "./VocabularyQuestion";
import { TPOReadingQuestion } from "./TPOReadingQuestion";
var QuestionGroup = (function () {
    function QuestionGroup(obj) {
        this.type = obj && obj.type;
        this.totalScore = obj && obj.totalScore;
        this.id = obj && obj._id;
        this.content = obj && obj.content;
        this.questionList = [];
        if (obj && obj.questionList) {
            for (var _i = 0, _a = obj.questionList; _i < _a.length; _i++) {
                var question = _a[_i];
                var newQuestion = void 0;
                switch (question.questionType) {
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
    return QuestionGroup;
}());
export { QuestionGroup };
