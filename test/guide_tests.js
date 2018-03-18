"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var PlayerGuide_1 = require("../PlayerGuide");
var cardEnums_1 = require("../cardEnums");
var Deck_1 = require("../Deck");
var BlackjackHand_1 = require("../BlackjackHand");
var BlackJackDeckTemplate_1 = require("../BlackJackDeckTemplate");
describe("Tests that will evaluate the results from a player chart", function () {
    var guide = new PlayerGuide_1.PlayerGuide();
    var template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
    var masterDeck = new Deck_1.Deck(template, false);
    before(function () {
        template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
        masterDeck.addDecks(5, true);
    });
    it("Should return option to (d)ouble because the dealer has 5, and player has 10", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.SIX, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.DIAMONDS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.d);
    });
    it("Should return option to (sp)lit because the dealer has 5, and player has 99", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.DIAMONDS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.sp);
    });
    it("Should return option to (h)it because the dealer has 10, and player has 16", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.QUEEN, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.SEVEN, cardEnums_1.Suit.DIAMONDS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.h);
    });
    it("Should return option to (s)tay because the dealer has 10, and player has 17", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.QUEEN, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.EIGHT, cardEnums_1.Suit.DIAMONDS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.s);
    });
    it("Should return option to (s)tay because the dealer has 10, and player has 99", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.JACK, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.NINE, cardEnums_1.Suit.HEARTS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.s);
    });
    it("Should return option to (s)tay as the dealer has three, and player has a soft 20", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.THREE, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.EIGHT, cardEnums_1.Suit.DIAMONDS);
        var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.s);
    });
    it("Should return option to (h)it as the dealer has two, and player has a soft 17", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.DIAMONDS);
        var card3 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.HEARTS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.h);
    });
    it("Should return option to (h)it as the dealer has ACE, and player has a soft 18", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.FIVE, cardEnums_1.Suit.DIAMONDS);
        var card3 = masterDeck.getCard(cardEnums_1.CardFace.TWO, cardEnums_1.Suit.HEARTS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.h);
    });
    it("Should return option to (s)tay as the dealer has ACE, and player has a soft 19", function () {
        var dealerCard = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        var card1 = masterDeck.getCard(cardEnums_1.CardFace.ACE, cardEnums_1.Suit.CLUBS);
        var card2 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.DIAMONDS);
        var card3 = masterDeck.getCard(cardEnums_1.CardFace.FOUR, cardEnums_1.Suit.HEARTS);
        var hand = new BlackjackHand_1.BlackjackHand().AddCards(new Array(card1, card2, card3));
        var opts = guide.FindGuideOption(hand, dealerCard);
        chai_1.expect(opts).to.equal(cardEnums_1.BlackjackOptions.s);
    });
});
//# sourceMappingURL=guide_tests.js.map