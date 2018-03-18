"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var cardEnums_1 = require("./cardEnums");
var Deck = /** @class */ (function (_super) {
    __extends(Deck, _super);
    function Deck(_template, autoShuffle) {
        var _this = _super.call(this) || this;
        _this.addDecks = function (deckAmount, shuffle) {
            for (var i = 0; i < deckAmount; i++) {
                var deck = new Deck(_this.template, shuffle);
                _this.push.apply(_this, deck);
            }
        };
        _this.shuffle = function () {
            //console.log("Shuffling....");
            for (var i = _this.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [_this[j], _this[i]], _this[i] = _a[0], _this[j] = _a[1];
            }
            var _a;
        };
        _this.getTopCard = function () {
            //return this.filter(x => x.cardface == _face)[0];
            return this.pop();
        };
        _this.getCard = function (_face, _suit) {
            return this.filter(function (x) { return x.cardface == _face; })[0];
        };
        _this.template = _template;
        _this.push.apply(_this, _template.cards);
        if (autoShuffle) {
            _this.shuffle();
        }
        return _this;
    }
    Deck.prototype.getMultipleOfSameCard = function (_face, _suit) {
        return this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.ACE; });
    };
    return Deck;
}(Array));
exports.Deck = Deck;
//# sourceMappingURL=Deck.js.map