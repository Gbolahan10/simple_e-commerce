"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = require("../exceptions/HttpException");
function validationMiddleware(type, value = 'body') {
    return (req, res, next) => {
        const dtoObject = (0, class_transformer_1.plainToClass)(type, req[value]);
        (0, class_validator_1.validate)(dtoObject).then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(', ');
                next(new HttpException_1.HttpException(400, message));
            }
            else {
                next();
            }
        });
    };
}
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map