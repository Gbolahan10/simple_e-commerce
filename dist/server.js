"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compression_1 = tslib_1.__importDefault(require("compression"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const index_1 = require("./src/config/index");
const error_middleware_1 = tslib_1.__importDefault(require("./src/middlewares/error.middleware"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = index_1.NODE_ENV || 'development';
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
    // Mongoose connection setup (no need to listen on a port)
    async connectToDatabase() {
        try {
            await mongoose_1.default.connect(index_1.DATABASE_URL);
            mongoose_1.default.Promise = global.Promise;
            console.log('🚀 Successfully connected to the database');
        }
        catch (error) {
            console.error('❌ Error connecting to the database:', error);
        }
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({ origin: index_1.ORIGIN, credentials: index_1.CREDENTIALS }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=server.js.map