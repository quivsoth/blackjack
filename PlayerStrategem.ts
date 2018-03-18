import { BJTacticianer, DealerChart, PlayerChart } from './interfaces/IBlackjackGameOptions';
import * as data from './hardHandStrategy.json';
import { BlackjackOptions } from './cardEnums';
import { BlackjackHand } from "./BlackjackHand";

export class PlayerStrategem extends Array<DealerChart> {
    constructor() {
        super();

        let cj: BJTacticianer = (<any>data);
        let charts: Array<DealerChart> = new Array<DealerChart>();
        for (var _i = 0; _i < cj.dealer.length; _i++) {
            let chart: DealerChart = (<any>Object).assign(new DealerChart(), cj.dealer[_i]);
            charts.push(chart);
        }
        this.push(...charts);
    }
    
    getPlayerResponse = (_dealerCardValue: number, _playerCardValue: number): BlackjackOptions => {
        let chart:DealerChart = this.filter(item => item.dealerHand == _dealerCardValue)[0];
        let returnValue: string;

        if (_playerCardValue >= 4 && _playerCardValue <= 8) {
            returnValue = chart.hand.filter(item => item.playerHand === "4to8")[0].value;
        }
        else if (_playerCardValue == 9) {
            returnValue = chart.hand.filter(item => item.playerHand === "9")[0].value;
        }
        else if (_playerCardValue == 10) {
            returnValue = chart.hand.filter(item => item.playerHand === "10")[0].value;
        }
        else if (_playerCardValue == 11) {
            returnValue = chart.hand.filter(item => item.playerHand === "11")[0].value;
        }
        else if (_playerCardValue == 12) {
            returnValue = chart.hand.filter(item => item.playerHand === "12")[0].value;
        }
        else if (_playerCardValue == 13) {
            returnValue = chart.hand.filter(item => item.playerHand === "13")[0].value;
        }
        else if (_playerCardValue == 14) {
            returnValue = chart.hand.filter(item => item.playerHand === "14")[0].value;
        }
        else if (_playerCardValue == 15) {
            returnValue = chart.hand.filter(item => item.playerHand === "15")[0].value;
        }
        else if (_playerCardValue == 16) {
            returnValue = chart.hand.filter(item => item.playerHand === "16")[0].value;
        }
        else if (_playerCardValue >= 17) {
            returnValue = chart.hand.filter(item => item.playerHand === "17")[0].value;
        }
        return this.bjOption(returnValue);
    }

    getPlayerResponses = (_dealerCardValue: number, playerHand: BlackjackHand): BlackjackOptions => {
        let chart:DealerChart = this.filter(item => item.dealerHand == _dealerCardValue)[0];
        let returnValue: string;
        let _playerCardValue: number = playerHand.Value();

        if (_playerCardValue >= 4 && _playerCardValue <= 8) {
            returnValue = chart.hand.filter(item => item.playerHand === "4to8")[0].value;
        }
        else if (_playerCardValue == 9) {
            returnValue = chart.hand.filter(item => item.playerHand === "9")[0].value;
        }
        else if (_playerCardValue == 10) {
            returnValue = chart.hand.filter(item => item.playerHand === "10")[0].value;
        }
        else if (_playerCardValue == 11) {
            returnValue = chart.hand.filter(item => item.playerHand === "11")[0].value;
        }
        else if (_playerCardValue == 12) {
            returnValue = chart.hand.filter(item => item.playerHand === "12")[0].value;
        }
        else if (_playerCardValue == 13) {
            returnValue = chart.hand.filter(item => item.playerHand === "13")[0].value;
        }
        else if (_playerCardValue == 14) {
            returnValue = chart.hand.filter(item => item.playerHand === "14")[0].value;
        }
        else if (_playerCardValue == 15) {
            returnValue = chart.hand.filter(item => item.playerHand === "15")[0].value;
        }
        else if (_playerCardValue == 16) {
            returnValue = chart.hand.filter(item => item.playerHand === "16")[0].value;
        }
        else if (_playerCardValue >= 17) {
            returnValue = chart.hand.filter(item => item.playerHand === "17")[0].value;
        }

        
        return this.bjOption(returnValue);
    }

    bjOption = (value: string): BlackjackOptions => {
        switch(value) {
            case "s": {
                return BlackjackOptions.s;
            }
            case "h": {
                return BlackjackOptions.h;
            }
            case "d": {
                return BlackjackOptions.d;
            }
            case "sp": {
                return BlackjackOptions.sp;
            }
            case "su": {
                return BlackjackOptions.su;
            }
            default: {
                return null;
            }
        }
    }
}