// new msg button
newMsgButton(() => {
    document.getElementById('inbox').style.display = "none";
    document.getElementById('searchUser').style.display = "block";
    document.getElementById('sendNewMessage').style.display = "none";
    this.state.to = '';
    document.getElementById('selectUser').value = '';
})

module.exports.newMsgButton = newMsgButton;