import { Routes } from '../interfaces/routes.interface';
import ProductsController from '../controllers/products.controller';
declare class ProductsRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    productsController: ProductsController;
    constructor();
    private initializeRoutes;
}
export default ProductsRoute;
