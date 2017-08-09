var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var Convert09ToAZPipe = (function () {
    function Convert09ToAZPipe() {
    }
    Convert09ToAZPipe.prototype.transform = function (value) {
        return String.fromCharCode(65 + value);
    };
    Convert09ToAZPipe = __decorate([
        Pipe({
            name: 'convert09ToAZ',
            pure: false
        })
    ], Convert09ToAZPipe);
    return Convert09ToAZPipe;
}());
export { Convert09ToAZPipe };
