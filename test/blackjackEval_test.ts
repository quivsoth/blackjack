"use strict";
import "mocha";
import "chai";
import { expect } from "chai";
import { Card } from "../Card";
import { CardFace, Suit } from "../cardEnums";
import { Deck } from "../Deck";
import { BlackjackHand } from "../BlackjackHand";
import { AllDeckTemplate } from "../AllDeckTemplate";
import { BlackJackDeckTemplate } from "../BlackJackDeckTemplate";

describe("Tests that will evaluate the options from a Blackjack hand", function () {
  let template: AllDeckTemplate;
  var deck1: Deck;
  var deck2: Deck;
  var deck3: Deck;
  var deck4: Deck;
  var deck5: Deck;
  var masterDeck: Deck;

  before(function () {
    template = new BlackJackDeckTemplate();
    deck1 = new Deck(template, false);
    deck2 = new Deck(template, false);
    deck3 = new Deck(template, false);
    deck4 = new Deck(template, false);
    deck5 = new Deck(template, false);
    masterDeck = new Deck(template, false);

    masterDeck.push(...deck1);
    masterDeck.push(...deck2);
    masterDeck.push(...deck3);
    masterDeck.push(...deck4);
    masterDeck.push(...deck5);
    masterDeck.shuffle();
  });
  describe("Is able to double hand", () => {
    it("Should return true because I only have 2 cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Double()).to.equal(true);
    });
    it("Should return false because I have 3 cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.FIVE, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Double()).to.equal(false);
    });
    it("Should return false because  I have lots of cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.KING, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.TWO, Suit.SPADES);
      let card4: Card = masterDeck.getCard(CardFace.FIVE, Suit.DIAMONDS);
      let card5: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4, card5));
      expect(hand.Split()).to.equal(false);
    });
  });
  describe("Is able to split hand", () => {
    it("Should return true because the hand can split", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Split()).to.equal(true);
    });
    it("Should return false because the hand cannot split", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.FIVE, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Split()).to.equal(false);
    });
    it("Should return false because the hand has 3 cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Split()).to.equal(false);
    });
  });
  describe("Is my hand blackjack?", () => {
    it("Should return true because my hand is Blackjack, I must have an Ace and face or ten and I must only have 2 cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.KING, Suit.CLUBS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Blackjack()).to.equal(true);
    });
    it("Should return false because my hand is not Blackjack, I have more than 2 cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.KING, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.SPADES);
      let card4: Card = masterDeck.getCard(CardFace.QUEEN, Suit.CLUBS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Blackjack()).to.equal(false);
    });
    it("Should return false because my hand is not Blackjack, I am missing an ace", () => {
      let card1: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.KING, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Blackjack()).to.equal(false);
    });
    it("Should return true because my hand is not Blackjack, I am missing a face or a ten", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Blackjack()).to.equal(false);
    });
  });
  describe("Is a soft hand", () => {
    it("Should return true because the hand has an ace and is less than 9", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.EIGHT, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Soft()).to.equal(true);
    });
    it("Should return true because the hand has an ace and is less than 9 (with more cards)", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.TWO, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.TWO, Suit.HEARTS);
      let card4: Card = masterDeck.getCard(CardFace.TWO, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4));
      expect(hand.Soft()).to.equal(true);
    });
    it("Should return false because the hand is greater than 11 (hand is 12)", () => {
      let card1: Card = masterDeck.getCard(CardFace.FIVE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.FIVE, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
      let card4: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4));
      expect(hand.Soft()).to.equal(false);
    });
    it("Should return false because the hand has an ace but is greater than 11", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.THREE, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.FOUR, Suit.HEARTS);
      let card4: Card = masterDeck.getCard(CardFace.FOUR, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4));
      expect(hand.Soft()).to.equal(false);
    });
    it("Should return false because the hand has an ace but is greater than 11", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
      let card2: Card = masterDeck.getCard(CardFace.SIX, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.JACK, Suit.HEARTS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Soft()).to.equal(false);
    });
    it("Should return false because there is no ace (even if its less/equal than 10)", () => {
      let card1: Card = masterDeck.getCard(CardFace.THREE, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.THREE, Suit.HEARTS);
      let card3: Card = masterDeck.getCard(CardFace.FOUR, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Soft()).to.equal(false);
    });
    it("Should return false because there is no ace (and greater than 10)", () => {
      let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.THREE, Suit.HEARTS);
      let card3: Card = masterDeck.getCard(CardFace.FOUR, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Soft()).to.equal(false);
    });
  });
  describe("Is hand busted", () => {
    it("Should return true for busted because the hand has more than two cards and is greater than 21", () => {
      let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.HEARTS);
      let card3: Card = masterDeck.getCard(CardFace.TEN, Suit.SPADES);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Busted()).to.equal(true);
    });
    it("Should return false for busted because the hand is less than 21 but has 7 cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.TWO, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.TWO, Suit.HEARTS);
      let card3: Card = masterDeck.getCard(CardFace.THREE, Suit.SPADES);
      let card4: Card = masterDeck.getCard(CardFace.TWO, Suit.CLUBS);
      let card5: Card = masterDeck.getCard(CardFace.FOUR, Suit.HEARTS);
      let card6: Card = masterDeck.getCard(CardFace.TWO, Suit.SPADES);
      let card7: Card = masterDeck.getCard(CardFace.TWO, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4, card5, card6, card7));
      expect(hand.Busted()).to.equal(false);
    });
    it("Should return false for busted because the hand only has two cards", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2));
      expect(hand.Busted()).to.equal(false);
    });
    it("Should return false for busted because the hand has an ace but is under the soft rule", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.TEN, Suit.HEARTS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3));
      expect(hand.Busted()).to.equal(false);
    });
    it("Should return true for busted because the hand is over 22 even with an ace", () => {
      let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
      let card2: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);
      let card3: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
      let card4: Card = masterDeck.getCard(CardFace.TWO, Suit.DIAMONDS);
      let hand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4));
      expect(hand.Busted()).to.equal(true);
    });
  });
});