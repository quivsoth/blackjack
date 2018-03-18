import * as XLSX from 'ts-xlsx';
import { PlayerChart } from "./interfaces/IBlackjackGameOptions";
import { BlackjackHand } from "./BlackjackHand";
import { BlackjackOptions, CardFace } from './cardEnums';
import { Card } from './Card';
import * as converter from 'number-to-words';

export class PlayerGuide extends Array<PlayerChart> {
    constructor() {
        super();
        let wb: XLSX.IWorkBook = XLSX.readFile("./stratagem.xlsx", null);
        let sheet: any = XLSX.utils.sheet_to_json(wb.Sheets["Sheet1"]);
        this.push(...<any>sheet);
    }

    FindGuideOption = (playerHand: BlackjackHand, dealerCard: Card): BlackjackOptions => {
        let key: string = converter.toWords(dealerCard.rank.toString());
        if(key === "one") key = "ace"; //hacky
        let playerTotal: string = converter.toWords(playerHand.Value());
        //console.log("a) playerTotal: " + playerTotal);

        if(playerHand.Blackjack()) { return BlackjackOptions.s; }

        if (playerHand.length === 2) {
            // Pairs
            if (playerHand[0].cardface === playerHand[1].cardface) {
                playerTotal = converter.toWords(playerHand[0].rank) + " " + converter.toWords(playerHand[1].rank);
                if (playerHand[0].cardface === CardFace.ACE) playerTotal = "ace ace"; //hack
            }
            // Soft Ace
            else if (playerHand.HasAce()) {
                //TODO how do we get to here if we cannot split aces (not enough money to split)
                playerTotal = "ace ";
                var swapAce = playerHand[0].cardface === CardFace.ACE ? playerTotal += converter.toWords(playerHand[1].rank) : playerTotal += converter.toWords(playerHand[0].rank);
            }
        }
        else if (playerHand.length > 2 && playerHand.HasAce()) {
            //console.log("b) playerHand.Value() " + playerHand.Value());
            let handValue: number = playerHand.Value();
            if (handValue < 12) { handValue += 10; }
            if (handValue < 17) { playerTotal = "soft16orless"; }
            else if (handValue === 17) { playerTotal = "soft17"; }
            else if (handValue === 18) { playerTotal = "soft18"; }
            else if (handValue === 19) { playerTotal = "soft19"; }
            else if (handValue > 19 && playerHand.Value() < 22) { return BlackjackOptions.s; }
        }
        let row: any = this.filter((e) => { return e.Hand === playerTotal });
        let out: string = row[0][key];
        let result: BlackjackOptions = (BlackjackOptions)[out];

        if(result === BlackjackOptions.d && playerHand.length > 2){
            result = BlackjackOptions.h;
        }
        return result;
    }
}