import {DateTime} from "luxon";
import {Marketplace} from "./market-place";
import {OrderInfo} from "./order-info";
import {MarketPlaceMetrics} from "./market-place-metrics";

export interface DashBoardData {
    market_place_metrics: MarketPlaceMetrics[];
    pending_orders?: OrderInfo[];
}

