import { Card } from "./Card";
import { CardFace, Suit } from "./cardEnums";
import { AllDeckTemplate } from "./AllDeckTemplate";
// import * as XLSX from 'ts-xlsx';

export class BlackJackDeckTemplate extends AllDeckTemplate {
    constructor() {
        super();
        this.name = "BlackJack Deck";
        this.description = "Single Deck of regular playing cards used for blackjack";

        // suits used in this game
        this.suit.push(Suit.CLUBS);
        this.suit.push(Suit.DIAMONDS);
        this.suit.push(Suit.HEARTS);
        this.suit.push(Suit.SPADES);

        // cards used in this game
        for (let suit of this.suit) {
            this.cards.push(new Card(CardFace.ACE + " of " + suit.toString(), CardFace.ACE, suit, 1));
            this.cards.push(new Card(CardFace.TWO + " of " + suit.toString(), CardFace.TWO, suit, 2));
            this.cards.push(new Card(CardFace.THREE + " of " + suit.toString(), CardFace.THREE, suit, 3));
            this.cards.push(new Card(CardFace.FOUR + " of " + suit.toString(), CardFace.FOUR, suit, 4));
            this.cards.push(new Card(CardFace.FIVE + " of " + suit.toString(), CardFace.FIVE, suit, 5));
            this.cards.push(new Card(CardFace.SIX + " of " + suit.toString(), CardFace.SIX, suit, 6));
            this.cards.push(new Card(CardFace.SEVEN + " of " + suit.toString(), CardFace.SEVEN, suit, 7));
            this.cards.push(new Card(CardFace.EIGHT + " of " + suit.toString(), CardFace.EIGHT, suit, 8));
            this.cards.push(new Card(CardFace.NINE + " of " + suit.toString(), CardFace.NINE, suit, 9));
            this.cards.push(new Card(CardFace.TEN + " of " + suit.toString(), CardFace.TEN, suit, 10));
            this.cards.push(new Card(CardFace.JACK + " of " + suit.toString(), CardFace.JACK, suit, 10));
            this.cards.push(new Card(CardFace.QUEEN + " of " + suit.toString(), CardFace.QUEEN, suit, 10));
            this.cards.push(new Card(CardFace.KING + " of " + suit.toString(), CardFace.KING, suit, 10));
        }
    }
}