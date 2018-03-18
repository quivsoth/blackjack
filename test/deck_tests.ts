import "mocha";
import { expect } from "chai";

import { Card } from "../Card";
import { CardFace, Suit } from "../cardEnums";
import { Deck } from "../Deck";
import { BlackjackHand } from "../BlackjackHand";
import { AllDeckTemplate } from "../AllDeckTemplate";
import { BlackJackDeckTemplate } from "../BlackJackDeckTemplate";

describe("Tests that will evaluate the options from a Blackjack hand", function () {
    let template: AllDeckTemplate;
    let deck: Deck;
    before(function () {
        template = new BlackJackDeckTemplate();
        deck = new Deck(template, false);
    });
    describe("Draw a card from the deck", () => {
        it("Should return one card based on the face and suit input (deck not shuffled)", () => {
            let myCard:Card = deck.getCard(CardFace.ACE, Suit.CLUBS);
        });
    });
    describe("Get the top card", () => {
        it("Should return the first card in the deck", () => {
            let total: number = deck.length;
            let myCard:Card = deck.getTopCard();
            expect(deck.length).to.equal(total - 1);
        });
    });
    describe("Draw a card from the deck", () => {
        it("Should return one card based on the face and suit input (deck shuffled)", () => {
            let template: AllDeckTemplate = new BlackJackDeckTemplate();
            let deck: Deck = new Deck(template, false);
            deck.shuffle();
            let myCard:Card = deck.getCard(CardFace.ACE, Suit.CLUBS);
        });
    });
});