import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DatabaseService from '../services/database.service';
declare class ProductsController {
    productService: DatabaseService;
    createProduct: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    findProduct: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    findAllProducts: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    removeProduct: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    editProduct: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default ProductsController;
