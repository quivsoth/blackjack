"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var PlayerStrategem_1 = require("../PlayerStrategem");
var cardEnums_1 = require("../cardEnums");
var Deck_1 = require("../Deck");
var BlackjackHand_1 = require("../BlackjackHand");
var Table_1 = require("../Table");
var Player_1 = require("../Player");
var BlackJackDeckTemplate_1 = require("../BlackJackDeckTemplate");
describe("Tests for player interaction", function () {
    var template;
    var deck1;
    var deck2;
    var deck3;
    var deck5;
    var deck4;
    var masterDeck;
    before(function () {
        template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
        deck1 = new Deck_1.Deck(template, false);
        deck2 = new Deck_1.Deck(template, false);
        deck3 = new Deck_1.Deck(template, false);
        deck4 = new Deck_1.Deck(template, false);
        deck5 = new Deck_1.Deck(template, false);
        masterDeck = new Deck_1.Deck(template, false);
        masterDeck.push.apply(masterDeck, deck1);
        masterDeck.push.apply(masterDeck, deck2);
        masterDeck.push.apply(masterDeck, deck3);
        masterDeck.push.apply(masterDeck, deck4);
        masterDeck.push.apply(masterDeck, deck5);
        masterDeck.shuffle();
        var strategy = new PlayerStrategem_1.PlayerStrategem();
    });
    describe("Test the table", function () {
        it("Should create a new table and assign players to it", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var p2 = new Table_1.TablePosition(new Player_1.Player());
            var p3 = new Table_1.TablePosition(new Player_1.Player());
            var p4 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1, p2, p3, p4));
            chai_1.expect(table.TableSpots.length).to.be.greaterThan(0);
        });
    });
    describe("All players have been dealt cards", function () {
        it("Should create a new table position and assign players to it", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var p2 = new Table_1.TablePosition(new Player_1.Player());
            var p3 = new Table_1.TablePosition(new Player_1.Player());
            var p4 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1, p2, p3, p4));
            table.deal();
            for (var i = 0; i < table.TableSpots.length; i++) {
                chai_1.expect(table.TableSpots[i].totalHand()).to.equal((table.TableSpots[i].Hand[0].rank) + (table.TableSpots[i].Hand[1].rank));
            }
        });
    });
    describe("Tests around the Table dealt hands (results)", function () {
        it("Should have a PUSH result because both hands equal the same total", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var playerCard1 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var playerCard2 = masterDeck.getCard(cardEnums_1.CardFace.SEVEN, cardEnums_1.Suit.DIAMONDS);
            var dealerCard1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.SPADES);
            var dealerCard2 = masterDeck.getCard(cardEnums_1.CardFace.EIGHT, cardEnums_1.Suit.CLUBS);
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(dealerCard1);
            dealerhand.AddCard(dealerCard2);
            var playerhand = new BlackjackHand_1.BlackjackHand();
            playerhand.AddCard(playerCard1);
            playerhand.AddCard(playerCard2);
            playerhand = table.PlayerPlays(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerPlays(dealerhand);
            }
            chai_1.expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.P);
        });
        it("Should have a LOSS result because the dealers hand is higher", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.SPADES);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.EIGHT, cardEnums_1.Suit.CLUBS);
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            var playerhand = new BlackjackHand_1.BlackjackHand();
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            playerhand = table.PlayerPlays(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerPlays(dealerhand);
            }
            chai_1.expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.L);
        });
        it("Should have a WIN result because the dealers hand is higher", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.JACK, cardEnums_1.Suit.SPADES);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.CLUBS);
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            var playerhand = new BlackjackHand_1.BlackjackHand();
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            playerhand = table.PlayerPlays(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerPlays(dealerhand);
            }
            chai_1.expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.W);
        });
        it("Should make dealer hit a soft 7 but not a hard 7", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.SIX, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var dealerHandSoft = new BlackjackHand_1.BlackjackHand();
            dealerHandSoft.AddCard(card1);
            dealerHandSoft.AddCard(card2);
            chai_1.expect(dealerHandSoft.Soft()).to.equal(true);
            dealerHandSoft = table.DealerPlays(dealerHandSoft);
            chai_1.expect(dealerHandSoft.length).to.be.greaterThan(2);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.SEVEN, cardEnums_1.Suit.DIAMONDS);
            var dealerHandHard = new BlackjackHand_1.BlackjackHand();
            dealerHandHard.AddCard(card3);
            dealerHandHard.AddCard(card4);
            chai_1.expect(dealerHandHard.Soft()).to.equal(false);
            dealerHandHard = table.DealerPlays(dealerHandHard);
            chai_1.expect(dealerHandHard.length).to.be.equal(2);
        });
        it("Should make dealer win with a soft hand but higher value", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.SEVEN, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.SEVEN, cardEnums_1.Suit.DIAMONDS);
            var playerhand = new BlackjackHand_1.BlackjackHand();
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand = table.PlayerPlays(dealerhand, playerhand);
            dealerhand = table.DealerPlays(dealerhand);
            // TODO HERE NEED TO FIX THE SOFT HAND IS FORCING A HIT
            chai_1.expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.L);
        });
    });
    describe("Tests around the autoPlayer", function () {
        it("Should hit based on the dealer card with strategy derived from JSON file", function () {
            var s = new PlayerStrategem_1.PlayerStrategem();
            chai_1.expect(s.getPlayerResponse(5, 11)).to.equal(cardEnums_1.BlackjackOptions.d);
            chai_1.expect(s.getPlayerResponse(2, 17)).to.equal(cardEnums_1.BlackjackOptions.s);
            chai_1.expect(s.getPlayerResponse(6, 9)).to.equal(cardEnums_1.BlackjackOptions.d);
            chai_1.expect(s.getPlayerResponse(7, 16)).to.equal(cardEnums_1.BlackjackOptions.h);
        });
    });
    describe("Tests around hands dealt", function () {
        it("Should return null because there is no outcome", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.CLUBS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.playDealtHands(dealerhand, playerhand)).to.equal(null);
        });
        it("Should return push because both hands are blackjack", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.SPADES);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.playDealtHands(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.P);
        });
        it("Should return win because player has blackjack and dealer does not", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.SPADES);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.playDealtHands(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.W);
        });
        it("Should return loss because dealer has blackjack and player does not", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.SPADES);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new Table_1.Table(masterDeck, false, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.playDealtHands(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.L);
        });
    });
});
//# sourceMappingURL=player_tests.js.map