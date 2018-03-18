import "mocha";
import { expect } from "chai";
import { PlayerStrategem } from '../PlayerStrategem';
import { Card } from "../Card";
import { CardFace, Suit, PlayerType, BlackjackOptions, GameResult } from "../cardEnums";
import { Deck } from "../Deck";
import { BlackjackHand } from "../BlackjackHand";
import { Table, TablePosition } from "../Table";
import { Player } from "../Player";
import { AllDeckTemplate } from "../AllDeckTemplate";
import { BlackJackDeckTemplate } from "../BlackJackDeckTemplate";

describe("Tests for player interaction", function () {
    let template: AllDeckTemplate;
    var deck1: Deck;
    var deck2: Deck;
    var deck3: Deck;
    var deck5: Deck;
    var deck4: Deck;
    var masterDeck: Deck;

    before(function () {
        template = new BlackJackDeckTemplate();
        deck1 = new Deck(template, false);
        deck2 = new Deck(template, false);
        deck3 = new Deck(template, false);
        deck4 = new Deck(template, false);
        deck5 = new Deck(template, false);
        masterDeck = new Deck(template, false);

        masterDeck.push(...deck1);
        masterDeck.push(...deck2);
        masterDeck.push(...deck3);
        masterDeck.push(...deck4);
        masterDeck.push(...deck5);
        masterDeck.shuffle();

        let strategy: PlayerStrategem = new PlayerStrategem();
    });
    describe("Test the table", () => {
        it("Should create a new table and assign players to it", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let p2: TablePosition = new TablePosition(new Player());
            let p3: TablePosition = new TablePosition(new Player());
            let p4: TablePosition = new TablePosition(new Player());

            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1, p2, p3, p4));
            expect(table.TableSpots.length).to.be.greaterThan(0);
        });
    });
    describe("All players have been dealt cards", () => {
        it("Should create a new table position and assign players to it", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let p2: TablePosition = new TablePosition(new Player());
            let p3: TablePosition = new TablePosition(new Player());
            let p4: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1, p2, p3, p4));
            table.deal();
            for (let i: number = 0; i < table.TableSpots.length; i++) {
                expect(table.TableSpots[i].totalHand()).to.equal((table.TableSpots[i].Hand[0].rank) + (table.TableSpots[i].Hand[1].rank));
            }
        });
    });
    describe("Tests around the Table dealt hands (results)", () => {
        it("Should have a PUSH result because both hands equal the same total", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
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

            playerhand = table.PlayerPlays(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerPlays(dealerhand);
            }
            expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(GameResult.P);
        });
        it("Should have a LOSS result because the dealers hand is higher", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
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

            playerhand = table.PlayerPlays(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerPlays(dealerhand);
            }
            expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(GameResult.L);
        });
        it("Should have a WIN result because the dealers hand is higher", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
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

            playerhand = table.PlayerPlays(dealerhand, playerhand);
            if (!playerhand.Busted()) {
                table.DealerPlays(dealerhand);
            }
            expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(GameResult.W);
        });
        it("Should make dealer hit a soft 7 but not a hard 7", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));

            let card1: Card = masterDeck.getCard(CardFace.SIX, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);
            let dealerHandSoft: BlackjackHand = new BlackjackHand();
            dealerHandSoft.AddCard(card1);
            dealerHandSoft.AddCard(card2);
            expect(dealerHandSoft.Soft()).to.equal(true);
            dealerHandSoft = table.DealerPlays(dealerHandSoft);
            expect(dealerHandSoft.length).to.be.greaterThan(2);

            let card3: Card = masterDeck.getCard(CardFace.TEN, Suit.CLUBS);
            let card4: Card = masterDeck.getCard(CardFace.SEVEN, Suit.DIAMONDS);
            let dealerHandHard: BlackjackHand = new BlackjackHand();
            dealerHandHard.AddCard(card3);
            dealerHandHard.AddCard(card4);
            expect(dealerHandHard.Soft()).to.equal(false);

            dealerHandHard = table.DealerPlays(dealerHandHard);
            expect(dealerHandHard.length).to.be.equal(2);
        });
        it("Should make dealer win with a soft hand but higher value", () => {
            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));

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

            playerhand = table.PlayerPlays(dealerhand, playerhand);
            dealerhand = table.DealerPlays(dealerhand);

            // TODO HERE NEED TO FIX THE SOFT HAND IS FORCING A HIT
            expect(table.BlackJackResult(dealerhand, playerhand)).to.equal(GameResult.L);
        });
    });

    describe("Tests around the autoPlayer", () => {
        it("Should hit based on the dealer card with strategy derived from JSON file", () => {
            let s: PlayerStrategem = new PlayerStrategem();
            expect(s.getPlayerResponse(5, 11)).to.equal(BlackjackOptions.d);
            expect(s.getPlayerResponse(2, 17)).to.equal(BlackjackOptions.s);
            expect(s.getPlayerResponse(6, 9)).to.equal(BlackjackOptions.d);
            expect(s.getPlayerResponse(7, 16)).to.equal(BlackjackOptions.h);

        });
    });
    describe("Tests around hands dealt", () => {
        it("Should return null because there is no outcome", () => {
            let card1: Card = masterDeck.getCard(CardFace.NINE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.THREE, Suit.DIAMONDS);
            let card3: Card = masterDeck.getCard(CardFace.TWO, Suit.CLUBS);
            let card4: Card = masterDeck.getCard(CardFace.NINE, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.playDealtHands(dealerhand, playerhand)).to.equal(null);
        });
        it("Should return push because both hands are blackjack", () => {
            let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.KING, Suit.SPADES);
            let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
            let card4: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.playDealtHands(dealerhand, playerhand)).to.equal(GameResult.P);
        });
        it("Should return win because player has blackjack and dealer does not", () => {
            let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.NINE, Suit.SPADES);
            let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
            let card4: Card = masterDeck.getCard(CardFace.TEN, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.playDealtHands(dealerhand, playerhand)).to.equal(GameResult.W);
        });
        it("Should return loss because dealer has blackjack and player does not", () => {
            let card1: Card = masterDeck.getCard(CardFace.ACE, Suit.CLUBS);
            let card2: Card = masterDeck.getCard(CardFace.TEN, Suit.SPADES);
            let card3: Card = masterDeck.getCard(CardFace.ACE, Suit.HEARTS);
            let card4: Card = masterDeck.getCard(CardFace.ACE, Suit.DIAMONDS);

            let p1: TablePosition = new TablePosition(new Player());
            let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
            let dealerhand: BlackjackHand = new BlackjackHand();
            let playerhand: BlackjackHand = new BlackjackHand();

            dealerhand.AddCard(card1);
            dealerhand.AddCard(card2);
            playerhand.AddCard(card3);
            playerhand.AddCard(card4);
            expect(table.playDealtHands(dealerhand, playerhand)).to.equal(GameResult.L);
        });
    });
});