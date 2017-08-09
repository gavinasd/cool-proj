import { QuestionGroup } from "../Questions/QuestionGroup";
var Assignment = (function () {
    function Assignment(obj) {
        this.questionGroupList = [];
        this.id = obj && obj._id;
        this.creator = obj && obj.creator;
        this.assignmentName = obj && obj.assignmentName;
        if (obj && obj.questionGroupList) {
            for (var _i = 0, _a = obj.questionGroupList; _i < _a.length; _i++) {
                var group = _a[_i];
                this.questionGroupList.push(new QuestionGroup(group));
            }
        }
    }
    return Assignment;
}());
export { Assignment };
export var Mode;
(function (Mode) {
    Mode[Mode["HomeWork"] = 0] = "HomeWork";
    Mode[Mode["Marking"] = 1] = "Marking";
    Mode[Mode["Review"] = 2] = "Review";
})(Mode || (Mode = {}));
