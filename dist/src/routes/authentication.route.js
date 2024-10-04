"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const users_dtos_1 = require("../dtos/users.dtos");
//import authMiddleware from '@middlewares/auth.middleware';
const validation_middleware_1 = require("../middlewares/validation.middleware");
class AuthRoute {
    constructor() {
        this.path = '/auth/';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}signup`, (0, validation_middleware_1.validationMiddleware)(users_dtos_1.CreateUserDto, 'body'), this.authController.signUpByEmail);
        this.router.post(`${this.path}signin`, (0, validation_middleware_1.validationMiddleware)(users_dtos_1.AuthUserDto, 'body'), this.authController.signInByEmail);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=authentication.route.js.map