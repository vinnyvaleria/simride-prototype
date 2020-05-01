import maxAmtCalc from './maxAmtCalc';

// to show amount left in wallet
walletHomePage(() => {
    this.getLastFiveBookings();
    if (maxAmtCalc() === 0) {
        document.getElementById('btnCashOut').style.display = "none";
    } else {
        document.getElementById('btnCashOut').style.display = "inline-block";
    }

    document.getElementById('div_WalletHome').style.display = "block";
    document.getElementById('div_WalletTopUp').style.display = "none";
    document.getElementById('div_WalletHistory').style.display = "none";
    document.getElementById('div_CashOut').style.display = "none";

    document.getElementById('td_WalletAmount').innerHTML = "$" + parseFloat(user[8]).toFixed(2);
})

module.exports.walletHomePage = walletHomePage;