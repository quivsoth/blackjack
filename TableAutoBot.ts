import { Player } from "./Player";
import { BlackjackOptions, CardFace, GameResult, PlayerType, Game, Suit } from "./cardEnums";
import { Card } from "./Card";
import { Deck } from "./Deck";
import { BlackjackHand } from "./BlackjackHand";
import { PlayerGuide } from "./PlayerGuide";
import { Table, TablePosition } from "./Table";

export class TableAutoBot extends Table {

    handnumber: number;

    constructor(deck: Deck, _tablePosition: Array<TablePosition>) {
        super(deck, _tablePosition);
        this.handnumber = 0;
    }


    autorun = () => {
        console.log("Hand Number# " + this.handnumber );
        let cardsToRunTo: number = 40;
        if (this.PlayingDeck.length > cardsToRunTo) {

            // var acetracker: Card = this.PlayingDeck.getCard(CardFace.ACE, Suit.CLUBS);
            // console.log("Acetracker: " + acetracker.rank);
            var player = this.TableSpots[0];
            var dealer = this.Dealer;
            this.deal();

            let result: GameResult = this.play(dealer.Hand, player.Hand);

            //Messages
            console.log("4) Player Final Hand: " + player.Hand.Value() + "\tDealer Final Hand: " + dealer.Hand.Value() + "\t\t" + result);
            //console.log("\n6) Final result: " + result);
            console.log("\n---------------------------------------------------------------------------------\n");

            this.discard();
            this.handnumber +=1;
            this.autorun();
        }
        //console.log("Cards remaining: " + this.PlayingDeck.length);
    }

    play = (dealerHand: BlackjackHand, playerHand: BlackjackHand): GameResult => {
        console.log("1) Dealer Card Face up : " + dealerHand[0].cardface + "\t Not up : " + dealerHand[1].cardface + "\t\t\tDealer Total: " + dealerHand.Value());
        console.log("2) Player hand (first deal): " + playerHand[0].cardface + " | " + playerHand[1].cardface + "\t\t\tPlayer Total: " + playerHand.Value());
        let result: GameResult = GameResult.I;

        // TODO : SPLIT Options

        // Player / Dealer Blackjack
        if (playerHand.Blackjack()) {
            if (dealerHand.Blackjack()) {
                console.log("3a) Double Blackjack PUSH");
                result = GameResult.P;
            }
            else {
                console.log("3b) Player Blackjack WIN");
                result = GameResult.W;
            }
        } else if (dealerHand.Blackjack()) {
            console.log("3c) Dealer blackjack LOSE");
            result = GameResult.L;
        }

        // Cannot find result,
        if (result === GameResult.I) {
            result = this.autoRunOutAfterDealt(dealerHand, playerHand);
        }
        return result;
    }

    autoRunOutAfterDealt = (dealerHand: BlackjackHand, playerHand: BlackjackHand): GameResult => {
        let result: GameResult = GameResult.I;
        // All the players play their end
        // for (let spot of this.TableSpots) {
        //     spot.Hand = this.PlayerHandAutoPlay(dealerHand, spot.Hand);
        // };
        this.PlayerHandAutoPlay(dealerHand, playerHand);
        if (playerHand.Busted()) {
            console.log("2c) Player BUSTED!");
            result = GameResult.L;
        } else {
            this.DealerHandAutoPlay(dealerHand);
        }
        if (dealerHand.Busted()) {
            console.log("3c) Dealer BUSTED!");
            result = GameResult.W;
        }
        if (result === GameResult.I) {
            result = this.HandRoundResult(dealerHand, playerHand);
        }
        return result;
    }

    DealerHandAutoPlay = (hand: BlackjackHand): BlackjackHand => {
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
            if (hand.Value() <= 17) {
                var drawCard: Card = this.PlayingDeck.getTopCard();
                hand.AddCard(drawCard);
                console.log("3#) Dealer hits - got card : " + drawCard.cardface + "\t\t\t\tDealer Total: " + hand.Value());
                hand = this.DealerHandAutoPlay(hand);
            }
        }
        if (hand.Value() < 17) {
            var drawCard: Card = this.PlayingDeck.getTopCard();
            hand.AddCard(drawCard);
            console.log("3#) Dealer hits - got card : " + drawCard.cardface + "\t\t\t\tDealer Total: " + hand.Value());
            hand = this.DealerHandAutoPlay(hand);
        }
        return hand;
    }

    PlayerHandAutoPlay = (dealerHand: BlackjackHand, playerHand: BlackjackHand): BlackjackHand => {
        if (playerHand.Busted()) { return playerHand; }
        let guide: PlayerGuide = new PlayerGuide();
        let playerHandTotal: number = playerHand.Value();
        let dealerCardValue: number = dealerHand[0].rank;
        let option: BlackjackOptions = guide.FindGuideOption(playerHand, dealerHand[0]);

        //console.log("guide option: " + option);
        if (option == BlackjackOptions.h) {      // || option === BlackjackOptions.d
            var drawCard: Card = this.PlayingDeck.getTopCard();
            playerHand.AddCard(drawCard);
            console.log("2#) Player hits - got card : " + drawCard.cardface + "\t\t\t\tPlayer Total: " + playerHand.Value());
            playerHand = this.PlayerHandAutoPlay(dealerHand, playerHand);
        }
        else if (option == BlackjackOptions.d) {
            var drawCard: Card = this.PlayingDeck.getTopCard();
            playerHand.AddCard(drawCard);
            console.log("2#) Double Down!! Got card : " + drawCard.cardface + "\t\t\t\tPlayer Total: " + playerHand.Value());
        }
        return playerHand;
    }
}