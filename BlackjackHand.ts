import { Card } from "./Card";
import { CardFace } from "./cardEnums";
import { IBlackjackGameOptions } from "./interfaces/IBlackjackGameOptions";

// todo change this to a generic hand instead of building for blackjack
export class BlackjackHand extends Array<Card> implements IBlackjackGameOptions {
    isActive: boolean;
    constructor() {
        super();
        // todo
        this.isActive = true;
    }

    AddCard = (card: Card): BlackjackHand => {
        this.push(card);
        //console.log("Adding Card: " + card.name + " of " + card.cardface);
        return this;
    }

    AddCards = (cards: Array<Card>): BlackjackHand => {
        this.push(...cards);
        return this;
    }

    Blackjack = (): boolean => {
        if (this.length === 2) {
            if (this.HasAce()
                && (this.filter(x => x.cardface == CardFace.KING).length == 1
                    || this.filter(x => x.cardface == CardFace.QUEEN).length == 1
                    || this.filter(x => x.cardface == CardFace.JACK).length == 1
                    || this.filter(x => x.cardface == CardFace.TEN).length == 1)) {
                return true;
            }
        }
        return false;
    }

    Busted = (): boolean => {
        if (this.Value() > 21) {
            return true;
        }
        return false;
    }

    Double = (): boolean => {
        if (this.length === 2) {
            return true;
        }
        return false;
    }

    HasAce = (): boolean => {
        if (this.filter(x => x.cardface == CardFace.ACE).length >= 1) {
            return true;
        }
        return false;
    }

    Hit = (): boolean => {
        if (this.Value() < 21) {
            return true;
        }
        return false;
    }

    Soft = (): boolean => {
        // 5 3 A A
        let hasAce: number = this.filter(x => x.cardface == CardFace.ACE).length;
        if (hasAce >= 1) {
            if (this.Value() <= 11) {
                return true;
            }
        }
        return false;
    }

    Split = (): boolean => {
        if (this.length === 2) {
            if (this[0].cardface === this[1].cardface) {
                return true;
            }
        }
        return false;
    }

    Value = (): number => {
        var total: number = this
            .map(function (b: Card) { return b.rank; })
            .reduce(function (p: number, c: any) { return p + c; });
        return total;
    }
}