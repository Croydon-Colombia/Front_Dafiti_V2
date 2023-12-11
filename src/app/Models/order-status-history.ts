import { OrderStatusStatusCodeNavigation } from "./order-status-code-navigation";

export interface OrderStatusHistory {
    orderMarketPlaceId:              number;
    orderOrderPk:                    string;
    orderOrderNumber:                string;
    orderStatusStatusCode:           string;
    orderStatusHistoryDate:          Date;
    orderStatusStatusCodeNavigation: OrderStatusStatusCodeNavigation;
}
