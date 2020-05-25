import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Messages from "./inbox/index.jsx";
import Account from "./account/index.jsx";
import Booking from "./booking/index.jsx";
import Home from "./dashboard/index.jsx";
import Wallet from "./wallet/index.jsx";
import Cashout from "./cashcheckout/index.jsx";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function Start() {
  return (
    <Router>
        <nav>
          <div id="dashboardWrapper">
            <Link to="/" style={{textDecoration: "none"}}>
              <Ionicons className="menuItem" name="ios-home" size="2.5em" />
            </Link>

            <Link to="/Booking" style={{textDecoration: "none"}}>
              <Ionicons className="menuItem" name="ios-calendar" size="2.5em" />
            </Link>

            <Link to="/Messages" style={{textDecoration: "none"}}>
              <Ionicons className="menuItem" name="ios-mail" size="2.5em" />
            </Link>
            
            <Link to="/Wallet" style={{textDecoration: "none"}}>
              <Ionicons className="menuItem" name="ios-wallet" size="2.5em" />
            </Link>
            
            <Link to="/Checkout" style={{textDecoration: "none"}}>
              <Ionicons className="menuItem" name="ios-list-box" size="2.5em" />
            </Link>
            
            <Link to="/Account" style={{textDecoration: "none"}}>
              <Ionicons className="menuItem" name="ios-cog" size="2.5em" />
            </Link>
          </div>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route path="/Booking">
            <Booking />
          </Route>
          <Route path="/Messages">
            <Messages />
          </Route>
          <Route path="/Account">
            <Account />
          </Route>
          <Route path="/Wallet">
            <Wallet />
          </Route>
           <Route path="/Checkout">
              <Cashout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}