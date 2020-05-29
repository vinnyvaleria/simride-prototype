export const showRecurring = () => {
    if (document.getElementById('cbRecurring').checked === true) {
        document.getElementById('tr_showRecurring').style.display = 'block';
    } else {
        document.getElementById('tr_showRecurring').style.display = 'none';
    }
}