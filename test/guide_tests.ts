import "mocha";
import { expect } from "chai";
import { PlayerGuide } from "../PlayerGuide";
import { CardFace, Suit, PlayerType, BlackjackOptions, GameResult } from "../cardEnums";
import { Deck } from "../Deck";
import { BlackjackHand } from "../BlackjackHand";
import { AllDeckTemplate } from "../AllDeckTemplate";
import { BlackJackDeckTemplate } from "../BlackJackDeckTemplate";
import { Card } from "../Card";
import { EDEADLK } from "constants";

describe("Tests that will evaluate the results from a player chart", function () {
    let guide: PlayerGuide = new PlayerGuide();
    let template: AllDeckTemplate = new BlackJackDeckTemplate();
    var masterDeck: Deck = new Deck(template, false);

    before(function () {
        template = new BlackJackDeckTemplate();
        masterDeck.addDecks(5, true);
    });

    it("Should return option to (d)ouble because the dealer has 5, and player has 10", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.FIVE, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.SIX, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.FOUR, Suit.DIAMONDS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.d);
    });
    it("Should return option to (sp)lit because the dealer has 5, and player has 99", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.FIVE, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.sp);
    });
    it("Should return option to (h)it because the dealer has 10, and player has 16", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.QUEEN, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.h);
    });
    it("Should return option to (s)tay because the dealer has 10, and player has 17", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.QUEEN, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.EIGHT, Suit.DIAMONDS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.s);
    });
    it("Should return option to (s)tay because the dealer has 10, and player has 99", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.JACK, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.HEARTS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.s);
    });
    it("Should return option to (s)tay as the dealer has three, and player has a soft 20", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.THREE, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.EIGHT, Suit.DIAMONDS);
        let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.s);
    });
    it("Should return option to (h)it as the dealer has two, and player has a soft 17", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.TWO, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.FIVE, Suit.DIAMONDS);
        let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.h);
    });
    it("Should return option to (h)it as the dealer has ACE, and player has a soft 18", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.FIVE, Suit.DIAMONDS);
        let card3: Card = masterDeck.getCard(CardFace.TWO, Suit.HEARTS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.h);
    });
    it("Should return option to (s)tay as the dealer has ACE, and player has a soft 19", () => {
        let dealerCard:Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
        let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
        let card2: Card = masterDeck.getCard(CardFace.FOUR, Suit.DIAMONDS);
        let card3: Card = masterDeck.getCard(CardFace.FOUR, Suit.HEARTS);
        let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
        let opts: BlackjackOptions = guide.FindGuideOption(hand, dealerCard);
        expect(opts).to.equal(BlackjackOptions.s);
    });
});