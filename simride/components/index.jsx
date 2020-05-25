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
  return (
    <Router style={{ width: '100vw' }}>
      <footer>
        <NavLink to='/Home'>
          <Ionicons className='menuItem' name='ios-home' />
        </NavLink>

        <NavLink to='/Booking'>
          <Ionicons className='menuItem' name='ios-calendar' />
        </NavLink>

        <NavLink to='/Messages'>
          <Ionicons className='menuItem' name='ios-mail' />
        </NavLink>
        
        <NavLink to='/Wallet'>
          <Ionicons className='menuItem' name='ios-wallet' />
        </NavLink>
        
        <NavLink to='/Checkout'>
          <Ionicons className='menuItem' name='ios-list-box' />
        </NavLink>
        
        <NavLink to='/Account'>
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
        <Route path='/Home'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}