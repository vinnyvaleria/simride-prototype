import { bindUserData, bindUser } from '../../functions/bindUserData'

let user = new Array(12); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id, 10rating, 11ratedby
export const checkEmailLogin = () => {
    user = [];
    user[3] = document.getElementById("signinemail").value;
    user[3] = user[3].toLowerCase();

    bindUserData(user[3]);

    user = bindUser;

    if (bindUser[7] === "yes") {
        firebase.auth().signOut();
    }
}

export {user}