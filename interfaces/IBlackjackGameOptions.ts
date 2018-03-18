export interface IBlackjackGameOptions {
    isActive: boolean;

    Blackjack();
    Busted();
    Double();
    Split();
    Soft();
    Value();
}

export interface PlayerChart {
    Hand: string;
    TWO: string;
    THREE: string;
    FOUR: string;
    FIVE: string;
    SIX: string;
    SEVEN: string;
    EIGHT: string;
    NINE: string;
    TEN: string;
    ACE: string;
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