import { Package } from "./package";

export interface Ticket {
    id:number,
    package:Package,
    used_sessions:number,
    receipt:string,
    expiration_date:Date,
    created_at:Date
}
