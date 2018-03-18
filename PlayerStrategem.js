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
var IBlackjackGameOptions_1 = require("./interfaces/IBlackjackGameOptions");
var data = require("./hardHandStrategy.json");
var cardEnums_1 = require("./cardEnums");
var PlayerStrategem = /** @class */ (function (_super) {
    __extends(PlayerStrategem, _super);
    function PlayerStrategem() {
        var _this = _super.call(this) || this;
        _this.getPlayerResponse = function (_dealerCardValue, _playerCardValue) {
            var chart = _this.filter(function (item) { return item.dealerHand == _dealerCardValue; })[0];
            var returnValue;
            if (_playerCardValue >= 4 && _playerCardValue <= 8) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "4to8"; })[0].value;
            }
            else if (_playerCardValue == 9) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "9"; })[0].value;
            }
            else if (_playerCardValue == 10) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "10"; })[0].value;
            }
            else if (_playerCardValue == 11) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "11"; })[0].value;
            }
            else if (_playerCardValue == 12) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "12"; })[0].value;
            }
            else if (_playerCardValue == 13) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "13"; })[0].value;
            }
            else if (_playerCardValue == 14) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "14"; })[0].value;
            }
            else if (_playerCardValue == 15) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "15"; })[0].value;
            }
            else if (_playerCardValue == 16) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "16"; })[0].value;
            }
            else if (_playerCardValue >= 17) {
                returnValue = chart.hand.filter(function (item) { return item.playerHand === "17"; })[0].value;
            }
            return _this.bjOption(returnValue);
        };
        _this.bjOption = function (value) {
            switch (value) {
                case "s": {
                    return cardEnums_1.BlackjackOptions.s;
                }
                case "h": {
                    return cardEnums_1.BlackjackOptions.h;
                }
                case "d": {
                    return cardEnums_1.BlackjackOptions.d;
                }
                case "sp": {
                    return cardEnums_1.BlackjackOptions.sp;
                }
                case "su": {
                    return cardEnums_1.BlackjackOptions.su;
                }
                default: {
                    return null;
                }
            }
        };
        var cj = data;
        var charts = new Array();
        for (var _i = 0; _i < cj.dealer.length; _i++) {
            var chart = Object.assign(new IBlackjackGameOptions_1.DealerChart(), cj.dealer[_i]);
            charts.push(chart);
        }
        _this.push.apply(_this, charts);
        return _this;
    }
    return PlayerStrategem;
}(Array));
exports.PlayerStrategem = PlayerStrategem;
//# sourceMappingURL=PlayerStrategem.js.map