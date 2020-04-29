// sets amount in text box to two decimal places on blur and sets to this.state.amount
setTwoNumberDecimal((e) => {
    e.target.value = parseFloat(e.target.value).toFixed(2);
    this.setState({
        [e.target.name]: e.target.value
    });
})

module.exports.setTwoNumberDecimal = setTwoNumberDecimal;