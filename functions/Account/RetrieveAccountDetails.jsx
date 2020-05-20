import React from 'react';

import { db } from '../../config';

let accountsRef = db.ref('accounts');

export default class RetrieveAccountDetails extends React.Component {
  state = {
    accounts: []
  };

  static bindUser() {
    console.log('please work');

    accountsRef
      .orderByChild('email')
      .equalTo({email})
      .once('value')
        .then((snapshot) => {
          snapshot.forEach((child) => {
            accounts[0] = child.val().fname;
            accounts[1] = child.val().lname;
            accounts[2] = child.val().uname;
            accounts[4] = child.val().phone;
            accounts[5] = child.val().isDriver;
            accounts[6] = child.val().isAdmin;
            accounts[7] = child.val().isBanned;
            accounts[8] = child.val().wallet;
            accounts[9] = child.key;
            this.setState({ accounts });
          });  
    });
  }

  componentWillMount() {
    const email = db.auth().currentUser.email;
  }
}