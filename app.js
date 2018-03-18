"use strict";
// import { CardFace, Suit, BlackjackOptions, GameResult } from "./cardEnums";
// import { BlackjackHand } from "./BlackjackHand";
// import { Card } from "./Card";
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_1 = require("./Deck");
var Player_1 = require("./Player");
var Table_1 = require("./Table");
var BlackJackDeckTemplate_1 = require("./BlackJackDeckTemplate");
var TableAutoBot_1 = require("./TableAutoBot");
/* ------------------------------------------------------------------------------------------------------------------------------ */
var template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
var deck = new Deck_1.Deck(template, false);
deck.addDecks(5, true);
var p1 = new Table_1.TablePosition(new Player_1.Player());
var bot = new TableAutoBot_1.TableAutoBot(deck, new Array(p1));
bot.autorun();
//# sourceMappingURL=app.js.map