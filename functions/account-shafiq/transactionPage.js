// goes to transaction history page
transactionsPage(() => {
    document.getElementById('div_WalletHome').style.display = "none";
    document.getElementById('div_WalletTopUp').style.display = "none";
    document.getElementById('div_WalletHistory').style.display = "block";
    document.getElementById('div_CashOut').style.display = "none";

})

module.exports.transactionsPage = transactionsPage;