import {maxAmtCalc} from './maxAmtCalc';
import {getLastFiveBookings} from './getLastFiveBookings';

// to show amount left in wallet
export const walletHomePage = () => {
    getLastFiveBookings();
    if (maxAmtCalc() === 0) {
        document.getElementById('btnCashOut').style.display = "none";
    } else {
        document.getElementById('btnCashOut').style.display = "inline-block";
    }

    document.getElementById('div_WalletHome').style.display = "block";
    document.getElementById('div_WalletTopUp').style.display = "none";
    document.getElementById('div_WalletHistory').style.display = "none";
    document.getElementById('div_CashOut').style.display = "none";
}