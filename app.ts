import App from './server';
import AuthRoute from './src/routes/authentication.route';
import ProductsRoute from './src/routes/products.route';
import IndexRoute from './src/routes/index.route';
import validateEnv from './src/utils/helpers/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new ProductsRoute(),
]);

app.listen();

export default app