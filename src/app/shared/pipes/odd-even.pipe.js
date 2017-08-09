var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OddEvenPipe = (function () {
    function OddEvenPipe() {
    }
    OddEvenPipe.prototype.transform = function (value, filter) {
        if (!value || (filter !== 'even' && filter !== 'odd')) {
            return value;
        }
        return value.filter(function (item, idx) { return filter === 'even' ? idx % 2 === 1 : idx % 2 === 0; });
    };
    OddEvenPipe = __decorate([
        Pipe({
            name: 'oddeven',
            pure: false
        })
    ], OddEvenPipe);
    return OddEvenPipe;
}());
export { OddEvenPipe };
