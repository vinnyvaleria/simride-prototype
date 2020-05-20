maxAmtCalc(() => {
    if (user[8] > 5.00) {
        return parseFloat(user[8] - 5).toFixed(2);
    } else {
        return 0;
    }
})

module.exports.maxAmtCalc = maxAmtCalc;