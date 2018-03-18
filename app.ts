// import { CardFace, Suit, BlackjackOptions, GameResult } from "./cardEnums";
// import { BlackjackHand } from "./BlackjackHand";
// import { Card } from "./Card";

import { Deck } from "./Deck";
import { Player } from "./Player";
import { Table, TablePosition } from "./Table";
import { BlackJackDeckTemplate } from "./BlackJackDeckTemplate";
import { AllDeckTemplate } from "./AllDeckTemplate";
import { TableAutoBot } from "./TableAutoBot";

/* ------------------------------------------------------------------------------------------------------------------------------ */

let template: AllDeckTemplate = new BlackJackDeckTemplate();
var deck: Deck = new Deck(template, false);
deck.addDecks(5, true);

let p1: TablePosition = new TablePosition(new Player());
let bot: TableAutoBot = new TableAutoBot(deck, new Array<TablePosition>(p1));
bot.autorun();