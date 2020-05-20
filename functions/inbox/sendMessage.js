import { db } from '../../config';
import 'firebase/firestore';

// stores message in firestore
sendMessage((e) => {
    e.preventDefault();

    firebase.firestore().collection('messages').doc(chatName)
        .get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                // save in database
                firebase.firestore().collection('messages/' + chatName).add({
                    from: user[2],
                    to: this.state.to,
                    text: this.state.message,
                    timestamp: new Date()
                }).catch((error) => {
                    alert('Error sending message.', error);
                });

                this.state.message = '';
                document.getElementById('message').value = '';
            } else {
                let data = {
                    field: 'field'
                }
                firebase.firestore().collection('chat').doc(chatName).set(data);
                // save in database
                firebase.firestore().collection('chat').doc(chatName).collection('messages').add({
                    from: user[2],
                    to: this.state.to,
                    text: this.state.message,
                    timestamp: new Date()
                }).catch((error) => {
                    alert('Error sending message.', error);
                });

                this.state.message = '';
                document.getElementById('message').value = '';
            }
        })

    if (e.target.id === "submitMsgButtonNew") {
        this.inboxMsgButton();
    }
})

module.exports.sendMessage = sendMessage;