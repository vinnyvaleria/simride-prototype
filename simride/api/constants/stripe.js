const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production' ?
    'sk_test_WzkXhy9bPK7Wir3HZrpiqxB800AbVi94mG': // live
    'sk_test_WzkXhy9bPK7Wir3HZrpiqxB800AbVi94mG'; // test

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;