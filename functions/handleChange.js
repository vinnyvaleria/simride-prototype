export default handleChange((e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
})
module.exports.handleChange = handleChange;