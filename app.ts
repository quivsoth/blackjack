import { Player } from "./Player";
import { Table, TablePosition } from "./Table";
import { BlackJackDeckTemplate } from "./BlackJackDeckTemplate";
import { AllDeckTemplate } from "./AllDeckTemplate";
import { TableAutoBot } from "./TableAutoBot";
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import { IBlackjackResult } from "./interfaces/IBlackjackResult";
import { PlayerType } from "./cardEnums";

mongoose.connect('mongodb://localhost/local');

// const blackJackResultModel = new mongoose.Schema({
//     Players: [Player]
// });




// const User = mongoose.model<IBlackjackResult>('bj', blackJackResultModel);

// let p1: TablePosition = new TablePosition(new Player());
// let player1:Player = new Player();
// player1.playerType = PlayerType.Gambler;
// let player2:Player = new Player();
// player2.playerType = PlayerType.Gambler;
// let parray: Array<Player> = new Array<Player>();

// const result = new User({
//     Players: player1
// });

// result.save().then(() => console.log('saved'));


























// This works, reference point
export interface IUser extends mongoose.Document {
    name: string;
    age: number;
};
export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
});
const User = mongoose.model<IUser>('User', UserSchema);




export interface IClown extends mongoose.Document {
    User: IUser;
};
export const ClownSchema = new mongoose.Schema({
    User: UserSchema
});
const Clown = mongoose.model<IClown>('ClownUser', ClownSchema);

Clown.create({
    User: { name: 'tom', age: 43 }
}).then(() => console.log("added")).catch((err) =>
    console.log(err)
);








/*------------------------------------------------------------------------------------------------------------------ */
//AUTORUN BJ
// let template: AllDeckTemplate = new BlackJackDeckTemplate();
// var deck: Deck = new Deck(template, false);
// deck.addDecks(5, true);

// let p1: TablePosition = new TablePosition(new Player());
// let bot: TableAutoBot = new TableAutoBot(deck, new Array<TablePosition>(p1));
// bot.autorun();