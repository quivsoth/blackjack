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
// todo change this to a generic hand instead of building for blackjack
var BlackjackHand = /** @class */ (function (_super) {
    __extends(BlackjackHand, _super);
    function BlackjackHand() {
        var _this = _super.call(this) || this;
        _this.AddCard = function (card) {
            _this.push(card);
            //console.log("Adding Card: " + card.name + " of " + card.cardface);
            return _this;
        };
        _this.AddCards = function (cards) {
            _this.push.apply(_this, cards);
            return _this;
        };
        _this.Blackjack = function () {
            if (_this.length === 2) {
                if (_this.HasAce()
                    && (_this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.KING; }).length == 1
                        || _this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.QUEEN; }).length == 1
                        || _this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.JACK; }).length == 1
                        || _this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.TEN; }).length == 1)) {
                    return true;
                }
            }
            return false;
        };
        _this.Busted = function () {
            if (_this.Value() > 21) {
                return true;
            }
            return false;
        };
        _this.Double = function () {
            if (_this.length === 2) {
                return true;
            }
            return false;
        };
        _this.HasAce = function () {
            if (_this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.ACE; }).length >= 1) {
                return true;
            }
            return false;
        };
        _this.Hit = function () {
            if (_this.Value() < 21) {
                return true;
            }
            return false;
        };
        _this.Soft = function () {
            // 5 3 A A
            var hasAce = _this.filter(function (x) { return x.cardface == cardEnums_1.CardFace.ACE; }).length;
            if (hasAce >= 1) {
                if (_this.Value() <= 11) {
                    return true;
                }
            }
            return false;
        };
        _this.Split = function () {
            if (_this.length === 2) {
                if (_this[0].cardface === _this[1].cardface) {
                    return true;
                }
            }
            return false;
        };
        _this.Value = function () {
            var total = _this
                .map(function (b) { return b.rank; })
                .reduce(function (p, c) { return p + c; });
            return total;
        };
        // todo
        _this.isActive = true;
        return _this;
    }
    return BlackjackHand;
}(Array));
exports.BlackjackHand = BlackjackHand;
//# sourceMappingURL=BlackjackHand.js.map