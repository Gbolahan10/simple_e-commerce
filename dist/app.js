"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
const authentication_route_1 = tslib_1.__importDefault(require("./src/routes/authentication.route"));
const products_route_1 = tslib_1.__importDefault(require("./src/routes/products.route"));
const index_route_1 = tslib_1.__importDefault(require("./src/routes/index.route"));
const validateEnv_1 = tslib_1.__importDefault(require("./src/utils/helpers/validateEnv"));
(0, validateEnv_1.default)();
// Initialize the app with routes
const app = new server_1.default([
    new index_route_1.default(),
    new authentication_route_1.default(),
    new products_route_1.default(),
]);
// Connect to database
app.connectToDatabase();
// Export the app for Vercel (do not call app.listen)
exports.default = app.getServer();
//# sourceMappingURL=app.js.map