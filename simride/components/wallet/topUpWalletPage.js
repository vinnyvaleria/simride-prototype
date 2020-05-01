// top up wallet button
export const topUpWalletPage = () => {
    document.getElementById('div_WalletHome').style.display = "none";
    document.getElementById('div_WalletTopUp').style.display = "block";
    document.getElementById('div_WalletHistory').style.display = "none";
    document.getElementById('div_CashOut').style.display = "none";
}