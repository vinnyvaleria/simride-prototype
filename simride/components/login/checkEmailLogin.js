import { bindUserData, bindUser } from '../../functions/bindUserData'

let user = new Array(10); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id
export const checkEmailLogin = () => {
    user = [];
    user[3] = document.getElementById("signinemail").value;
    user[3] = user[3].toString().toLowerCase();

    bindUserData(user[3]);

    user = bindUser;
}

export {user}