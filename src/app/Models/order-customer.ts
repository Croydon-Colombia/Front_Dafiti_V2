import { OrderAddress } from "./order-address";

export interface OrderCustomers {
    customerFirstName:    string;
    customerLastName:     string;
    customerCity:         string;
    customerRegion:       string;
    customerPostCode:     string;
    customerEmail:        string;
    customerRegNumber:    string;
    customerRegType:      string;
    orderMarketPlaceId:   number;
    orderOrderPk:         string;
    orderOrderNumber:     string;
    orderAddressBillings: OrderAddress;
    orderAddressShipping: OrderAddress;
}
