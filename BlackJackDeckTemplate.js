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
var Card_1 = require("./Card");
var cardEnums_1 = require("./cardEnums");
var AllDeckTemplate_1 = require("./AllDeckTemplate");
// import * as XLSX from 'ts-xlsx';
var BlackJackDeckTemplate = /** @class */ (function (_super) {
    __extends(BlackJackDeckTemplate, _super);
    function BlackJackDeckTemplate() {
        var _this = _super.call(this) || this;
        _this.name = "BlackJack Deck";
        _this.description = "Single Deck of regular playing cards used for blackjack";
        // suits used in this game
        _this.suit.push(cardEnums_1.Suit.CLUBS);
        _this.suit.push(cardEnums_1.Suit.DIAMONDS);
        _this.suit.push(cardEnums_1.Suit.HEARTS);
        _this.suit.push(cardEnums_1.Suit.SPADES);
        // cards used in this game
        for (var _i = 0, _a = _this.suit; _i < _a.length; _i++) {
            var suit = _a[_i];
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.ACE + " of " + suit.toString(), cardEnums_1.CardFace.ACE, suit, 1));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.TWO + " of " + suit.toString(), cardEnums_1.CardFace.TWO, suit, 2));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.THREE + " of " + suit.toString(), cardEnums_1.CardFace.THREE, suit, 3));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.FOUR + " of " + suit.toString(), cardEnums_1.CardFace.FOUR, suit, 4));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.FIVE + " of " + suit.toString(), cardEnums_1.CardFace.FIVE, suit, 5));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.SIX + " of " + suit.toString(), cardEnums_1.CardFace.SIX, suit, 6));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.SEVEN + " of " + suit.toString(), cardEnums_1.CardFace.SEVEN, suit, 7));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.EIGHT + " of " + suit.toString(), cardEnums_1.CardFace.EIGHT, suit, 8));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.NINE + " of " + suit.toString(), cardEnums_1.CardFace.NINE, suit, 9));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.TEN + " of " + suit.toString(), cardEnums_1.CardFace.TEN, suit, 10));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.JACK + " of " + suit.toString(), cardEnums_1.CardFace.JACK, suit, 10));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.QUEEN + " of " + suit.toString(), cardEnums_1.CardFace.QUEEN, suit, 10));
            _this.cards.push(new Card_1.Card(cardEnums_1.CardFace.KING + " of " + suit.toString(), cardEnums_1.CardFace.KING, suit, 10));
        }
        return _this;
    }
    return BlackJackDeckTemplate;
}(AllDeckTemplate_1.AllDeckTemplate));
exports.BlackJackDeckTemplate = BlackJackDeckTemplate;
//# sourceMappingURL=BlackJackDeckTemplate.js.map