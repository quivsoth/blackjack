"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/local');
;
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
});
var User = mongoose.model('User', exports.UserSchema);
;
exports.ClownSchema = new mongoose.Schema({
    User: exports.UserSchema
});
var Clown = mongoose.model('ClownUser', exports.ClownSchema);
Clown.create({
    User: { name: 'tom', age: 43 }
}).then(function () { return console.log("added"); }).catch(function (err) {
    return console.log(err);
});
/*------------------------------------------------------------------------------------------------------------------ */
//AUTORUN BJ
// let template: AllDeckTemplate = new BlackJackDeckTemplate();
// var deck: Deck = new Deck(template, false);
// deck.addDecks(5, true);
// let p1: TablePosition = new TablePosition(new Player());
// let bot: TableAutoBot = new TableAutoBot(deck, new Array<TablePosition>(p1));
// bot.autorun(); 
//# sourceMappingURL=app.js.map