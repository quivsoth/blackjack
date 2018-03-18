"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var PlayerGuide_1 = require("../PlayerGuide");
var cardEnums_1 = require("../cardEnums");
var Deck_1 = require("../Deck");
var BlackjackHand_1 = require("../BlackjackHand");
var Table_1 = require("../Table");
var Player_1 = require("../Player");
var BlackJackDeckTemplate_1 = require("../BlackJackDeckTemplate");
var TableAutoBot_1 = require("../TableAutoBot");
describe("Tests for player interaction", function () {
    var template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
    var masterDeck = new Deck_1.Deck(template, false);
    masterDeck.addDecks(5, true);
    before(function () {
        template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
        masterDeck.addDecks(5, true);
        var guide = new PlayerGuide_1.PlayerGuide();
    });
    describe("Test the table", function () {
        it("Should create a new table and assign players to it", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var p2 = new Table_1.TablePosition(new Player_1.Player());
            var p3 = new Table_1.TablePosition(new Player_1.Player());
            var p4 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1, p2, p3, p4));
            chai_1.expect(table.TableSpots.length).to.be.greaterThan(0);
        });
    });
    describe("Tests around the Table dealt hands (results)", function () {
        it("Should have a PUSH result because both hands equal the same total", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
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
            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerHandAutoPlay(dealerhand);
            }
            chai_1.expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.P);
        });
        it("Should have a LOSS result because the dealers hand is higher", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
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
            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerHandAutoPlay(dealerhand);
            }
            chai_1.expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.L);
        });
        it("Should have a WIN result because the dealers hand is higher", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
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
            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerHandAutoPlay(dealerhand);
            }
            chai_1.expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.W);
        });
        it("Should make dealer hit a soft 7 but not a hard 7", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.SIX, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var dealerHandSoft = new BlackjackHand_1.BlackjackHand();
            dealerHandSoft.AddCard(card1);
            dealerHandSoft.AddCard(card2);
            chai_1.expect(dealerHandSoft.Soft()).to.equal(true);
            dealerHandSoft = table.DealerHandAutoPlay(dealerHandSoft);
            chai_1.expect(dealerHandSoft.length).to.be.greaterThan(2);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.SEVEN, cardEnums_1.Suit.DIAMONDS);
            var dealerHandHard = new BlackjackHand_1.BlackjackHand();
            dealerHandHard.AddCard(card3);
            dealerHandHard.AddCard(card4);
            chai_1.expect(dealerHandHard.Soft()).to.equal(false);
            dealerHandHard = table.DealerHandAutoPlay(dealerHandHard);
            chai_1.expect(dealerHandHard.length).to.be.equal(2);
        });
        it("Should make dealer win with a soft hand but higher value", function () {
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
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
            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            dealerhand = table.DealerHandAutoPlay(dealerhand);
            // TODO HERE NEED TO FIX THE SOFT HAND IS FORCING A HIT
            chai_1.expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.L);
        });
    });
    describe("Tests around hands dealt", function () {
        // it("Should return null because there is no outcome", () => {
        //     let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
        //     let card2: Card = masterDeck.getCard(CardFace.THREE, Suit.DIAMONDS);
        //     let card3: Card = masterDeck.getCard(CardFace.TWO, Suit.CLUBS);
        //     let card4: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
        //     let p1: TablePosition = new TablePosition(new Player());
        //     let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
        //     let dealerhand: BlackjackHand = new BlackjackHand();
        //     let playerhand: BlackjackHand = new BlackjackHand();
        //     dealerhand.AddCard(card1);
        //     dealerhand.AddCard(card2);
        //     playerhand.AddCard(card3);
        //     playerhand.AddCard(card4);
        //     expect(table.play(dealerhand, playerhand)).to.equal(null);
        // });
        it("Should return push because both hands are blackjack", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.SPADES);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.play(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.P);
        });
        it("Should return win because player has blackjack and dealer does not", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.SPADES);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.play(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.W);
        });
        it("Should return loss because dealer has blackjack and player does not", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.SPADES);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var p1 = new Table_1.TablePosition(new Player_1.Player());
            var table = new TableAutoBot_1.TableAutoBot(masterDeck, new Array(p1));
            var dealerhand = new BlackjackHand_1.BlackjackHand();
            var playerhand = new BlackjackHand_1.BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            chai_1.expect(table.play(dealerhand, playerhand)).to.equal(cardEnums_1.GameResult.L);
        });
        it("Should return dealer spartan", function () {
            // console.log("\n\nsparta!!\n--\n");
            // let card1: Card = masterDeck.getCard(CardFace.SIX, Suit.CLUBS);
            // let card2: Card = masterDeck.getCard(CardFace.TWO, Suit.SPADES);
            // let card3: Card = masterDeck.getCard(CardFace.FOUR, Suit.HEARTS);
            // let card4: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);
            // let card5: Card = masterDeck.getCard(CardFace.THREE, Suit.HEARTS);
            // let card6: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
            // let card7: Card = masterDeck.getCard(CardFace.SIX, Suit.DIAMONDS);
            // let dealerhand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4));
            // let playerhand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card5, card6, card7));
            // let p1: TablePosition = new TablePosition(new Player());
            // let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            // //let result: GameResult = table.play(dealerhand, playerhand);
            // let result: GameResult = table.HandRoundResult(dealerhand, playerhand);
            // console.log(result);
        });
    });
});
// not hitting a soft 7
// Hand Number# 2
// 1) Dealer Card Face up : ACE	 Not up : FIVE			Dealer Total: 6
// 2) Player hand (first deal): NINE | EIGHT			Player Total: 17
// 3#) Dealer hits - got card : QUEEN				Dealer Total: 16
// 3#) Dealer hits - got card : ACE				Dealer Total: 17
// 4) Player Final Hand: 17	Dealer Final Hand: 17		PUSH 
//# sourceMappingURL=player_tests.js.map