import {checkEmailWallet, user} from './checkEmailWallet';
import {maxAmtCalc} from './maxAmtCalc';
import {topUpWalletPage} from './topUpWalletPage';
import {walletHomePage} from './walletHomePage';
import {cashOut} from './cashOut';
import {submitCashOut} from './submitCashOut';
import {transactionsPage} from './transactionsPage';
import Checkout from './checkout'

import React from 'react';
import { View } from 'react-native';
import 'firebase/firestore';

//import 'react-toastify/dist/ReactToastify.css';


class Wallet extends React.Component {
    constructor(props) {
        super(props);
        //this.handleToken = this.handleToken.bind(this);
        this.setTwoNumberDecimal = this.setTwoNumberDecimal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            amount: '0.00',
            maxAmt: maxAmtCalc(),
            cashoutamount: ''
        }
    }

    componentDidMount() {
        checkEmailWallet();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // sets amount in text box to two decimal places on blur and sets to this.state.amount
    setTwoNumberDecimal(e) {
        e.target.value = parseFloat(e.target.value).toFixed(2);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitCashOut_Click = () => {
        submitCashOut();

        this.state = {
            cashoutamount: ''
        };
    } 

    // // handles payment -> check firestripe for stripe cloud functiosn with firebase
    // async handleToken(token) {
    //     let product = {price: this.state.amount, name: "Top-Up E-Wallet", description: "Top-Up"}
    //     const response = await axios.post(
    //         "http://localhost:5000/Wallet/checkout", // by right when served onto staging server port will be 5000
    //         { token, product }
    //     );
    //     const { status } = response.data;
    //     console.log("Response:", response.data);
    //     if (status === "success") {
    //         alert('Success!');
    //         //toast("Success! Check email for details", { type: "success" });
    //     } else {
    //         //toast("Something went wrong", { type: "error" });
    //         alert('Error');
    //     }
    // }

    render() {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <div id='homePage'>
        <div>
          <h1>E-Wallet Page</h1>
          <button id='btnWalletHome' onClick={ walletHomePage }>Wallet</button>
          <button id='btnTransactionPage' onClick={ transactionsPage }>Transactions</button>
        </div>
        <br/>
        <div id='div_WalletHome'>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>E-Wallet Amount:</td>
                            <td id='td_WalletAmount'></td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <br/>
                <div id="tbl_last5">
                    <h4>Last 5 Transactions</h4>
                    <table>
                        <tbody id="tb_LastFiveTransactions"></tbody>
                    </table>
                </div>
            </div>
            <br/>
            <div>
                <button id='btnTopUpPage' onClick={ topUpWalletPage }>Top-Up</button>
                <button id='btnCashOut' onClick={ cashOut }>Cash-Out</button>
            </div>
        </div>
        <div id='div_WalletTopUp' style={{display: 'none'}}>
            <input type='number' step='0.01' min='0.01' value={this.state.amount} onBlur={this.setTwoNumberDecimal} onChange={this.handleChange} name='amount' style={{width: '9em'}} /><br/><br/>
            <Checkout
                name={'SIMRide'}
                description={'E-Wallet Top Up'}
                amount={this.state.amount}
                email={user[3]}
            />
            {/* <StripeCheckout
                stripeKey='pk_test_K5hyuKJAvnl8PNzfuwes3vn400X0HYzEvv'
                token={this.handleToken}
                amount={this.state.amount * 100}
                name="E-Wallet Top-Up"
                currency="SGD"
                email={user[3]}
            /> */}
        </div>
        <div id='div_CashOut' style={{display: 'none'}}>
            <input id='cashOutInput' type='number' step='0.01' min='0.01' max={this.state.maxAmt} value={this.state.cashoutamount} onBlur={this.setTwoNumberDecimal} onChange={this.handleChange} style={{width: '9em'}} name='cashoutamount' />
            <br/><br/>
            <button id='btnSubmitCashOut' onClick={ this.submitCashOut_Click }>Cash-Out</button>
        </div>
        <div id='div_WalletHistory' style={{display: 'none'}}>
        </div>
      </div>
    </View>
    );
  }
}

export default Wallet;