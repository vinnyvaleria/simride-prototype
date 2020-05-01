import firebase from '../../../base';
import 'firebase/firestore';
import {chats} from './checkEmail';

// opens the chat from inbox
let chatName = '';
export const openChat = (e) => {
    document.getElementById("messages").innerHTML = "";

    chatName = chats[e.target.id];
    console.log(chatName);
    firebase.firestore().collection("chat/" + chatName + "/messages").orderBy("timestamp").onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((doc) => {
            var message = doc.doc.data();
            var html = "";
            // give each message a unique ID
            html += "<li id='message-" + message.timestamp + "'>";
            html += message.from + ": " + message.text;
            html += "</li>";

            console.log(html);

            document.getElementById('submitInboxMessage').style.display = "block";
            document.getElementById("messages").innerHTML += html;
        });
    });
}