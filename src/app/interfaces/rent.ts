import { Branch } from "./branch";

export interface Rent {
    id:number,
    branch:Branch,
    date:Date,
    start_time:string,
    end_time:string,
    receipt:string
}
