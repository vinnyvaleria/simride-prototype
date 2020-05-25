/* eslint-disable no-alert */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import React from 'react';
import { View } from 'react-native';
import 'firebase/firestore';
import firebase from '../../../base';

import {checkEmail} from './checkEmail';

class Cashout extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            isDriver: '',
            isAdmin: '',
            wallet: '',
            id: '',
            rating: '',
            ratedBy: '',
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // goes back to login page if stumble upon another page by accident without logging in
    componentDidMount() {
        checkEmail();

        const accountsRef = firebase.database().ref('accounts');
        accountsRef.orderByChild('email')
            .equalTo(firebase.auth().currentUser.email)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
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
                    })
                });
            })
    }
    

    render() {
        return (
            <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
                <div id='checkoutPage'>
                    <h1>Checkout Requests</h1>
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