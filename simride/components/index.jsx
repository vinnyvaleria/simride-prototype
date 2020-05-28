import firebase from '../../base';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Messages from './inbox/index.jsx';
import Account from './account/index.jsx';
import Booking from './booking/index.jsx';
import Home from './dashboard/index.jsx';
import Wallet from './wallet/index.jsx';
import Cashout from './cashcheckout/index.jsx';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function Start() {
  let isAdmin;
  const accountsRef = firebase.database().ref('accounts');
  accountsRef.orderByChild('email')
    .equalTo(firebase.auth().currentUser.email)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((child) => {
        isAdmin = child.val().isAdmin;
      })
    }).then(() => {
      if (isAdmin === 'yes') {
        if (document.getElementById('wallet') !== null) {
          document.getElementById('wallet').style.display = 'none';
          document.getElementById('checkout').style.display = 'block';
        }
      }
      else {
        if (document.getElementById('wallet') !== null) {
          document.getElementById('wallet').style.display = 'block';
          document.getElementById('checkout').style.display = 'none';
        }
      }
    })
    
  return (
    <Router style={{ width: '100vw' }}>
      <footer>
        <NavLink exact to='/' activeClassName='menuactive'>
          <Ionicons className='menuItem' name='ios-home' />
        </NavLink>

        <NavLink exact to='/Booking' activeClassName='menuactive'>
          <Ionicons className='menuItem' name='ios-calendar' />
        </NavLink>

        <NavLink exact to='/Messages' activeClassName='menuactive'>
          <Ionicons className='menuItem' name='ios-mail' />
        </NavLink>
        
        <NavLink id='wallet' exact to='/Wallet' activeClassName='menuactive'>
          <Ionicons className='menuItem' name='ios-wallet' />
        </NavLink>
        
        <NavLink id='checkout' exact to='/Checkout' activeClassName='menuactive'>
          <Ionicons className='menuItem' name='ios-list-box' />
        </NavLink>
        
        <NavLink exact to='/Account' activeClassName='menuactive'>
          <Ionicons className='menuItem' name='ios-cog' />
        </NavLink>
      </footer>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path='/Booking'>
          <Booking />
        </Route>
        <Route path='/Messages'>
          <Messages />
        </Route>
        <Route path='/Account'>
          <Account />
        </Route>
        <Route path='/Wallet'>
          <Wallet />
        </Route>
        <Route path='/Checkout'>
            <Cashout />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}