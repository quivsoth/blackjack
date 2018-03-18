"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var cardEnums_1 = require("./cardEnums");
var BlackjackHand_1 = require("./BlackjackHand");
var Table = /** @class */ (function () {
    function Table(deck, _tablePosition) {
        var _this = this;
        this.deal = function () {
            var cardsToDeal = 2;
            for (var i = 0; i < cardsToDeal; i++) {
                _this.Dealer.Hand.AddCard(_this.PlayingDeck.pop());
                for (var _i = 0, _a = _this.TableSpots; _i < _a.length; _i++) {
                    var spots = _a[_i];
                    spots.Hand.AddCard(_this.PlayingDeck.pop());
                }
            }
        };
        this.discard = function () {
            // Clean Up - todo this is ugly, the ace is not resetting - by ref by val
            var aces = _this.Dealer.Hand.filter(function (x) { return x.cardface === cardEnums_1.CardFace.ACE; });
            if (aces.length > 0) {
                for (var _i = 0, aces_1 = aces; _i < aces_1.length; _i++) {
                    var c = aces_1[_i];
                    c.rank = 1;
                }
            }
            (_a = _this.BurnPile).push.apply(_a, _this.Dealer.Hand.splice(0));
            for (var _b = 0, _c = _this.TableSpots; _b < _c.length; _b++) {
                var spot = _c[_b];
                (_d = _this.BurnPile).push.apply(_d, spot.Hand.splice(0));
            }
            ;
            var _a, _d;
        };
        this.HandRoundResult = function (dealerHand, playerHand) {
            if (playerHand.Blackjack() && !dealerHand.Blackjack()) {
                return cardEnums_1.GameResult.W;
            }
            else if (playerHand.Blackjack() && dealerHand.Blackjack()) {
                return cardEnums_1.GameResult.P;
            }
            else if (!playerHand.Blackjack() && dealerHand.Blackjack()) {
                return cardEnums_1.GameResult.L;
            }
            if (playerHand.Busted()) {
                return cardEnums_1.GameResult.L;
            }
            else if (dealerHand.Busted()) {
                return cardEnums_1.GameResult.W;
            }
            var softTotalPlayer = playerHand.Value();
            var softTotalDealer = dealerHand.Value();
            if (playerHand.Soft()) {
                playerHand.Value() < 12 ? softTotalPlayer += 10 : playerHand.Value();
            }
            if (dealerHand.Soft()) {
                dealerHand.Value() < 12 ? softTotalDealer += 10 : dealerHand.Value();
            }
            // console.log("softTotalPlayer .. " + softTotalPlayer);
            // console.log("softTotalDealer .. " + softTotalDealer);
            if (softTotalPlayer === softTotalDealer) {
                return cardEnums_1.GameResult.P;
            }
            else if (softTotalPlayer > softTotalDealer) {
                return cardEnums_1.GameResult.W;
            }
            else if (softTotalPlayer < softTotalDealer) {
                return cardEnums_1.GameResult.L;
            }
            // if (playerHand.Soft() || dealerHand.Soft()) {
            //     let softTotalPlayer: number = playerHand.Value();
            //     let softTotalDealer: number = dealerHand.Value();
            //     if (playerHand.Value() < 12 && playerHand.Soft()) softTotalPlayer += 10;
            //     if (dealerHand.Value() < 12 && dealerHand.Soft()) softTotalDealer += 10;
            //     if (softTotalPlayer === softTotalDealer) {
            //         return GameResult.P;
            //     }
            //     if (!playerHand.Soft() && dealerHand.Soft()) {
            //         if (playerHand.Value() === softTotalDealer) {
            //             return GameResult.P;
            //         }
            //     }
            //     if (playerHand.Soft() && !dealerHand.Soft()) {
            //         console.log("this palyer soft, dealer hard");
            //         if (dealerHand.Value() === softTotalPlayer) {
            //             return GameResult.P;
            //         }
            //     }
            // }
            // else if (playerHand.Value() === dealerHand.Value()) {
            //     return GameResult.P;
            // }
            // else if (playerHand.Value() > dealerHand.Value()) {
            //     return GameResult.W;
            // }
            // else if (playerHand.Value() < dealerHand.Value()) {
            //     return GameResult.L;
            // }
            return cardEnums_1.GameResult.I;
        };
        this.TableSpots = new Array();
        // always has a deck
        this.PlayingDeck = deck;
        // always has a house player
        this.Dealer = new TablePosition(new Player_1.Player());
        this.Dealer.Player.playerType = cardEnums_1.PlayerType.House;
        // burn Pile
        this.BurnPile = new Array();
        // needs at least one player
        if (_tablePosition.length >= 0) {
            for (var _i = 0, _tablePosition_1 = _tablePosition; _i < _tablePosition_1.length; _i++) {
                var spot = _tablePosition_1[_i];
                spot.Player.playerType = cardEnums_1.PlayerType.Gambler;
                this.TableSpots.push(spot);
            }
        } /*else {} todo: need to fix when there's no players */
    }
    return Table;
}());
exports.Table = Table;
var TablePosition = /** @class */ (function () {
    function TablePosition(player) {
        this.Hand = new BlackjackHand_1.BlackjackHand();
        this.Player = new Player_1.Player();
    }
    return TablePosition;
}());
exports.TablePosition = TablePosition;
//# sourceMappingURL=Table.js.map