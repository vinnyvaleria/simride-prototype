import React from 'react';
import { View } from 'react-native';
import 'firebase/firestore';

import { back } from './back';
import { checkEmail } from './checkEmail';
import { inboxMsgButton } from './inboxMsgButton';
import { report } from './report';
import { searchUsername, clickedUser, chatName } from './searchUsername';
import { sendMessage } from './sendMessage';
import { submitReport } from './submitReport';
import { viewUserProfile, clickedUserID } from './viewUserProfile';

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.newMsgButton = this.newMsgButton.bind(this);
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
            id: ''
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        checkEmail();
    }

    newMsgButton = () => {
        document.getElementById('inbox').style.display = "none";
        document.getElementById('searchUser').style.display = "block";
        document.getElementById('sendNewMessage').style.display = "none";
        this.state.to = '';
        document.getElementById('selectUser').value = '';
    }

    render() {
        return (
            <View>
                <div id='msgsPage'>
                    <div>
                        <div>
                            <h1>SIMWorld Chat</h1>
                        </div>
                        <div id='msgOption'>
                            <button id='inboxMsgButton' title="Inbox" onClick={inboxMsgButton}>Inbox</button>
                            <button id='newMsgButton' title="newMessage" onClick={this.newMsgButton}>Search User</button>
                        </div>
                        <br />
                        <div id='inbox' style={{ display: 'none' }}>
                            <div id='chatsStarted'></div>
                            <div>
                                <ul id="messages"></ul>
                            </div>
                            <div id="submitInboxMessage" style={{ display: 'none' }}>
                                <input id="message" placeholder="Enter message" value={this.state.message}
                                    onChange={this.handleChange} type="text" name="message" style={{ width: '350px' }} />
                                <button id='submitMsgButton' onClick={sendMessage(chatName)}>Submit</button>
                            </div>
                        </div>

                        <br />
                        <div id='searchUser' style={{ display: 'none' }}>
                            <input id="selectUser" placeholder="Search user" value={this.state.to} onChange={this.handleChange}
                                type="text" name="to" style={{ width: '350px' }} />
                            <button id='submitSearchUserButton' onClick={searchUsername}>Submit</button>
                        </div>

                        <div id="sendNewMessage" style={{ display: 'none' }}>
                            <button id='chattingTo' onClick={viewUserProfile(clickedUser)}></button>
                            <div>
                                <br />
                                <input id="message" placeholder="Enter message" value={this.state.message}
                                    onChange={this.handleChange} type="text" name="message" style={{ width: '350px' }} />
                                <button id='submitMsgButtonNew' onClick={sendMessage(chatName)}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>

                <div id='otherAcctPage' style={{ display: 'none' }}>
                    <div>
                        <h1 id="viewOtherAcctPageUser"></h1>
                        <br />
                        <table>
                            <tbody>
                                <tr>
                                    <td>First Name:</td>
                                    <td>
                                        <label id='lblotherfName' style={{ display: 'inline' }}></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Name:</td>
                                    <td>
                                        <label id='lblotherlName' style={{ display: 'inline' }}></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <label id='lblotherEmail' style={{ display: 'inline' }} name='email'></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>isDriver:</td>
                                    <td>
                                        <label id='lblotherDriver' name='isDriver'></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>isAdmin:</td>
                                    <td>
                                        <label id='lblotherAdmin' name='isAdmin'></label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <button id='btnShowReport' onClick={report}>Report User</button>
                        <select id="ddReportReason" style={{ width: '13em' }} required style={{ display: 'none' }}>
                            <option value="fake">I believe this is a fake profile</option>
                            <option value="safety">User has threatened my physical safety</option>
                            <option value="inappropriate">User has been behaving inappropriately towards me</option>
                            <option value="vulgar">User was uncivil, rude and/or vulgar</option>
                            <option value="noshow">User did not show up</option>
                        </select>
                        {/* <button id='btnSubmitReport' onClick={submitReport(clickedUserID, clickedUser)} style={{ display: 'none' }}>Submit</button> */}
                        <button onClick={back}>Back</button>
                    </div>
                    <br />
                </div>
            </View>
        );
    }
}

export default Inbox;