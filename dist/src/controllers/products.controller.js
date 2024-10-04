"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const products_model_1 = tslib_1.__importDefault(require("../models/products.model"));
class ProductsController {
    constructor() {
        this.productService = new database_service_1.default(products_model_1.default);
        this.createProduct = async (req, res, next) => {
            try {
                const { name, description, price, currency } = req.body;
                const { _id } = req.user;
                const data = {
                    name: name,
                    description: description,
                    price: price,
                    currency: currency,
                    store_id: _id
                };
                const productCreated = await this.productService.create(data);
                if (!productCreated.status) {
                    throw new HttpException_1.HttpException(500, `Error uploading product - ${productCreated.error}`);
                }
                res.status(201).json({ data: productCreated.result, message: "success" });
            }
            catch (error) {
                next(error);
            }
        };
        this.findProduct = async (req, res, next) => {
            try {
                const { product_id } = req.params;
                const { _id } = req.user;
                const product = await this.productService.find({ _id: product_id, store_id: _id });
                if (!product.status)
                    throw new HttpException_1.HttpException(404, "Product not found");
                res.status(200).json({ data: product.result, message: "success" });
            }
            catch (error) {
                next(error);
            }
        };
        this.findAllProducts = async (req, res, next) => {
            try {
                const pageQueryParam = req.query && req.query.page;
                const limitQueryParam = req.query && req.query.limit;
                const page = pageQueryParam ? parseInt(pageQueryParam) : null;
                const limit = limitQueryParam ? parseInt(limitQueryParam) : null;
                const { _id } = req.user;
                const products = await this.productService.findAll({ store_id: _id }, page, limit);
                if (!products.status)
                    throw new HttpException_1.HttpException(404, "Products not found");
                res.status(200).json({ data: products.result, message: "success" });
            }
            catch (error) {
                next(error);
            }
        };
        this.removeProduct = async (req, res, next) => {
            try {
                const { product_id } = req.params;
                const { _id } = req.user;
                const productDeleted = await this.productService.delete({ store_id: _id, _id: product_id });
                if (!productDeleted.status) {
                    throw new HttpException_1.HttpException(500, productDeleted.error);
                }
                res.status(200).json({ message: "Product removed successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.editProduct = async (req, res, next) => {
            try {
                const { product_id } = req.params;
                const { _id } = req.user;
                const data = req.body;
                const productUpdated = await this.productService.update({ store_id: _id, _id: product_id }, Object.assign({}, data));
                if (!productUpdated.status) {
                    throw new HttpException_1.HttpException(500, productUpdated.error);
                }
                res.status(200).json({ message: "Product updated successfully" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = ProductsController;
//# sourceMappingURL=products.controller.js.map