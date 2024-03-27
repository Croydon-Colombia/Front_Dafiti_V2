export interface OrderItem {
    orderMarketPlaceId: number
    orderOrderPk: string
    orderOrderNumber: string
    itemSku: string
    itemId: number
    itemQty: number
    itemUnitPrice: number
    itemTotalPrice: number
    itemTaxTotal: number
    itemTaxPercent: number
    itemDiscountPercent: any
    itemDiscountTotal: any
    shippingProvider: any
    shipmentType: string
    crossdockingDeliveryType: string
  }
