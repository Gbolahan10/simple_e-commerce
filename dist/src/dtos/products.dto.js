"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = exports.UpdateProductDto = exports.CreateProductDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
var Currency;
(function (Currency) {
    Currency["NGN"] = "NGN";
    Currency["USD"] = "USD";
    Currency["EUR"] = "EUR";
})(Currency || (Currency = {}));
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "currency", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "currency", void 0);
class ProductDto {
}
exports.ProductDto = ProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], ProductDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], ProductDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], ProductDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], ProductDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProductDto.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProductDto.prototype, "store_id", void 0);
//# sourceMappingURL=products.dto.js.map