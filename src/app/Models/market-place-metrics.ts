import {DateTime} from "luxon";
import {Marketplace} from "./market-place";

export interface MarketPlaceMetrics{
    date_end: DateTime;
    date_start: DateTime;
    marketplace: Marketplace;
    previous_cash_day: number;
    previous_count_sale: number;
    total_cash_day: number;
    total_day_count_sale: number;
    url_icon?: string;
}
