var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Question } from "./Question";
var TPOReadingQuestion = (function (_super) {
    __extends(TPOReadingQuestion, _super);
    function TPOReadingQuestion(obj) {
        var _this = _super.call(this, obj) || this;
        _this.options = [];
        _this.passage = obj && obj.passage;
        _this.options = obj && obj.options;
        return _this;
    }
    return TPOReadingQuestion;
}(Question));
export { TPOReadingQuestion };
