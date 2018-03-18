"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suit;
(function (Suit) {
    Suit[Suit["DIAMONDS"] = "DIAMONDS"] = "DIAMONDS";
    Suit[Suit["HEARTS"] = "HEARTS"] = "HEARTS";
    Suit[Suit["CLUBS"] = "CLUBS"] = "CLUBS";
    Suit[Suit["SPADES"] = "SPADES"] = "SPADES";
})(Suit = exports.Suit || (exports.Suit = {}));
var CardFace;
(function (CardFace) {
    CardFace[CardFace["ACE"] = "ACE"] = "ACE";
    CardFace[CardFace["TWO"] = "TWO"] = "TWO";
    CardFace[CardFace["THREE"] = "THREE"] = "THREE";
    CardFace[CardFace["FOUR"] = "FOUR"] = "FOUR";
    CardFace[CardFace["FIVE"] = "FIVE"] = "FIVE";
    CardFace[CardFace["SIX"] = "SIX"] = "SIX";
    CardFace[CardFace["SEVEN"] = "SEVEN"] = "SEVEN";
    CardFace[CardFace["EIGHT"] = "EIGHT"] = "EIGHT";
    CardFace[CardFace["NINE"] = "NINE"] = "NINE";
    CardFace[CardFace["TEN"] = "TEN"] = "TEN";
    CardFace[CardFace["JACK"] = "JACK"] = "JACK";
    CardFace[CardFace["QUEEN"] = "QUEEN"] = "QUEEN";
    CardFace[CardFace["KING"] = "KING"] = "KING";
})(CardFace = exports.CardFace || (exports.CardFace = {}));
var PokerCardRank;
(function (PokerCardRank) {
    PokerCardRank[PokerCardRank["ACE"] = "ACE"] = "ACE";
    PokerCardRank[PokerCardRank["TWO"] = "TWO"] = "TWO";
    PokerCardRank[PokerCardRank["THREE"] = "THREE"] = "THREE";
    PokerCardRank[PokerCardRank["FOUR"] = "FOUR"] = "FOUR";
    PokerCardRank[PokerCardRank["FIVE"] = "FIVE"] = "FIVE";
    PokerCardRank[PokerCardRank["SIX"] = "SIX"] = "SIX";
    PokerCardRank[PokerCardRank["SEVEN"] = "SEVEN"] = "SEVEN";
    PokerCardRank[PokerCardRank["EIGHT"] = "EIGHT"] = "EIGHT";
    PokerCardRank[PokerCardRank["NINE"] = "NINE"] = "NINE";
    PokerCardRank[PokerCardRank["TEN"] = "TEN"] = "TEN";
    PokerCardRank[PokerCardRank["JACK"] = "JACK"] = "JACK";
    PokerCardRank[PokerCardRank["QUEEN"] = "QUEEN"] = "QUEEN";
    PokerCardRank[PokerCardRank["KING"] = "KING"] = "KING";
})(PokerCardRank = exports.PokerCardRank || (exports.PokerCardRank = {}));
var Game;
(function (Game) {
    Game[Game["Poker"] = 0] = "Poker";
    Game[Game["Blackjack"] = 1] = "Blackjack";
    Game[Game["Misere"] = 2] = "Misere";
    Game[Game["ThreeCard"] = 3] = "ThreeCard";
    Game[Game["Omaha"] = 4] = "Omaha";
    Game[Game["Bridge"] = 5] = "Bridge";
    Game[Game["Canasta"] = 6] = "Canasta";
    Game[Game["Hearts"] = 7] = "Hearts";
    Game[Game["Solitaire"] = 8] = "Solitaire";
})(Game = exports.Game || (exports.Game = {}));
var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["House"] = 0] = "House";
    PlayerType[PlayerType["Gambler"] = 1] = "Gambler";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
var BlackjackOptions;
(function (BlackjackOptions) {
    BlackjackOptions[BlackjackOptions["h"] = "HIT"] = "h";
    BlackjackOptions[BlackjackOptions["s"] = "STICK"] = "s";
    BlackjackOptions[BlackjackOptions["d"] = "DOUBLE"] = "d";
    BlackjackOptions[BlackjackOptions["sp"] = "SPLIT"] = "sp";
    BlackjackOptions[BlackjackOptions["su"] = "SURRENDER"] = "su";
})(BlackjackOptions = exports.BlackjackOptions || (exports.BlackjackOptions = {}));
var GameResult;
(function (GameResult) {
    GameResult[GameResult["W"] = "WIN"] = "W";
    GameResult[GameResult["L"] = "LOSE"] = "L";
    GameResult[GameResult["D"] = "DRAW"] = "D";
    GameResult[GameResult["P"] = "PUSH"] = "P";
    GameResult[GameResult["I"] = "INCONCLUSIVE"] = "I";
})(GameResult = exports.GameResult || (exports.GameResult = {}));
//# sourceMappingURL=cardEnums.js.map