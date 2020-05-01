/* eslint-disable no-alert */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import React from 'react';
import { View } from 'react-native';
import firebase from '../../../base';
import 'firebase/firestore';

import {loadCashout} from './loadCashout';
import {loadCashoutHistory} from './loadCashoutHistory';

class Cashout extends React.Component {
    constructor(props) {

        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {

        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // goes back to login page if stumble upon another page by accident without logging in
    componentDidMount() {
        if (typeof user[3] === 'undefined') {
            firebase.auth().signOut();
        }
        else {
            loadCashout();
            loadCashoutHistory();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <div id='checkoutPage'>
                    <h4>Checkout Requests</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Requester ID</th>
                                <th>Requester</th>
                                <th>Amount</th>
                                <th>Date Applied</th>
                            </tr>
                        </thead>
                        <tbody id="tb_NotDisbursedCashout"></tbody>
                    </table>
                    <h4>Checkout History</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Requester ID</th>
                                <th>Requester</th>
                                <th>Amount</th>
                                <th>Date Applied</th>
                                <th>Disbursed</th>
                            </tr>
                        </thead>
                        <tbody id="tb_AllCashout"></tbody>
                    </table>
                </div>
            </View>
        );
    }
}

export default Cashout;