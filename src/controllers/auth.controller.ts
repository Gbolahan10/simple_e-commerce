import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { AuthUserDto, CreateUserDto, UserDto } from '../dtos/users.dtos';
import { HttpException } from '../exceptions/HttpException';
import { SECRET_KEY } from '../config/index';
import User from '../models/users.models';
import DatabaseService from '../services/database.service';


class AuthController {
    public authService = new AuthService();
    public userService = new DatabaseService(User);
    
    /**
     * * Initial registration to onboard new user and store:
    */
    public signUpByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { firstName, lastName, email, password, storeName, storeDescription, countryCode, phoneNumber }: CreateUserDto = req.body;
            const findUserResponse = await this.userService.find({ email });
            
            if (!findUserResponse.status && !findUserResponse.result) {
              const { passwordHash } = await this.authService.generatePassword(password);

              const data: CreateUserDto = {
                  email: email,
                  password: passwordHash,
                  firstName: firstName,
                  lastName: lastName,
                  storeName: storeName,
                  storeDescription: storeDescription,
                  countryCode: countryCode,
                  phoneNumber: phoneNumber,
              }
              
              const createUserResponse = await this.userService.create(data);
              if (!createUserResponse.status) throw new HttpException(409, createUserResponse.error);
              const user = createUserResponse.result;

              res.status(201).json({ data: { user }, message: 'Account created successfully.' });
            } else {
                throw new HttpException(409, 'Account already exists');
            }
        } catch (error) {
            next(error);
            }
    }

    public signInByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password }: AuthUserDto = req.body;
            const findUserResponse = await this.userService.find({ email });
            
            if (findUserResponse.status && findUserResponse.result) {

            const user: UserDto = findUserResponse.result;
            const passwordMatch = await this.authService.verifyPassword(user.password, password);

            if (!passwordMatch) { throw new HttpException(401, 'Password Incorrect'); }
            
            const { createdAt, expiresAt, expiresIn, token } = await this.authService.createToken(findUserResponse.result, SECRET_KEY, 500);

            res.status(200).json({ data: { user, token, createdAt, expiresAt, expiresIn }, message: 'Login successful' });
            } else {
                throw new HttpException(409, 'User does not exist');
            }
        } catch (error) {
            next(error);
            }
    }
}

export default AuthController;