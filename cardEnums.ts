export enum Suit {
    "DIAMONDS" = <any>"DIAMONDS",
    "HEARTS" = <any>"HEARTS",
    "CLUBS" = <any>"CLUBS",
    "SPADES" = <any>"SPADES"
}

export enum CardFace {
    ACE = <any>"ACE",
    TWO = <any>"TWO",
    THREE = <any>"THREE",
    FOUR = <any>"FOUR",
    FIVE = <any>"FIVE",
    SIX = <any>"SIX",
    SEVEN = <any>"SEVEN",
    EIGHT = <any>"EIGHT",
    NINE = <any>"NINE",
    TEN = <any>"TEN",
    JACK = <any>"JACK",
    QUEEN = <any>"QUEEN",
    KING = <any>"KING"
}

export enum PokerCardRank {
    ACE = <any>"ACE",
    TWO = <any>"TWO",
    THREE = <any>"THREE",
    FOUR = <any>"FOUR",
    FIVE = <any>"FIVE",
    SIX = <any>"SIX",
    SEVEN = <any>"SEVEN",
    EIGHT = <any>"EIGHT",
    NINE = <any>"NINE",
    TEN = <any>"TEN",
    JACK = <any>"JACK",
    QUEEN = <any>"QUEEN",
    KING = <any>"KING"
}

export enum Game {
    Poker,
    Blackjack,
    Misere,
    ThreeCard,
    Omaha,
    Bridge,
    Canasta,
    Hearts,
    Solitaire
}

export enum PlayerType {
    House,
    Gambler
}

export enum BlackjackOptions {
    "h" = <any>"HIT",
    "s" = <any>"STICK",
    "d" = <any>"DOUBLE",
    "sp" = <any>"SPLIT",
    "su" = <any>"SURRENDER"
}

export enum GameResult {
    "W" = <any>"WIN",
    "L" = <any>"LOSE",
    "D" = <any>"DRAW",
    "P" = <any>"PUSH",
    "I" = <any>"INCONCLUSIVE"
}