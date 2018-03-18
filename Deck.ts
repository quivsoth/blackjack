import { Card } from "./Card";
import { IGameTemplate } from "./interfaces/IGameTemplate";
import { CardFace, Suit } from "./cardEnums";

export class Deck extends Array<Card> {
    constructor(_template: IGameTemplate, autoShuffle: boolean) {
        super();

        this.push(..._template.cards);
        if (autoShuffle) {
            this.shuffle();
        }
    }
    shuffle = () => {
        //console.log("Shuffling....");
        for (let i: number = this.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
    getTopCard = function(): Card {
        //return this.filter(x => x.cardface == _face)[0];
        return this.pop();
    }

    getCard = function(_face: CardFace, _suit: Suit): Card {
        return this.filter(x => x.cardface == _face)[0];
    }
    getMultipleOfSameCard(_face: CardFace, _suit: Suit): Array<Card> {
        return this.filter(x => x.cardface == CardFace.ACE);
    }
}