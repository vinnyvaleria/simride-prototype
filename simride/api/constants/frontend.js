const FRONTEND_DEV_URLS = ['http://localhost:5000/carpool-world-5uck5/us-central1/pay'];

const FRONTEND_PROD_URLS = [
    'https://carpool-world-5uck5.web.app/carpool-world-5uck5/us-central1/pay'
];

module.exports = process.env.NODE_ENV === 'production' ?
    FRONTEND_PROD_URLS :
    FRONTEND_DEV_URLS;