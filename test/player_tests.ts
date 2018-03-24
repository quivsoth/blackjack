import "mocha";
import { expect } from "chai";
import { PlayerGuide } from "../PlayerGuide";
import { Card } from "../Card";
import { CardFace, Suit, PlayerType, BlackjackOptions, GameResult, Game } from "../cardEnums";
import { Deck } from "../Deck";
import { BlackjackHand } from "../BlackjackHand";
import { Table, TablePosition } from "../Table";
import { Player } from "../Player";
import { AllDeckTemplate } from "../AllDeckTemplate";
import { BlackJackDeckTemplate } from "../BlackJackDeckTemplate";
import { TableAutoBot } from "../TableAutoBot";

describe("Tests for player interaction", function () {
    let template: AllDeckTemplate = new BlackJackDeckTemplate();
    var masterDeck: Deck = new Deck(template, false);
    masterDeck.addDecks(5, true);

    before(function () {
        template = new BlackJackDeckTemplate();
        masterDeck.addDecks(5, true);

        let guide: PlayerGuide = new PlayerGuide();
    });
    describe("Test the table", () => {
        it("Should create a new table and assign players to it", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let p2: TablePosition = new TablePosition(new Player());
            let p3: TablePosition = new TablePosition(new Player());
            let p4: TablePosition = new TablePosition(new Player());

            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1, p2, p3, p4));
            expect(table.TableSpots.length).to.be.greaterThan(0);
        });
    });
    describe("Tests around the Table dealt hands (results)", () => {
        it("Should have a PUSH result because both hands equal the same total", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            let playerCard1: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
            let playerCard2: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);
            let dealerCard1: Card = masterDeck.getCard(CardFace.NINE, Suit.SPADES);
            let dealerCard2: Card = masterDeck.getCard(CardFace.EIGHT, Suit.CLUBS);

            let dealerhand: BlackjackHand = new BlackjackHand();
            dealerhand.AddCard(dealerCard1);
            dealerhand.AddCard(dealerCard2);

            let playerhand: BlackjackHand = new BlackjackHand();
            playerhand.AddCard(playerCard1);
            playerhand.AddCard(playerCard2);

            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerHandAutoPlay(dealerhand);
            }
            expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(GameResult.P);
        });
        it("Should have a LOSS result because the dealers hand is higher", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            let card1: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
            let card3: Card = masterDeck.getCard(CardFace.NINE, Suit.SPADES);
            let card4: Card = masterDeck.getCard(CardFace.EIGHT, Suit.CLUBS);

            let dealerhand: BlackjackHand = new BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);

            let playerhand: BlackjackHand = new BlackjackHand();
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);

            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerHandAutoPlay(dealerhand);
            }
            expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(GameResult.L);
        });
        it("Should have a WIN result because the dealers hand is higher", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            let card1: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);
            let card3: Card = masterDeck.getCard(CardFace.JACK, Suit.SPADES);
            let card4: Card = masterDeck.getCard(CardFace.KING, Suit.CLUBS);

            let dealerhand: BlackjackHand = new BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);

            let playerhand: BlackjackHand = new BlackjackHand();
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);

            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerHandAutoPlay(dealerhand);
            }
            expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(GameResult.W);
        });
        it("Should make dealer hit a soft 7 but not a hard 7", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));

            let card1: Card = masterDeck.getCard(CardFace.SIX, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
            let dealerHandSoft: BlackjackHand = new BlackjackHand();
            dealerHandSoft.AddCard(card1);
            dealerHandSoft.AddCard(card2);
            expect(dealerHandSoft.Soft()).to.equal(true);
            dealerHandSoft = table.DealerHandAutoPlay(dealerHandSoft);
            expect(dealerHandSoft.length).to.be.greaterThan(2);

            let card3: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
            let card4: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);
            let dealerHandHard: BlackjackHand = new BlackjackHand();
            dealerHandHard.AddCard(card3);
            dealerHandHard.AddCard(card4);
            expect(dealerHandHard.Soft()).to.equal(false);

            dealerHandHard = table.DealerHandAutoPlay(dealerHandHard);
            expect(dealerHandHard.length).to.be.equal(2);
        });
        it("Should make dealer win with a soft hand but higher value", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));

            let card1: Card = masterDeck.getCard(CardFace.SEVEN, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
            let card3: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
            let card4: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);

            let playerhand: BlackjackHand = new BlackjackHand();
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);

            let dealerhand: BlackjackHand = new BlackjackHand();
            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);

            playerhand = table.PlayerHandAutoPlay(dealerhand, playerhand);
            dealerhand = table.DealerHandAutoPlay(dealerhand);

            // TODO HERE NEED TO FIX THE SOFT HAND IS FORCING A HIT
            expect(table.HandRoundResult(dealerhand, playerhand)).to.equal(GameResult.L);
        });
    });
    describe("Tests around hands dealt", () => {
        // it("Should return null because there is no outcome", () => {
        //     let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
        //     let card2: Card = masterDeck.getCard(CardFace.THREE, Suit.DIAMONDS);
        //     let card3: Card = masterDeck.getCard(CardFace.TWO, Suit.CLUBS);
        //     let card4: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);

        //     let p1: TablePosition = new TablePosition(new Player());
        //     let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
        //     let dealerhand: BlackjackHand = new BlackjackHand();
        //     let playerhand: BlackjackHand = new BlackjackHand();

        //     dealerhand.AddCard(card1);
        //     dealerhand.AddCard(card2);
        //     playerhand.AddCard(card3);
        //     playerhand.AddCard(card4);
        //     expect(table.play(dealerhand, playerhand)).to.equal(null);
        // });
        it("Should return push because both hands are blackjack", () => {
            let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.KING, Suit.SPADES);
            let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
            let card4: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.play(dealerhand, playerhand)).to.equal(GameResult.P);
        });
        it("Should return win because player has blackjack and dealer does not", () => {
            let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.SPADES);
            let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
            let card4: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.play(dealerhand, playerhand)).to.equal(GameResult.W);
        });
        it("Should return loss because dealer has blackjack and player does not", () => {
            let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.TEN, Suit.SPADES);
            let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
            let card4: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.play(dealerhand, playerhand)).to.equal(GameResult.L);
        });
        it("Should return dealer spartan", () => {
            // console.log("\n\nsparta!!\n--\n");
            // let card1: Card = masterDeck.getCard(CardFace.SIX, Suit.CLUBS);
            // let card2: Card = masterDeck.getCard(CardFace.TWO, Suit.SPADES);
            // let card3: Card = masterDeck.getCard(CardFace.FOUR, Suit.HEARTS);
            // let card4: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);
            // let card5: Card = masterDeck.getCard(CardFace.THREE, Suit.HEARTS);
            // let card6: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
            // let card7: Card = masterDeck.getCard(CardFace.SIX, Suit.DIAMONDS);

            // let dealerhand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card1, card2, card3, card4));
            // let playerhand: BlackjackHand = new BlackjackHand().AddCards(new Array<Card>(card5, card6, card7));
            // let p1: TablePosition = new TablePosition(new Player());
            // let table: TableAutoBot = new TableAutoBot(masterDeck, new Array<TablePosition>(p1));

            // //let result: GameResult = table.play(dealerhand, playerhand);

            // let result: GameResult = table.HandRoundResult(dealerhand, playerhand);
            // console.log(result);
        });
    });
});


//TODO why did this hit 17 on a two?????


// Hand Number# 26
// 1) Dealer Card Face up : TWO     Not up : THREE                 Dealer Total: 5
// 2) Player hand (first deal): FIVE | ACE                 Player Total: 6
// 2#) Player hits - got card : TEN                                Player Total: 16
// 2#) Player hits - got card : ACE                                Player Total: 17
// 2#) Player hits - got card : SIX                                Player Total: 23
// 2c) Player BUSTED!
// 4) Player Final Hand: 23        Dealer Final Hand: 5            LOSE
