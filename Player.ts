import { PlayerType } from "./cardEnums";

export class Player {

    playerType: PlayerType;
    bankRoll: number;

    constructor() {
        this.bankRoll = 0;
    }
}