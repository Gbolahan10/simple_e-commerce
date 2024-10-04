import App from './server';
import AuthRoute from './src/routes/authentication.route';
import ProductsRoute from './src/routes/products.route';
import IndexRoute from './src/routes/index.route';
import validateEnv from './src/utils/helpers/validateEnv';

validateEnv();

// Initialize the app with routes
const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new ProductsRoute(),
]);

// Connect to database
app.connectToDatabase();

// Export the app for Vercel (do not call app.listen)
export default app.getServer();
