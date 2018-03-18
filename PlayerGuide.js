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
var XLSX = require("ts-xlsx");
var cardEnums_1 = require("./cardEnums");
var converter = require("number-to-words");
var PlayerGuide = /** @class */ (function (_super) {
    __extends(PlayerGuide, _super);
    function PlayerGuide() {
        var _this = _super.call(this) || this;
        _this.FindGuideOption = function (playerHand, dealerCard) {
            var key = converter.toWords(dealerCard.rank.toString());
            if (key === "one")
                key = "ace"; //hacky
            var playerTotal = converter.toWords(playerHand.Value());
            //console.log("a) playerTotal: " + playerTotal);
            if (playerHand.Blackjack()) {
                return cardEnums_1.BlackjackOptions.s;
            }
            if (playerHand.length === 2) {
                // Pairs
                if (playerHand[0].cardface === playerHand[1].cardface) {
                    playerTotal = converter.toWords(playerHand[0].rank) + " " + converter.toWords(playerHand[1].rank);
                    if (playerHand[0].cardface === cardEnums_1.CardFace.ACE)
                        playerTotal = "ace ace"; //hack
                }
                else if (playerHand.HasAce()) {
                    //TODO how do we get to here if we cannot split aces (not enough money to split)
                    playerTotal = "ace ";
                    var swapAce = playerHand[0].cardface === cardEnums_1.CardFace.ACE ? playerTotal += converter.toWords(playerHand[1].rank) : playerTotal += converter.toWords(playerHand[0].rank);
                }
            }
            else if (playerHand.length > 2 && playerHand.HasAce()) {
                //console.log("b) playerHand.Value() " + playerHand.Value());
                var handValue = playerHand.Value();
                if (handValue < 12) {
                    handValue += 10;
                }
                if (handValue < 17) {
                    playerTotal = "soft16orless";
                }
                else if (handValue === 17) {
                    playerTotal = "soft17";
                }
                else if (handValue === 18) {
                    playerTotal = "soft18";
                }
                else if (handValue === 19) {
                    playerTotal = "soft19";
                }
                else if (handValue > 19 && playerHand.Value() < 22) {
                    return cardEnums_1.BlackjackOptions.s;
                }
            }
            var row = _this.filter(function (e) { return e.Hand === playerTotal; });
            var out = row[0][key];
            var result = (cardEnums_1.BlackjackOptions)[out];
            if (result === cardEnums_1.BlackjackOptions.d && playerHand.length > 2) {
                result = cardEnums_1.BlackjackOptions.h;
            }
            return result;
        };
        var wb = XLSX.readFile("./stratagem.xlsx", null);
        var sheet = XLSX.utils.sheet_to_json(wb.Sheets["Sheet1"]);
        _this.push.apply(_this, sheet);
        return _this;
    }
    return PlayerGuide;
}(Array));
exports.PlayerGuide = PlayerGuide;
//# sourceMappingURL=PlayerGuide.js.map