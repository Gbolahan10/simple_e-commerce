"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    currency: {
        type: String,
        enum: ['NGN', 'USD', 'EUR'],
        default: 'NGN',
    },
    store_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
//# sourceMappingURL=products.model.js.map