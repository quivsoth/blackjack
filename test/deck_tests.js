"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var cardEnums_1 = require("../cardEnums");
var Deck_1 = require("../Deck");
var BlackJackDeckTemplate_1 = require("../BlackJackDeckTemplate");
describe("Tests that will evaluate the options from a Blackjack hand", function () {
    var template;
    var deck;
    before(function () {
        template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
        deck = new Deck_1.Deck(template, false);
    });
    describe("Draw a card from the deck", function () {
        it("Should return one card based on the face and suit input (deck not shuffled)", function () {
            var myCard = deck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        });
    });
    describe("Get the top card", function () {
        it("Should return the first card in the deck", function () {
            var total = deck.length;
            var myCard = deck.getTopCard();
            chai_1.expect(deck.length).to.equal(total - 1);
        });
    });
    describe("Draw a card from the deck", function () {
        it("Should return one card based on the face and suit input (deck shuffled)", function () {
            var template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
            var deck = new Deck_1.Deck(template, false);
            deck.shuffle();
            var myCard = deck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        });
    });
});
//# sourceMappingURL=deck_tests.js.map