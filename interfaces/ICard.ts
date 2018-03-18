import { CardFace, Suit } from "../cardEnums";

export interface ICard {
    name: string;
    suit: Suit;
    cardface: CardFace;
    rank: number;
    description: string;
}