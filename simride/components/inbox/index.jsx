import React from 'react';
import { View } from 'react-native';
import 'firebase/firestore';

import { user } from '../login/index';
import firebase from '../../../base';

import '../../constants/custom.css';

var unameArr = [];
var allchats = [];
var chats = [];
var chatName;
var clickedUser;
var clickedUserID;
class Inbox extends React.Component {
    constructor(props) {

        super(props);
        this.inboxMsgButton = this.inboxMsgButton.bind(this);
        this.newMsgButton = this.newMsgButton.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.searchUsername = this.searchUsername.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openChat = this.openChat.bind(this);
        this.back = this.back.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            newPassword: '',
            confirmPassword: '',
            isDriver: '',
            isAdmin: '',
            to: '',
            from: '',
            message: '',
            id: '',
            rating: '',
            ratedBy: '',
            avgRating: 0.00,
            otheremail: '',
            otherdriver: '',
            otherrating: 0.00,
            otherfirstname: '',
            otherlastname: ''
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // checks email and signs user out if no such email found
    checkEmail(e) {
        const email = firebase.auth().currentUser.email;
        user[3] = email;

        const accountsRef = firebase.database().ref('accounts');
        accountsRef.orderByChild('email')
            .equalTo(user[3])
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    user[0] = child.val().fname;
                    user[1] = child.val().lname;
                    user[2] = child.val().uname;
                    user[4] = child.val().phone;
                    user[5] = child.val().isDriver;
                    user[6] = child.val().isAdmin;
                    user[7] = child.val().isBanned;
                    user[8] = child.val().wallet;
                    user[9] = child.key;
                    user[10] = child.val().rating;
                    user[11] = child.val().ratedBy;

                    this.setState({
                        firstName: child.val().fname,
                        lastName: child.val().lname,
                        username: child.val().uname,
                        email: child.val().email,
                        phone: child.val().phone,
                        isDriver: child.val().isDriver,
                        isAdmin: child.val().isAdmin,
                        wallet: child.val().wallet,
                        id: child.key,
                        rating: child.val().rating,
                        ratedBy: child.val().ratedBy
                    }, () => {
                        if (this.state.isBanned === 'yes') {
                            alert('Your account has been banned');
                            firebase.auth().signOut();
                        }
                    })
                });
            }).then(() => {
                if (typeof user[3] === 'undefined') {
                    firebase.auth().signOut();
                } else {
                    if (user[6] !== "") {
                        // loads accounts
                        firebase.database()
                            .ref('accounts')
                            .orderByChild('email')
                            .once('value')
                            .then((snapshot) => {
                                var i = 0;
                                snapshot.forEach((child) => {
                                    unameArr[i] = child.val().uname;
                                    i++;
                                })
                            });

                        firebase.firestore().collection("chat").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                allchats.push(doc.id);
                                chats = Array.from(new Set(allchats))
                            });
                        }).then (() => {
                            this.inboxMsgButton();
                        });
                    }
                }
            });
        if (user[7] === "yes") {
            firebase.auth().signOut();
        }
    }

    // goes back to login page if stumble upon another page by accident without logging in
    componentDidMount() {
        this.checkEmail();
    }

    // stores message in firestore
    sendMessage(e) {
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
                    let data = { field: 'field' }
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
            firebase.firestore().collection("chat").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    allchats.push(doc.id);
                    chats = Array.from(new Set(allchats))
                }); 
            }).then(() => {
                this.inboxMsgButton();
            });
        }
    }

    searchUsername(e) {
        let i = 0;
        // creates chat based on usernames
        while (i <= unameArr.length) {
            // checks if there is a valid account in the database
            if (this.state.to === unameArr[i]) {
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

                clickedUser = (chatName.replace(user[2].toString(), '')).replace('-', '');
                chattingTo.innerHTML = clickedUser;
                break;
            } else if (i === unameArr.length) {
                alert("User not found");
                break;
            }
            i++;
        }
    }

    // view another user's profile
    viewUserProfile = () => {
        document.getElementById('otherAcctPage').style.display = "block";
        document.getElementById('msgsPage').style.display = "none";

        const accountsRef = firebase.database().ref('accounts');
        accountsRef.orderByChild('uname')
            .equalTo(clickedUser)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    this.setState({
                        otheremail: child.val().email,
                        otherdriver: child.val().isDriver,
                        otherfirstname: child.val().fname,
                        otherlastname: child.val().lname
                    }, () => {
                        let rating = child.val().rating;
                        let count = child.val().ratedBy;
                        if (count > 0) {
                            this.setState({
                                otherrating: parseFloat(parseFloat(rating) / parseInt(count)).toFixed(2)
                            })
                        }
                        if (this.state.otherdriver === 'yes') {
                            document.getElementById('driverBadge').style.display = 'block';
                        }
                        clickedUserID = child.key;
                    })
                });
            })
    }

    // new msg button
    newMsgButton() {
        document.getElementById('inbox').style.display = "none";
        document.getElementById('searchUser').style.display = "block";
        document.getElementById('sendNewMessage').style.display = "none";
        this.state.to = '';
        document.getElementById('selectUser').value = '';
    }

    // inbox, buttons dynamically created from the chats that you have
    inboxMsgButton() {
        if (document.getElementById("chatsStarted") !== null) {
            document.getElementById("chatsStarted").innerHTML = "";
            document.getElementById('searchUser').style.display = "none";
            document.getElementById('inbox').style.display = "block";
            document.getElementById('sendNewMessage').style.display = "none";
            document.getElementById('msgBox').style.display = "none";
            document.getElementById('chatsStarted').style.display = "block";
        }
        
        for (var c = 0; c < chats.length; c++) {
            if (chats[c].includes(user[2])) {
                var btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', chats[c].toString().replace(user[2], '').replace('-', ''));
                btn.setAttribute('id', c);
                btn.onclick = this.openChat;
                btn.classList.add('chatBtn');

                if (document.getElementById('chatsStarted') !== null) {
                    document.getElementById('chatsStarted').appendChild(btn);
                }
            }
        }
    }

    // opens the chat from inbox
    openChat(e) {
        document.getElementById('msgBox').style.display = "block";
        document.getElementById('chatsStarted').style.display = "none";
        document.getElementById("messages").innerHTML = "";

        chatName = chats[e.target.id];
        let clickedUser = (chatName.replace(user[2].toString(), '')).replace('-', '');

        this.setState({to: clickedUser}, () => {
            firebase.firestore().collection("chat/" + chatName + "/messages").orderBy("timestamp").onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((doc) => {
                    var message = doc.doc.data();
                    // give each message a unique ID
                    if (doc.doc.data().to === user[2]) {
                        html += "<div class='chat-left' id='message-" + message.timestamp + "'>";
                        html += message.text;
                        html += "</div>";
                    }
                    else if (doc.doc.data().from === user[2]) {
                        html += "<div class='chat-right' id='message-" + message.timestamp + "'>";
                        html += message.text;
                        html += "</div>";
                        console.log(html)
                    }

                    document.getElementById('submitInboxMessage').style.display = "block";
                    document.getElementById("messages").innerHTML += html;
                });
            });
        })
    }

    report() {
        document.getElementById('btnShowReport').style.display = 'none';
        document.getElementById('btnSubmitReport').style.display = 'inline-block';
        document.getElementById('ddReportReason').style.display = 'block';
    }

    submitReport() {
        const date = new Date();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let y = date.getFullYear();
        const today = new Date(y, m, d);

        if (document.getElementById('ddReportReason').value === "fake") {
            const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
            reportRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    reportRef.update({
                        lastReportDate: today * -1,
                        fake: snapshot.val().fake += 1,
                        safety: snapshot.val().safety += 0,
                        vulgar: snapshot.val().vulgar += 0,
                        inappropriate: snapshot.val().inappropriate += 0,
                        noshow: snapshot.val().inappropriate += 0
                    });
                } else {
                    const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
                    reportRef.set({
                        username: clickedUser,
                        status: "not banned",
                        lastReportDate: today * -1,
                        fake: 1,
                        safety: 0,
                        vulgar: 0,
                        inappropriate: 0,
                        noshow: 0
                    });
                }
            });
        }
        else if (document.getElementById('ddReportReason').value === "safety") {
            const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
            reportRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    reportRef.update({
                        lastReportDate: today * -1,
                        fake: snapshot.val().fake += 0,
                        safety: snapshot.val().safety += 1,
                        vulgar: snapshot.val().vulgar += 0,
                        inappropriate: snapshot.val().inappropriate += 0,
                        noshow: snapshot.val().inappropriate += 0
                    });
                }

                else {
                    const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
                    reportRef.set({
                        username: clickedUser,
                        status: "not banned",
                        lastReportDate: today * -1,
                        fake: 0,
                        safety: 1,
                        vulgar: 0,
                        inappropriate: 0,
                        noshow: 0
                    });
                }
            });
        }
        else if (document.getElementById('ddReportReason').value === "vulgar") {
            const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
            reportRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    reportRef.update({
                        lastReportDate: today * -1,
                        fake: snapshot.val().fake += 0,
                        safety: snapshot.val().safety += 0,
                        vulgar: snapshot.val().vulgar += 1,
                        inappropriate: snapshot.val().inappropriate += 0,
                        noshow: snapshot.val().inappropriate += 0
                    });
                }

                else {
                    reportRef.set({
                        username: clickedUser,
                        status: "not banned",
                        lastReportDate: today * -1,
                        fake: 0,
                        safety: 0,
                        vulgar: 1,
                        inappropriate: 0,
                        noshow: 0
                    });
                }
            });
        }

        else if (document.getElementById('ddReportReason').value === "inappropriate") {
            const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
            reportRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    reportRef.update({
                        lastReportDate: today * -1,
                        fake: snapshot.val().fake += 0,
                        safety: snapshot.val().safety += 0,
                        vulgar: snapshot.val().vulgar += 0,
                        inappropriate: snapshot.val().inappropriate += 1,
                        noshow: snapshot.val().inappropriate += 0
                    });
                }

                else {
                    reportRef.set({
                        username: clickedUser,
                        status: "not banned",
                        lastReportDate: today * -1,
                        fake: 0,
                        safety: 0,
                        vulgar: 0,
                        inappropriate: 1,
                        noshow: 0
                    });
                }
            });
        }

        else if (document.getElementById('ddReportReason').value === "noshow") {
            const reportRef = firebase.database().ref('reportedUsers/' + clickedUserID);
            reportRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    reportRef.update({
                        lastReportDate: today * -1,
                        fake: snapshot.val().fake += 0,
                        safety: snapshot.val().safety += 0,
                        vulgar: snapshot.val().vulgar += 0,
                        inappropriate: snapshot.val().inappropriate += 0,
                        noshow: snapshot.val().inappropriate += 1
                    });
                } else {
                    reportRef.set({
                        username: clickedUser,
                        status: "not banned",
                        lastReportDate: today * -1,
                        fake: 0,
                        safety: 0,
                        vulgar: 0,
                        inappropriate: 0,
                        noshow: 1
                    });
                }
            });
        }

        alert("Report has been sent");
        document.getElementById('otherAcctPage').style.display = "none";
        document.getElementById('msgsPage').style.display = "block";
    }

    // back button
    back() {
        document.getElementById('otherAcctPage').style.display = "none";
        document.getElementById('msgsPage').style.display = "block";
    }

    render() {
        return (
          <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
                <div id='msgsPage'>
                    <div>
                        <div>
                            <h1>Messages</h1>
                        </div>
                        <div id='msgOption'>
                            <button id='inboxMsgButton' title="Inbox" onClick={this.inboxMsgButton}>Inbox</button>
                            <button id='newMsgButton' title="newMessage" onClick={this.newMsgButton}>Search User</button>
                        </div>
                        <br />
                        <div id='inbox'>
                            <div id='chatsStarted'></div>
                            <div id='msgBox' style={{ display: 'none' }}>
                                <h2>{this.state.to}</h2>
                                <div id="messages"></div>
                            </div>
                            <div id="submitInboxMessage" style={{ display: 'none' }}>
                                <input id="message" placeholder="Enter message" value={this.state.message}
                                    onChange={this.handleChange} type="text" name="message" style={{ width: '350px' }} />
                                <button style={{ margin: '0 0 0 15px' }} id='submitMsgButton' onClick={this.sendMessage}>Submit</button>
                            </div>
                        </div>

                        <br />
                        <div id='searchUser' style={{ display: 'none' }}>
                            <input id="selectUser" placeholder="Search user" value={this.state.to} onChange={this.handleChange}
                                type="text" name="to" style={{ width: '350px' }} />
                            <button id='submitSearchUserButton' onClick={this.searchUsername}>Submit</button>
                        </div>

                        <div id="sendNewMessage" style={{ display: 'none' }}>
                            <button id='chattingTo' onClick={this.viewUserProfile}></button>
                            <div>
                                <br />
                                <input id="message" placeholder="Enter message" value={this.state.message}
                                    onChange={this.handleChange} type="text" name="message" style={{ width: '350px' }} />
                                <button id='submitMsgButtonNew' onClick={this.sendMessage}>Submit</button>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />
                </div>

                <div id='otherAcctPage' style={{ display: 'none' }}>
                    <div>
                        <h1>{this.state.otherfirstname} {this.state.otherlastname}</h1>
                        <h6 id='driverBadge' style={{ display: 'none' }}>&nbsp;&nbsp;SIMRide Driver</h6>
                        <br />
                        <table>
                            <tr>
                                <td><p class='profile'>Email:</p></td>
                                <td><p class='profile'>&emsp;&emsp;{this.state.otheremail}</p></td>
                            </tr>
                            <tr>
                                <td><p class='profile'>Rating:</p></td>
                                <td><p class='profile'>&emsp;&emsp;{this.state.otherrating}</p></td>
                            </tr>
                        </table>
                        <br />
                        <br />
                        <button id='btnShowReport' onClick={this.report}>Report User</button>
                        <select id="ddReportReason" style={{ width: '13em' }} required style={{ display: 'none' }}>
                            <option value="fake">I believe this is a fake profile</option>
                            <option value="safety">User has threatened my physical safety</option>
                            <option value="inappropriate">User has been behaving inappropriately towards me</option>
                            <option value="vulgar">User was uncivil, rude and/or vulgar</option>
                            <option value="noshow">User did not show up</option>
                        </select>
                        <button id='btnSubmitReport' onClick={this.submitReport} style={{ display: 'none' }}>Submit</button>
                        <button onClick={this.back}>Back</button>
                    </div>
                    <br />
                </div>
            </View>
        );
    }
}

export default Inbox;