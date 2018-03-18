"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var cardEnums_1 = require("./cardEnums");
var BlackjackHand_1 = require("./BlackjackHand");
var PlayerStrategem_1 = require("./PlayerStrategem");
var Table = /** @class */ (function () {
    function Table(deck, _autoplay, _tablePosition) {
        var _this = this;
        this.playDealtHands = function (dealerHand, playerHand) {
            var topCard = dealerHand[0];
            console.log("Dealer Card Face up : " + topCard.cardface + "\t Not up : " + dealerHand[1].cardface);
            console.log("Player hand (first deal): " + playerHand[0].cardface + " | " + playerHand[1].cardface);
            // TODO : SPLIT Options
            if (playerHand.Blackjack()) {
                if (dealerHand.Blackjack()) {
                    return cardEnums_1.GameResult.P;
                }
                else {
                    return cardEnums_1.GameResult.W;
                }
            }
            // todo : this is yuk
            if (topCard.cardface === cardEnums_1.CardFace.ACE) {
                topCard.rank = 1;
                // TODO : prompt for insurance
                if (dealerHand.Blackjack()) {
                    return cardEnums_1.GameResult.L;
                }
            }
            return null;
        };
        this.playAfterDealt = function (twoCardResult, dealerHand, playerHand) {
            // if (twoCardResult === null)
            // {
            for (var _i = 0, _a = _this.TableSpots; _i < _a.length; _i++) {
                var spot = _a[_i];
                spot.Hand = _this.PlayerPlays(dealerHand, spot.Hand);
            }
            ;
            if (playerHand.Busted()) {
                console.log("PLAYER BUSTED! ");
                return cardEnums_1.GameResult.L;
            }
            else {
                _this.DealerPlays(dealerHand);
            }
            console.log("\nBlackjack? (Player: " + playerHand.Blackjack() + "\tDealer: " + dealerHand.Blackjack() + ")");
            console.log("Busted? (Player: " + playerHand.Busted() + "\tDealer: " + dealerHand.Busted() + ")");
            console.log("Player Final Hand: " + playerHand.Value() + "\tDealer Final Hand: " + dealerHand.Value());
            console.log("Final Result: " + _this.BlackJackResult(dealerHand, playerHand) + "\n\n-------------------------------------------------");
            //}
            return _this.BlackJackResult(dealerHand, playerHand);
        };
        this.autorun = function () {
            var cardsToRunTo = 40;
            if (_this.PlayingDeck.length > cardsToRunTo) {
                _this.deal();
                var player = _this.TableSpots[0];
                var dealer = _this.Dealer;
                var result = _this.playAfterDealt(_this.playDealtHands(dealer.Hand, player.Hand), dealer.Hand, player.Hand);
                //eval the winner
                _this.discard();
                _this.autorun();
            }
            console.log("Cards remaining: " + _this.PlayingDeck.length);
        };
        this.discard = function () {
            (_a = _this.BurnPile).push.apply(_a, _this.Dealer.Hand.splice(0));
            for (var _i = 0, _b = _this.TableSpots; _i < _b.length; _i++) {
                var spot = _b[_i];
                (_c = _this.BurnPile).push.apply(_c, spot.Hand.splice(0));
            }
            ;
            var _a, _c;
        };
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
        this.BlackJackResult = function (dealerHand, playerHand) {
            //todo blackjack
            if (playerHand.Busted()) {
                return cardEnums_1.GameResult.L;
            }
            else if (dealerHand.Busted()) {
                return cardEnums_1.GameResult.W;
            }
            else if (playerHand.Value() === dealerHand.Value()) {
                return cardEnums_1.GameResult.P;
            }
            else if (playerHand.Value() > dealerHand.Value()) {
                return cardEnums_1.GameResult.W;
            }
            else if (playerHand.Value() < dealerHand.Value()) {
                return cardEnums_1.GameResult.L;
            }
            return cardEnums_1.GameResult.I;
        };
        this.DealerPlays = function (hand) {
            // console.log("DEALER PLAYS");
            // console.log("Current hand value (start) : " + hand.Value());
            // console.log("Soft hand? : " + hand.Soft());
            if (hand.Busted() || hand.Blackjack()) {
                return hand;
            }
            if (hand.Soft()) {
                var aceCard = hand.filter(function (x) { return x.cardface == cardEnums_1.CardFace.ACE; })[0];
                if (hand.Value() > 7 && hand.Value() < 12) {
                    aceCard.rank = 11;
                    return hand;
                }
                var drawCard = _this.PlayingDeck.getTopCard();
                hand.AddCard(drawCard);
                console.log("Dealer hits - got card : " + drawCard.cardface);
                hand = _this.DealerPlays(hand);
            }
            if (hand.Value() < 17) {
                var drawCard = _this.PlayingDeck.getTopCard();
                hand.AddCard(drawCard);
                console.log("Dealer hits - got card : " + drawCard.cardface);
                hand = _this.DealerPlays(hand);
            }
            // console.log("Current hand value (end) : " + hand.Value());
            return hand;
        };
        this.PlayerPlays = function (dealerHand, playerHand) {
            var s = new PlayerStrategem_1.PlayerStrategem();
            var playerHandTotal = playerHand.Value();
            var dealerCardValue = dealerHand[0].rank;
            //todo deal with ace
            var option = s.getPlayerResponse(dealerCardValue, playerHandTotal);
            if (option == cardEnums_1.BlackjackOptions.h) {
                var drawCard = _this.PlayingDeck.getTopCard();
                playerHand.AddCard(drawCard);
                console.log("Player hits - got card : " + drawCard.cardface);
                playerHand = _this.PlayerPlays(dealerHand, playerHand);
            }
            else if (option == cardEnums_1.BlackjackOptions.d) {
                console.log('Player doubles');
                playerHand.AddCard(_this.PlayingDeck.getTopCard());
            }
            else if (option == cardEnums_1.BlackjackOptions.s) {
                console.log('Player Sticks');
            }
            return playerHand;
        };
        this.autoplay = _autoplay;
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
    /* tslint:disable:typedef */
    TablePosition.prototype.totalHand = function () {
        var total = 0;
        //console.log("length: " + this.Hand.cards.length);
        if (this.Hand.length > 0) {
            total = this.Hand
                .map(function (b) { return b.rank; })
                .reduce(function (p, c) { return p + c; });
        }
        return total;
    };
    /* tslint:disable:typedef */
    TablePosition.prototype.hit = function (card) {
        this.Hand.push(card);
    };
    return TablePosition;
}());
exports.TablePosition = TablePosition;
//# sourceMappingURL=Table.js.map