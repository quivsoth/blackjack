import { Card } from "./Card";
import { CardFace, Suit } from "./cardEnums";
import { IGameTemplate } from "./interfaces/IGameTemplate";

export abstract class AllDeckTemplate implements IGameTemplate {
    name: string;
    suit: Suit[];
    cards: Card[];
    description: string;
    constructor() {

        this.suit = new Array();
        this.cards = new Array();

        this.name = "All cards Template";
        this.description = "Builds all the cards and suits of a typical playing cards set";
    }
}