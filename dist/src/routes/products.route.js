"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const products_controller_1 = tslib_1.__importDefault(require("../controllers/products.controller"));
const products_dto_1 = require("../dtos/products.dto");
class ProductsRoute {
    constructor() {
        this.path = '/products';
        this.router = (0, express_1.Router)();
        this.productsController = new products_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, (0, validation_middleware_1.validationMiddleware)(products_dto_1.CreateProductDto, 'body'), auth_middleware_1.default, this.productsController.createProduct);
        this.router.get(`${this.path}/:product_id`, auth_middleware_1.default, this.productsController.findProduct);
        this.router.get(`${this.path}/`, auth_middleware_1.default, this.productsController.findAllProducts);
        this.router.delete(`${this.path}/:product_id`, auth_middleware_1.default, this.productsController.removeProduct);
        this.router.put(`${this.path}/:product_id`, (0, validation_middleware_1.validationMiddleware)(products_dto_1.UpdateProductDto, 'body'), auth_middleware_1.default, this.productsController.editProduct);
    }
}
exports.default = ProductsRoute;
//# sourceMappingURL=products.route.js.map