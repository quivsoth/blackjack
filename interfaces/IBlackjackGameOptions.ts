export interface IBlackjackGameOptions {
    isActive: boolean;

    Blackjack();
    Busted();
    Double();
    Split();
    Soft();
    Value();
}

export interface BJTacticianer {
    dealer: Array<object>;
}

export class DealerChart {
    dealerHand: number;
    hand: Array<PlayerChart>;
}

export interface PlayerChart {
    playerHand: string;
    value: string;
}