var Question = (function () {
    function Question(obj, content) {
        this.id = obj && obj._id;
        this.creator = obj && obj.creator;
        this.questionType = obj && obj.questionType;
        this.question = obj && obj.question;
        this.answer = obj && obj.answer;
        this.explanation = obj && obj.explanation;
        this.score = obj && obj.score;
    }
    Question.TPO_READING_TYPE = 'tpo_reading';
    Question.VOCABULARY_TYPE = 'vocabulary';
    return Question;
}());
export { Question };
