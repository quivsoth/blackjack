import { ICard } from "./interfaces/ICard";
import { CardFace, Suit } from "./cardEnums";

export class Card implements ICard {
    name: string;
    suit: Suit;
    cardface: CardFace;
    rank: number;
    description: string;

    constructor(_name: string, _cardFace: CardFace, _suit: Suit, _rank: number) {
        this.name = _name;
        this.suit = _suit;
        this.cardface = _cardFace;
        this.rank = _rank;
    }
}