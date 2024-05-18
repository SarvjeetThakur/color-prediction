
declare type GenerateRandomNumber = (min: number, max: number) => number;

declare type CurrencyFormate = (country: string, price: number) => string ;

declare type GetStorage = (key: string) => any;


declare type SetStorage = (key: string, data: any) => boolean;
