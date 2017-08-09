var SpendTime = (function () {
    function SpendTime(changed, time) {
        this.changed = changed;
        this.time = time;
    }
    return SpendTime;
}());
export { SpendTime };
var StudentAnswer = (function () {
    function StudentAnswer(changed, answer) {
        this.changed = changed;
        this.answer = answer;
    }
    return StudentAnswer;
}());
export { StudentAnswer };
var MarkingScore = (function () {
    function MarkingScore(changed, score) {
        this.changed = changed;
        this.score = score;
    }
    return MarkingScore;
}());
export { MarkingScore };
