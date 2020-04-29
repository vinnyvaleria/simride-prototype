showRecurring(() => {
    if (document.getElementById('cbRecurring').checked === true) {
        document.getElementById('tr_showRecurring').style.display = 'inline-block';
    } else {
        document.getElementById('tr_showRecurring').style.display = 'none';
    }
})

module.exports.showRecurring = showRecurring;