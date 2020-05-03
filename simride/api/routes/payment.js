const stripe = require('../constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({
            error: stripeErr
        });
    } else {
        res.status(200).send({
            success: stripeRes
        });
    }
}

const paymentApi = app => {
    app.get('/Wallet', (req, res) => {
        res.send({
            message: 'Hello Stripe checkout server!',
            timestamp: new Date().toISOString()
        })
    });

    app.post('/Wallet', (req, res) => {
        const transaction = firebase.database().ref('transaction');
        const transactionForm = {
            details: req.body
        }

        transaction.push(transactionForm);

        stripe.charges.create(req.body, postStripeCharge(res));
    });

    return app;
};

module.exports = paymentApi;