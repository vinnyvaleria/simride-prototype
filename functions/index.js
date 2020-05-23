/* eslint-disable promise/always-return */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const stripe = require('stripe')('sk_test_WzkXhy9bPK7Wir3HZrpiqxB800AbVi94mG');
 
admin.initializeApp(functions.config().firebase);
 
const stripeCharge = (request, response) => {
    const body = request.body;
    const amount = body.charge.amount;
    const currency = body.charge.currency;
    const description = 'E-Wallet Top-Up';
    const receipt_email = body.token.email;
    const source = body.token.id;
    const charge = {amount, currency, description, receipt_email, source};

    console.log(charge)
 
    stripe.charges.create(charge)
    .then(res => {
        send(response, 200, {message: 'success', result: res});
        console.log('charge success.');
    })
    .catch(err => {
        send(response, 500, {error: err.message});
        console.log('charge failed.');
    });
}
 
function send(response, statusCode, body) {
    response.send({
      statusCode,
      data: JSON.stringify(body)
    });
}
 
exports.charge = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            stripeCharge(request, response);
        } catch (error) {
            send(response, 500, {error: error.message});
        }
    });
});