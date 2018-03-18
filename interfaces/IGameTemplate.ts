import { CardFace, Suit } from "../cardEnums";
import { Card } from "../Card";

export interface IGameTemplate {
    name: string;
    suit: Array<Suit>;
    cards: Array<Card>;
    description: string;
}