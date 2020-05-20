import routes from './routes';

const PREFIX = 'COMMON';

export default {
  prefix: PREFIX,
  routes: routes(PREFIX),
};