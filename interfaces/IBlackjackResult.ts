import * as mongoose from 'mongoose';
import { Player } from "../Player";
import { Table, TablePosition } from "../Table";
import { BlackjackHand } from "../BlackjackHand";
import { BlackJackDeckTemplate } from "../BlackJackDeckTemplate";
import { AllDeckTemplate } from "../AllDeckTemplate";

export interface IBlackjackResult extends mongoose.Document {
    Players: Player;
    // Players: Array<Player>;
    // TablePosition: TablePosition;
};