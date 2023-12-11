import {OrderItems} from "./order-items";
import {Erp_information} from "./erp_information";
import {DateTime} from "luxon";

export interface OrderInfo {
    order_id: string
    market_place_id: number;
    market_place_name: string;
    order_status?: string;
    order_created_at: string
    tracking_number?: string
    order_items: OrderItems[];
    erp_information: Erp_information;
}
