import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import {validationMiddleware} from '../middlewares/validation.middleware';
import ProductsController from '../controllers/products.controller';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, validationMiddleware(CreateProductDto, 'body'), authMiddleware, this.productsController.createProduct);
    this.router.get(`${this.path}/:product_id`, authMiddleware, this.productsController.findProduct);
    this.router.get(`${this.path}/`, authMiddleware, this.productsController.findAllProducts);
    this.router.delete(`${this.path}/:product_id`, authMiddleware, this.productsController.removeProduct);
    this.router.put(`${this.path}/:product_id`, validationMiddleware(UpdateProductDto, 'body'), authMiddleware, this.productsController.editProduct);
    }
}

export default ProductsRoute;
