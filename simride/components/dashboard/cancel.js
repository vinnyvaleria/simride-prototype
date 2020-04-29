cancel((e) => {
    e.preventDefault();
    document.getElementById("signinblock").style.display = "block";
    document.getElementById("signupblock").style.display = "none";
    document.getElementById("forgotpasswordblock").style.display = "none";
})

module.exports.cancel = cancel;