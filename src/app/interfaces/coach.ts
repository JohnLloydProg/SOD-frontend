import { Class } from "./class";

export interface Coach {
    id:number,
    name:string,
    card_picture:string,
    bio_picture:string,
    bio:string,
    motto:string,
    lessons?:string[]
}
