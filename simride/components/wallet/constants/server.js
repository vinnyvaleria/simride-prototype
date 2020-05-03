const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' ?
    'https://carpool-world-5uck5.web.app/Wallet':
    'http://localhost:5000/Wallet';

export default PAYMENT_SERVER_URL;