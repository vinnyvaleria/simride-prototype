import bindUserData from '../../../functions/bindUserData'

checkEmailLogin(() => {
    user = [];
    user[3] = document.getElementById("signinemail").value;
    user[3] = user[3].toString().toLowerCase();

    bindUserData();
})