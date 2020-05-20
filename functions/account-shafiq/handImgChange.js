export default handleImgChange((e) => {
    if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({
            image
        }));
    }
})

module.exports.handleImgChange = handleImgChange;