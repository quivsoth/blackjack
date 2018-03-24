import { Player } from "./Player";
import { BlackjackOptions, CardFace, GameResult, PlayerType, Game } from "./cardEnums";
import { Card } from "./Card";
import { Deck } from "./Deck";
import { BlackjackHand } from "./BlackjackHand";
import { PlayerGuide } from "./PlayerGuide";

export class Table {
    HousePlayer: Player;
    Dealer: TablePosition;
    TableSpots: Array<TablePosition>;
    PlayingDeck: Deck;
    BurnPile: Array<Card>;
    autoplay: boolean;
    mustHitSoftSevente: boolean;

    constructor(deck: Deck, _tablePosition: Array<TablePosition>) {

        this.TableSpots = new Array<TablePosition>();

        // always has a deck
        this.PlayingDeck = deck;

        // always has a house player
        this.Dealer = new TablePosition(new Player());
        this.Dealer.Player.playerType = PlayerType.House;

        // burn Pile
        this.BurnPile = new Array<Card>();

        // needs at least one player
        if (_tablePosition.length >= 0) {
            for (let spot of _tablePosition) {
                spot.Player.playerType = PlayerType.Gambler;
                this.TableSpots.push(spot);
            }
        } /*else {} todo: need to fix when there's no players */
    }

    deal = () => {
        const cardsToDeal: number = 2;
        for (var i: number = 0; i < cardsToDeal; i++) {
            this.Dealer.Hand.AddCard(this.PlayingDeck.pop());
            for (let spots of this.TableSpots) {
                spots.Hand.AddCard(this.PlayingDeck.pop());
            }
        }
    }

    discard = () => {
        // Clean Up - todo this is ugly, the ace is not resetting - by ref by val
        let aces: Card[] = this.Dealer.Hand.filter(x => x.cardface === CardFace.ACE);
        if (aces.length > 0) {
            for (let c of aces) {
                c.rank = 1;
            }
        }
        this.BurnPile.push(...this.Dealer.Hand.splice(0) as Array<Card>);
        for (let spot of this.TableSpots) {
            this.BurnPile.push(...spot.Hand.splice(0) as Array<Card>);
        };
    }

    HandRoundResult = (dealerHand: BlackjackHand, playerHand: BlackjackHand): GameResult => {

        if (playerHand.Blackjack() && !dealerHand.Blackjack()) {
            return GameResult.W;
        }
        else if (playerHand.Blackjack() && dealerHand.Blackjack()) {
            return GameResult.P;
        }
        else if (!playerHand.Blackjack() && dealerHand.Blackjack()) {
            return GameResult.L;
        }
        if (playerHand.Busted()) {
            return GameResult.L;
        }
        else if (dealerHand.Busted()) {
            return GameResult.W;
        }

        let softTotalPlayer: number = playerHand.Value();
        let softTotalDealer: number = dealerHand.Value();
        if (playerHand.Soft()) { playerHand.Value() < 12 ? softTotalPlayer += 10 : playerHand.Value(); }
        if (dealerHand.Soft()) { dealerHand.Value() < 12 ? softTotalDealer += 10 : dealerHand.Value(); }
        // console.log("softTotalPlayer .. " + softTotalPlayer);
        // console.log("softTotalDealer .. " + softTotalDealer);
        if (softTotalPlayer === softTotalDealer) {
            return GameResult.P;
        }
        else if (softTotalPlayer > softTotalDealer) {
            return GameResult.W;
        }
        else if (softTotalPlayer < softTotalDealer) {
            return GameResult.L;
        }

        // if (playerHand.Soft() || dealerHand.Soft()) {
        //     let softTotalPlayer: number = playerHand.Value();
        //     let softTotalDealer: number = dealerHand.Value();
        //     if (playerHand.Value() < 12 && playerHand.Soft()) softTotalPlayer += 10;
        //     if (dealerHand.Value() < 12 && dealerHand.Soft()) softTotalDealer += 10;
            
        //     if (softTotalPlayer === softTotalDealer) {
        //         return GameResult.P;
        //     }
        //     if (!playerHand.Soft() && dealerHand.Soft()) {
        //         if (playerHand.Value() === softTotalDealer) {
        //             return GameResult.P;
        //         }
        //     }
        //     if (playerHand.Soft() && !dealerHand.Soft()) {
        //         console.log("this palyer soft, dealer hard");
        //         if (dealerHand.Value() === softTotalPlayer) {
        //             return GameResult.P;
        //         }
        //     }
        // }
        // else if (playerHand.Value() === dealerHand.Value()) {
        //     return GameResult.P;
        // }
        // else if (playerHand.Value() > dealerHand.Value()) {
        //     return GameResult.W;
        // }
        // else if (playerHand.Value() < dealerHand.Value()) {
        //     return GameResult.L;
        // }
        return GameResult.I;
    }
}

export class TablePosition {
    Hand: BlackjackHand;
    Player: Player;
    constructor(player: Player) {
        this.Hand = new BlackjackHand();
        this.Player = new Player();
    }
}