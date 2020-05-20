// back button
back(() => {
    document.getElementById('otherAcctPage').style.display = "none";
    document.getElementById('msgsPage').style.display = "block";
})

module.exports.back = back;