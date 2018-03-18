"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_1 = require("./Deck");
var Player_1 = require("./Player");
var Table_1 = require("./Table");
var BlackJackDeckTemplate_1 = require("./BlackJackDeckTemplate");
/* ------------------------------------------------------------------------------------------------------------------------------ */
var template = new BlackJackDeckTemplate_1.BlackJackDeckTemplate();
var deck1 = new Deck_1.Deck(template, false);
var deck2 = new Deck_1.Deck(template, false);
var deck3 = new Deck_1.Deck(template, false);
var deck4 = new Deck_1.Deck(template, false);
var deck5 = new Deck_1.Deck(template, false);
var masterDeck = new Deck_1.Deck(template, false);
masterDeck.push.apply(masterDeck, deck1);
masterDeck.push.apply(masterDeck, deck2);
masterDeck.push.apply(masterDeck, deck3);
masterDeck.push.apply(masterDeck, deck4);
masterDeck.push.apply(masterDeck, deck5);
masterDeck.shuffle();
var p1 = new Table_1.TablePosition(new Player_1.Player());
var table = new Table_1.Table(masterDeck, false, new Array(p1));
table.autorun();
//# sourceMappingURL=app.js.map