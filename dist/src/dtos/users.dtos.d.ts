export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    storeDescription: string;
    countryCode: string;
    phoneNumber: string;
}
export declare class FindUserDto {
    email?: string;
    _id?: any;
}
export declare class AuthUserDto {
    email: string;
    password: string;
}
export declare class UserDto {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
    storeDescription: string;
    countryCode: string;
    phoneNumber: string;
}
