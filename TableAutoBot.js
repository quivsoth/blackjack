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
var PlayerGuide_1 = require("./PlayerGuide");
var Table_1 = require("./Table");
var mongoose = require("mongoose");
var TableAutoBot = /** @class */ (function (_super) {
    __extends(TableAutoBot, _super);
    function TableAutoBot(deck, _tablePosition) {
        var _this = _super.call(this, deck, _tablePosition) || this;
        _this.autorun = function () {
            console.log("Hand Number# " + _this.handnumber);
            var cardsToRunTo = 40;
            if (_this.PlayingDeck.length > cardsToRunTo) {
                // var acetracker: Card = this.PlayingDeck.getCard(CardFace.ACE, Suit.CLUBS);
                // console.log("Acetracker: " + acetracker.rank);
                var player = _this.TableSpots[0];
                var dealer = _this.Dealer;
                _this.deal();
                var result = _this.play(dealer.Hand, player.Hand);
                var blackJackResultModel = new mongoose.Schema({
                    Players: Array,
                    TablePosition: Table_1.TablePosition
                });
                var blackjackResultDocument = mongoose.model('BlackResult', blackJackResultModel);
                var tally = new blackjackResultDocument({
                    Players: new Array(),
                    TablePosition: _this.TableSpots
                });
                // const BlackJackResult = new mongoose.Schema({
                //     name: { type: String, required: true },
                //     age: Number,
                // });
                // const User = mongoose.model<IUser>('BlackResult', BlackJackResult);
                // const result = new User({
                //     name: "Larry",
                //     age: 55
                // });
                //result.save().then(() => console.log('added larry'));
                //Messages
                console.log("4) Player Final Hand: " + player.Hand.Value() + "\tDealer Final Hand: " + dealer.Hand.Value() + "\t\t" + result);
                console.log("\n---------------------------------------------------------------------------------\n");
                _this.discard();
                _this.handnumber += 1;
                _this.autorun();
            }
            //console.log("Cards remaining: " + this.PlayingDeck.length);
        };
        _this.play = function (dealerHand, playerHand) {
            console.log("1) Dealer Card Face up : " + dealerHand[0].cardface + "\t Not up : " + dealerHand[1].cardface + "\t\t\tDealer Total: " + dealerHand.Value());
            console.log("2) Player hand (first deal): " + playerHand[0].cardface + " | " + playerHand[1].cardface + "\t\t\tPlayer Total: " + playerHand.Value());
            var result = cardEnums_1.GameResult.I;
            // TODO : SPLIT Options
            // Player / Dealer Blackjack
            if (playerHand.Blackjack()) {
                if (dealerHand.Blackjack()) {
                    console.log("3a) Double Blackjack PUSH");
                    result = cardEnums_1.GameResult.P;
                }
                else {
                    console.log("3b) Player Blackjack WIN");
                    result = cardEnums_1.GameResult.W;
                }
            }
            else if (dealerHand.Blackjack()) {
                console.log("3c) Dealer blackjack LOSE");
                result = cardEnums_1.GameResult.L;
            }
            if (result === cardEnums_1.GameResult.I) {
                result = _this.autoRunOutAfterDealt(dealerHand, playerHand);
            }
            return result;
        };
        _this.autoRunOutAfterDealt = function (dealerHand, playerHand) {
            var result = cardEnums_1.GameResult.I;
            // All the players play their end
            // for (let spot of this.TableSpots) {
            //     spot.Hand = this.PlayerHandAutoPlay(dealerHand, spot.Hand);
            // };
            _this.PlayerHandAutoPlay(dealerHand, playerHand);
            if (playerHand.Busted()) {
                console.log("2c) Player BUSTED!");
                result = cardEnums_1.GameResult.L;
            }
            else {
                _this.DealerHandAutoPlay(dealerHand);
            }
            if (dealerHand.Busted()) {
                console.log("3c) Dealer BUSTED!");
                result = cardEnums_1.GameResult.W;
            }
            if (result === cardEnums_1.GameResult.I) {
                result = _this.HandRoundResult(dealerHand, playerHand);
            }
            return result;
        };
        _this.DealerHandAutoPlay = function (hand) {
            if (hand.Busted() || hand.Blackjack()) {
                return hand;
            }
            if (hand.Soft()) {
                var aceCard = hand.filter(function (x) { return x.cardface == cardEnums_1.CardFace.ACE; })[0];
                if (hand.Value() > 7 && hand.Value() < 12) {
                    aceCard.rank = 11;
                    return hand;
                }
                if (hand.Value() <= 17) {
                    var drawCard = _this.PlayingDeck.getTopCard();
                    hand.AddCard(drawCard);
                    console.log("3#) Dealer hits - got card : " + drawCard.cardface + "\t\t\t\tDealer Total: " + hand.Value());
                    hand = _this.DealerHandAutoPlay(hand);
                }
            }
            if (hand.Value() < 17) {
                var drawCard = _this.PlayingDeck.getTopCard();
                hand.AddCard(drawCard);
                console.log("3#) Dealer hits - got card : " + drawCard.cardface + "\t\t\t\tDealer Total: " + hand.Value());
                hand = _this.DealerHandAutoPlay(hand);
            }
            return hand;
        };
        _this.PlayerHandAutoPlay = function (dealerHand, playerHand) {
            if (playerHand.Busted()) {
                return playerHand;
            }
            var guide = new PlayerGuide_1.PlayerGuide();
            var playerHandTotal = playerHand.Value();
            var dealerCardValue = dealerHand[0].rank;
            var option = guide.FindGuideOption(playerHand, dealerHand[0]);
            //console.log("guide option: " + option);
            if (option == cardEnums_1.BlackjackOptions.h) {
                var drawCard = _this.PlayingDeck.getTopCard();
                playerHand.AddCard(drawCard);
                console.log("2#) Player hits - got card : " + drawCard.cardface + "\t\t\t\tPlayer Total: " + playerHand.Value());
                playerHand = _this.PlayerHandAutoPlay(dealerHand, playerHand);
            }
            else if (option == cardEnums_1.BlackjackOptions.d) {
                var drawCard = _this.PlayingDeck.getTopCard();
                playerHand.AddCard(drawCard);
                console.log("2#) Double Down!! Got card : " + drawCard.cardface + "\t\t\t\tPlayer Total: " + playerHand.Value());
            }
            return playerHand;
        };
        _this.handnumber = 0;
        return _this;
    }
    return TableAutoBot;
}(Table_1.Table));
exports.TableAutoBot = TableAutoBot;
//# sourceMappingURL=TableAutoBot.js.map