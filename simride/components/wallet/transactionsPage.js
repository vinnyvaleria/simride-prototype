// goes to transaction history page
export const transactionsPage = () => {
    document.getElementById('div_WalletHome').style.display = "none";
    document.getElementById('div_WalletTopUp').style.display = "none";
    document.getElementById('div_WalletHistory').style.display = "block";
    document.getElementById('div_CashOut').style.display = "none";

}