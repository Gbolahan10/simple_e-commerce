import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import DatabaseService from '../services/database.service';
import Product from '../models/products.model';

class ProductsController {
    public productService = new DatabaseService(Product);
    

    public createProduct = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, description, price, currency }: CreateProductDto = req.body
            const { _id } = req.user;

            const data = {
                name: name,
                description: description,
                price: price,
                currency: currency,
                store_id: _id
            }

            const productCreated = await this.productService.create(data)

            if (!productCreated.status) { throw new HttpException(500, `Error uploading product - ${productCreated.error}`)}
            
            res.status(201).json({data: productCreated.result, message: "success"});

        } catch (error) {
            next(error);
            }
    }

    public findProduct = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { product_id } = req.params;
            const { _id } = req.user;
            
            const product = await this.productService.find({_id: product_id, store_id: _id})
            if (!product.status) throw new HttpException(404, "Product not found")

            res.status(200).json({ data: product.result, message: "success" });
              }
            catch (error) {
            next(error);
        }
    }

    public findAllProducts = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const pageQueryParam = req.query && req.query.page;
            const limitQueryParam = req.query && req.query.limit;

            const page: number | null = pageQueryParam ? parseInt(pageQueryParam as string) : null;
            const limit: number | null = limitQueryParam ? parseInt(limitQueryParam as string) : null;

            const { _id } = req.user;
            
            const products = await this.productService.findAll({store_id: _id}, page, limit)
            if (!products.status) throw new HttpException(404, "Products not found")

            res.status(200).json({ data: products.result, message: "success" });
              }
            catch (error) {
            next(error);
        }
    }

    public removeProduct = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { product_id } = req.params;
            const { _id } = req.user;

            const productDeleted = await this.productService.delete({store_id: _id, _id: product_id})

            if (!productDeleted.status) { throw new HttpException(500, productDeleted.error)}
            
            res.status(200).json({message: "Product removed successfully"});

        } catch (error) {
            next(error);
            }
    }

    public editProduct = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { product_id } = req.params;
            const { _id } = req.user;
            const data: UpdateProductDto = req.body

            const productUpdated = await this.productService.update({store_id: _id, _id: product_id}, { ...data })

            if (!productUpdated.status) { throw new HttpException(500, productUpdated.error)}
            
            res.status(200).json({message: "Product updated successfully"});

        } catch (error) {
            next(error);
            }
    }

}

export default ProductsController;