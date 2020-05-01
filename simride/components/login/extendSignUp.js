export const extendSignUp = (e) => {
    e.preventDefault();
    document.getElementById("signinblock").style.display = "none";
    document.getElementById("signupblock").style.display = "block";
    document.getElementById("forgotpasswordblock").style.display = "none";
}