import { Player } from "./Player";
import { BlackjackOptions, CardFace, GameResult, PlayerType, Game } from "./cardEnums";
import { Card } from "./Card";
import { Deck } from "./Deck";
import { BlackjackHand } from "./BlackjackHand";
import { PlayerStrategem } from './PlayerStrategem';

export class Table {
    HousePlayer: Player;
    Dealer: TablePosition;
    TableSpots: Array<TablePosition>;
    PlayingDeck: Deck;
    BurnPile: Array<Card>;
    autoplay: boolean;

    constructor(deck: Deck, _autoplay: boolean, _tablePosition: Array<TablePosition>) {
        this.autoplay = _autoplay;
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

    playDealtHands = (dealerHand: BlackjackHand, playerHand: BlackjackHand): GameResult => {
        let topCard: Card = dealerHand[0];
        console.log("Dealer Card Face up : " + topCard.cardface + "\t Not up : " + dealerHand[1].cardface);
        console.log("Player hand (first deal): " + playerHand[0].cardface + " | " + playerHand[1].cardface);

        // TODO : SPLIT Options

        if (playerHand.Blackjack()) {
            if (dealerHand.Blackjack()) {
                return GameResult.P
            }
            else {
                return GameResult.W;
            }
        }

        // todo : this is yuk

        if (topCard.cardface === CardFace.ACE) {
            topCard.rank = 1;
            // TODO : prompt for insurance
            if (dealerHand.Blackjack()) {
                return GameResult.L;
            }
        }
        return null;
    }

    playAfterDealt = (twoCardResult: GameResult, dealerHand: BlackjackHand, playerHand: BlackjackHand): GameResult => {
        // if (twoCardResult === null)
        // {
        for (let spot of this.TableSpots) {
            spot.Hand = this.PlayerPlays(dealerHand, spot.Hand);
        };

        if (playerHand.Busted()) {
            console.log("PLAYER BUSTED! ");
            return GameResult.L;
        } else {
            this.DealerPlays(dealerHand);
        }

        console.log("\nBlackjack? (Player: " + playerHand.Blackjack() + "\tDealer: " + dealerHand.Blackjack() + ")");
        console.log("Busted? (Player: " + playerHand.Busted() + "\tDealer: " + dealerHand.Busted() + ")");

        console.log("Player Final Hand: " + playerHand.Value() + "\tDealer Final Hand: " + dealerHand.Value());
        console.log("Final Result: " + this.BlackJackResult(dealerHand, playerHand) + "\n\n-------------------------------------------------");
        //}
        return this.BlackJackResult(dealerHand, playerHand);
    }

    autorun = () => {
        let cardsToRunTo: number = 40;
        if (this.PlayingDeck.length > cardsToRunTo) {
            this.deal();

            var player = this.TableSpots[0];
            var dealer = this.Dealer;
            let result: GameResult = this.playAfterDealt(this.playDealtHands(dealer.Hand, player.Hand), dealer.Hand, player.Hand);
            //eval the winner
            this.discard();
            this.autorun();
        }
        console.log("Cards remaining: " + this.PlayingDeck.length);
    }


    discard = () => {
        this.BurnPile.push(...this.Dealer.Hand.splice(0) as Array<Card>);
        for (let spot of this.TableSpots) {
            this.BurnPile.push(...spot.Hand.splice(0) as Array<Card>);
        };
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

    BlackJackResult = (dealerHand: BlackjackHand, playerHand: BlackjackHand): GameResult => {
        //todo blackjack

        if (playerHand.Busted()) {
            return GameResult.L;
        }
        else if (dealerHand.Busted()) {
            return GameResult.W;
        }
        else if (playerHand.Value() === dealerHand.Value()) {
            return GameResult.P;
        }
        else if (playerHand.Value() > dealerHand.Value()) {
            return GameResult.W;
        }
        else if (playerHand.Value() < dealerHand.Value()) {
            return GameResult.L;
        }
        return GameResult.I;
    }

    DealerPlays = (hand: BlackjackHand): BlackjackHand => {
        // console.log("DEALER PLAYS");
        // console.log("Current hand value (start) : " + hand.Value());
        // console.log("Soft hand? : " + hand.Soft());
        if (hand.Busted() || hand.Blackjack()) {
            return hand;
        }
        if (hand.Soft()) {
            let aceCard: Card = hand.filter(x => x.cardface == CardFace.ACE)[0];
            if (hand.Value() > 7 && hand.Value() < 12) {
                aceCard.rank = 11;
                return hand;
            }
            var drawCard: Card = this.PlayingDeck.getTopCard();
            hand.AddCard(drawCard);
            console.log("Dealer hits - got card : " + drawCard.cardface);
            hand = this.DealerPlays(hand);
        }
        if (hand.Value() < 17) {
            var drawCard: Card = this.PlayingDeck.getTopCard();
            hand.AddCard(drawCard);
            console.log("Dealer hits - got card : " + drawCard.cardface);
            hand = this.DealerPlays(hand);
        }
        // console.log("Current hand value (end) : " + hand.Value());
        return hand;
    }

    PlayerPlays = (dealerHand: BlackjackHand, playerHand: BlackjackHand): BlackjackHand => {
        let s: PlayerStrategem = new PlayerStrategem();
        let playerHandTotal: number = playerHand.Value();
        let dealerCardValue: number = dealerHand[0].rank;
        //todo deal with ace

        let option: BlackjackOptions = s.getPlayerResponse(dealerCardValue, playerHandTotal);

        if (option == BlackjackOptions.h) {      // || option === BlackjackOptions.d
            var drawCard: Card = this.PlayingDeck.getTopCard();
            playerHand.AddCard(drawCard);
            console.log("Player hits - got card : " + drawCard.cardface);
            playerHand = this.PlayerPlays(dealerHand, playerHand);
        }
        else if (option == BlackjackOptions.d) {
            console.log('Player doubles');
            playerHand.AddCard(this.PlayingDeck.getTopCard());
        }
        else if (option == BlackjackOptions.s) {
            console.log('Player Sticks');
        }
        return playerHand;
    }
}

export class TablePosition {
    Hand: BlackjackHand;
    Player: Player;

    constructor(player: Player) {
        this.Hand = new BlackjackHand();
        this.Player = new Player();
    }

    /* tslint:disable:typedef */
    totalHand(): number {
        let total: number = 0;
        //console.log("length: " + this.Hand.cards.length);
        if (this.Hand.length > 0) {
            total = this.Hand
                .map(function (b: Card) { return b.rank; })
                .reduce(function (p: number, c: any) { return p + c; });
        }
        return total;
    }
    /* tslint:disable:typedef */

    hit(card: Card): void {
        this.Hand.push(card);
    }
}