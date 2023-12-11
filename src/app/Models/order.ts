import { ERPProccess } from "./erp-proccess";
import { MarketPlace } from "./market-place-a";
import {OrderCustomers} from "./order-customer";
import { OrderItem } from "./order-item";
import { OrderStatusHistory } from "./order-status-history";

export interface Order {
    marketPlaceId:        number;
    orderPk:              string;
    orderNumber:          string;
    orderTotalPrice:      number;
    orderTaxPercent:      number;
    orderTaxTotal:        number;
    orderDiscountTotal:   number;
    orderDiscountPercent: number;
    orderJdeInvoice:      string;
    orderJdeOrder:        string;
    orderTrackingCode:    string;
    orderShoppingCart:    number;
    orderShoppingId:      string;
    orderSellerStatus:    string;
    isSuccess:            boolean;
    isCancel:             boolean;
    paymentReport:        boolean;
    orderSellerDate:      Date;
    erpProccesses:        ERPProccess[];
    marketPlace:          MarketPlace;
    orderCustomers:       OrderCustomers;
    orderItems:           OrderItem[];
    orderStatusHistories: OrderStatusHistory[];
}
