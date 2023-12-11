export interface OrderItem {
    orderMarketPlaceId:       number;
    orderOrderPk:             string;
    orderOrderNumber:         string;
    itemSku:                  string;
    itemId:                   number;
    itemQty:                  number;
    itemUnitPrice:            number;
    itemTotalPrice:           number;
    itemTaxTotal:             number;
    itemTaxPercent:           number;
    itemDiscountPercent:      number;
    itemDiscountTotal:        number;
    shippingProvider:         number | string;
    shipmentType:             number;
    crossdockingDeliveryType: number | null;
}
