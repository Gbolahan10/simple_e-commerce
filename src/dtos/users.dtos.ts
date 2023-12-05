import {
    IsObject,
    IsNotEmptyObject,
    IsDefined,
    IsEmail,
    IsString,
    IsAlphanumeric,
    ValidateNested,
    IsNumber,
    MaxLength,
    MinLength,
    IsEnum,
    IsDateString,
    IsBoolean,
    IsOptional
  } from 'class-validator';

  export class CreateUserDto {
    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public storeName: string;
    
    @IsOptional()
    @IsString()
    public storeDescription: string;

    @IsString()
    public countryCode: string;

    @IsString()
    @MaxLength(11)
    public phoneNumber: string;
  }
  
  export class FindUserDto {
    @IsEmail()
    @IsOptional()
    public email?: string;
  
    @IsString()
    @IsOptional()
    public _id?: any;
  }
  
  export class AuthUserDto {
    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;
  }
  
  export class UserDto {
  
    @IsString()
    public _id: string;

    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public storeName: string;
    
    @IsString()
    public storeDescription: string;

    @IsString()
    public countryCode: string;

    @IsString()
    public phoneNumber: string;
  }