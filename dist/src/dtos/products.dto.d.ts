declare enum Currency {
    NGN = "NGN",
    USD = "USD",
    EUR = "EUR"
}
export declare class CreateProductDto {
    name: String;
    description: String;
    price: Number;
    currency: Currency;
}
export declare class UpdateProductDto {
    name: String;
    description: String;
    price: Number;
    currency: Currency;
}
export declare class ProductDto {
    _id: any;
    name: any;
    description: any;
    price: any;
    currency: Currency;
    store_id: string;
}
export {};
