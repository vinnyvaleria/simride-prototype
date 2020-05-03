const FRONTEND_DEV_URLS = ['http://localhost:5000'];

const FRONTEND_PROD_URLS = [
    'https://carpool-world-5uck5.web.app/'
];

module.exports = process.env.NODE_ENV === 'production' ?
    FRONTEND_PROD_URLS :
    FRONTEND_DEV_URLS;