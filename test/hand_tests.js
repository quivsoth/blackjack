"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
require("chai");
var chai_1 = require("chai");
var cardEnums_1 = require("../cardEnums");
var Deck_1 = require("../Deck");
var BlackjackHand_1 = require("../BlackjackHand");
var BlackJackDeckTemplate_1 = require("../BlackJackDeckTemplate");
describe("Tests that will evaluate the options from a Blackjack hand", function () {
    var template;
    var deck1;
    var deck2;
    var deck3;
    var deck4;
    var deck5;
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
    });
    describe("Is able to double hand", function () {
        it("Should return true because I only have 2 cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Double()).to.equal(true);
        });
        it("Should return false because I have 3 cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Double()).to.equal(false);
        });
        it("Should return false because  I have lots of cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.SPADES);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.DIAMONDS);
            var card5 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3, card4, card5));
            chai_1.expect(hand.Split()).to.equal(false);
        });
    });
    describe("Is able to split hand", function () {
        it("Should return true because the hand can split", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Split()).to.equal(true);
        });
        it("Should return false because the hand cannot split", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Split()).to.equal(false);
        });
        it("Should return false because the hand has 3 cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Split()).to.equal(false);
        });
    });
    describe("Does my hand have an ace?", function () {
        it("Should return true when my hand has an ace and false when it doesn't", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.CLUBS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.HasAce()).to.equal(true);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.CLUBS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.CLUBS);
            var hand2 = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card3, card4));
            chai_1.expect(hand2.HasAce()).to.equal(false);
        });
        it("Should return true because my hand is Blackjack, I must have an Ace and face or ten and I must only have 2 cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.CLUBS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Blackjack()).to.equal(true);
        });
        it("Should return false because my hand is not Blackjack, I have more than 2 cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.SPADES);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.QUEEN, cardEnums_1.Suit.CLUBS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Blackjack()).to.equal(false);
        });
        it("Should return false because my hand is not Blackjack, I am missing an ace", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.KING, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Blackjack()).to.equal(false);
        });
        it("Should return true because my hand is not Blackjack, I am missing a face or a ten", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Blackjack()).to.equal(false);
        });
    });
    describe("Is a soft hand", function () {
        it("Should return true because the hand has an ace and is less than 9", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.EIGHT, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Soft()).to.equal(true);
        });
        it("Should return true because the hand has an ace and is less than 9 (with more cards)", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3, card4));
            chai_1.expect(hand.Soft()).to.equal(true);
        });
        it("Should return false because the hand is greater than 11 (hand is 12)", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3, card4));
            chai_1.expect(hand.Soft()).to.equal(false);
        });
        it("Should return false because the hand has an ace but is greater than 11", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.HEARTS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3, card4));
            chai_1.expect(hand.Soft()).to.equal(false);
        });
        it("Should return false because the hand has an ace but is greater than 11", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.SIX, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.JACK, cardEnums_1.Suit.HEARTS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Soft()).to.equal(false);
        });
        it("Should return false because there is no ace (even if its less/equal than 10)", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.HEARTS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Soft()).to.equal(false);
        });
        it("Should return false because there is no ace (and greater than 10)", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.HEARTS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Soft()).to.equal(false);
        });
    });
    describe("Is hand busted", function () {
        it("Should return true for busted because the hand has more than two cards and is greater than 21", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.HEARTS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.SPADES);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Busted()).to.equal(true);
        });
        it("Should return false for busted because the hand is less than 21 but has 7 cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.HEARTS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.SPADES);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.CLUBS);
            var card5 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.HEARTS);
            var card6 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.SPADES);
            var card7 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3, card4, card5, card6, card7));
            chai_1.expect(hand.Busted()).to.equal(false);
        });
        it("Should return false for busted because the hand only has two cards", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
            chai_1.expect(hand.Busted()).to.equal(false);
        });
        it("Should return false for busted because the hand has an ace but is under the soft rule", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.HEARTS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
            chai_1.expect(hand.Busted()).to.equal(false);
        });
        it("Should return true for busted because the hand is over 22 even with an ace", function () {
            var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.DIAMONDS);
            var card2 = masterDeck.getCard(cardEnums_1.CardFace.TEN, cardEnums_1.Suit.DIAMONDS);
            var card3 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
            var card4 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.DIAMONDS);
            var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3, card4));
            chai_1.expect(hand.Busted()).to.equal(true);
        });
    });
});
//# sourceMappingURL=hand_tests.js.map