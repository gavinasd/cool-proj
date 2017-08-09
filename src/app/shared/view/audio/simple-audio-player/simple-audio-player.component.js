var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var SimpleAudioPlayerComponent = (function () {
    function SimpleAudioPlayerComponent() {
    }
    SimpleAudioPlayerComponent.prototype.ngOnInit = function () {
    };
    SimpleAudioPlayerComponent.prototype.ngOnChanges = function (changes) {
        this.myAudio = new Audio(this.src);
        this.myAudio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.load();
        }, false);
        this.myAudio.load();
    };
    SimpleAudioPlayerComponent.prototype.play = function () {
        this.myAudio.play();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SimpleAudioPlayerComponent.prototype, "src", void 0);
    SimpleAudioPlayerComponent = __decorate([
        Component({
            selector: 'app-simple-audio-player',
            templateUrl: './simple-audio-player.component.html',
            styleUrls: ['./simple-audio-player.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], SimpleAudioPlayerComponent);
    return SimpleAudioPlayerComponent;
}());
export { SimpleAudioPlayerComponent };
