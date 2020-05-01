import {user, unameArr} from './checkEmail';

let clickedUser = '';
let chatName = '';

export const searchUsername = (e) => {
    let i = 0;
    // creates chat based on usernames
    while (i < unameArr.length) {
        console.log(unameArr[i]);
        // checks if there is a valid account in the database
        if (this.state.to === unameArr[i]) {
            console.log(this.state.to, unameArr[i]);
            document.getElementById('searchUser').style.display = "none";
            document.getElementById('sendNewMessage').style.display = "block";
            const search = this.state.to;

            //creates chat based on username length
            if (user[2].length !== search.length) {
                if (user[2].length < search.length) {
                    chatName = (user[2] + "-" + search)
                } else {
                    chatName = (search + "-" + user[2])
                }
            }
            // if same length compare by alphabets
            else {
                if (user[2] < search) {
                    chatName = (user[2] + "-" + search)
                } else {
                    chatName = (search + "-" + user[2])
                }
            }

            console.log(chatName);

            clickedUser = (chatName.replace(user[2].toString(), '')).replace('-', '');
            chattingTo.innerHTML = clickedUser;
            viewOtherAcctPageUser.innerHTML = clickedUser;
            break;
        } else if (i === unameArr.length) {
            alert("User not found");
        }
        i++;
    }
}

export {clickedUser, chatName};