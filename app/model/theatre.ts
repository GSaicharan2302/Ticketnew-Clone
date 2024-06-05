import { Address } from "./address";
import { TheatreOrder } from "./theatre-order";

export class Theatre {
    theatreID?:string;
    theatreName?:string;
    theatreAddress?:Address;
    theatreEmail?:string;
    theatreContactNo?:string;
    status?:string;
    orders?:TheatreOrder[];
}
