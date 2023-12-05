import { IsOptional, IsString, IsNumber } from 'class-validator';

enum Currency {
  NGN = 'NGN',
  USD = 'USD',
  EUR = 'EUR',
}
  
  export class CreateProductDto {

    @IsString()
    public name: String;
    
    @IsString()
    @IsOptional()
    public description: String;
    
    @IsNumber()
    public price: Number;

    @IsString()
    public currency: Currency;
  }

  export class UpdateProductDto {

    @IsString()
    @IsOptional()
    public name: String;
    
    @IsString()
    @IsOptional()
    public description: String;
    
    @IsNumber()
    @IsOptional()
    public price: Number;

    @IsString()
    @IsOptional()
    public currency: Currency;
  }
  
  export class ProductDto {

    @IsString()
    public _id;

    @IsString()
    public name;
    
    @IsString()
    @IsOptional()
    public description;
    
    @IsString()
    public price;

    @IsString()
    public currency: Currency;

    @IsString()
    public store_id: string;
  }