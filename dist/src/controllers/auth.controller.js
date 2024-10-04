"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
const HttpException_1 = require("../exceptions/HttpException");
const index_1 = require("../config/index");
const users_models_1 = tslib_1.__importDefault(require("../models/users.models"));
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.userService = new database_service_1.default(users_models_1.default);
        /**
         * * Initial registration to onboard new user and store:
        */
        this.signUpByEmail = async (req, res, next) => {
            try {
                const { firstName, lastName, email, password, storeName, storeDescription, countryCode, phoneNumber } = req.body;
                const findUserResponse = await this.userService.find({ email });
                if (!findUserResponse.status && !findUserResponse.result) {
                    const { passwordHash } = await this.authService.generatePassword(password);
                    const data = {
                        email: email,
                        password: passwordHash,
                        firstName: firstName,
                        lastName: lastName,
                        storeName: storeName,
                        storeDescription: storeDescription,
                        countryCode: countryCode,
                        phoneNumber: phoneNumber,
                    };
                    const createUserResponse = await this.userService.create(data);
                    if (!createUserResponse.status)
                        throw new HttpException_1.HttpException(409, createUserResponse.error);
                    const user = createUserResponse.result;
                    delete user.password;
                    res.status(201).json({ data: { user }, message: 'Account created successfully.' });
                }
                else {
                    throw new HttpException_1.HttpException(409, 'Account already exists');
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.signInByEmail = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const findUserResponse = await this.userService.find({ email });
                if (findUserResponse.status && findUserResponse.result) {
                    const user = findUserResponse.result;
                    const passwordMatch = await this.authService.verifyPassword(user.password, password);
                    if (!passwordMatch) {
                        throw new HttpException_1.HttpException(401, 'Password Incorrect');
                    }
                    const { createdAt, expiresAt, expiresIn, token } = await this.authService.createToken(findUserResponse.result, index_1.SECRET_KEY, 500);
                    delete user.password;
                    res.status(200).json({ data: { user, token, createdAt, expiresAt, expiresIn }, message: 'Login successful' });
                }
                else {
                    throw new HttpException_1.HttpException(409, 'User does not exist');
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map