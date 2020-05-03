const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' ?
    'pk_test_K5hyuKJAvnl8PNzfuwes3vn400X0HYzEvv': // live
    'pk_test_K5hyuKJAvnl8PNzfuwes3vn400X0HYzEvv'; // test

export default STRIPE_PUBLISHABLE;