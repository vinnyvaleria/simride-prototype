forgotPass((e) => {
    document.getElementById("signinblock").style.display = "none";
    document.getElementById("signupblock").style.display = "none";
    document.getElementById("forgotpasswordblock").style.display = "block";
})

module.exports.forgotPass = forgotPass;