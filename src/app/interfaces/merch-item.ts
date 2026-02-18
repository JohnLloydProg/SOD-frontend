export interface MerchItem {
    id:number,
    name:string,
    price:string,
    customizations?:string[],
    thumbnail:string,
    image_links:{id:number, merch:number, image:string}[]
}
