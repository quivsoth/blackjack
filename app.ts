import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Table, TablePosition } from "./Table";
import { BlackJackDeckTemplate } from "./BlackJackDeckTemplate";
import { AllDeckTemplate } from "./AllDeckTemplate";
import { CardFace, Suit, BlackjackOptions, GameResult } from "./cardEnums";
import { PlayerStrategem } from './PlayerStrategem';
import { BlackjackHand } from "./BlackjackHand";
import value from "*.json";

/* ------------------------------------------------------------------------------------------------------------------------------ */

let template: AllDeckTemplate = new BlackJackDeckTemplate();
var deck1: Deck = new Deck(template, false);
var deck2: Deck = new Deck(template, false);
var deck3: Deck = new Deck(template, false);
var deck4: Deck = new Deck(template, false);
var deck5: Deck = new Deck(template, false);
var masterDeck: Deck = new Deck(template, false);

masterDeck.push(...deck1);
masterDeck.push(...deck2);
masterDeck.push(...deck3);
masterDeck.push(...deck4);
masterDeck.push(...deck5);
masterDeck.shuffle();

let p1: TablePosition = new TablePosition(new Player());
let table: Table = new Table(masterDeck, false, new Array<TablePosition>(p1));
table.autorun();