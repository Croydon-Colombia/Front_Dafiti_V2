import { MarketPlace } from "./market-place"
import { OrderItem } from "./order-item"
import { OrderStatusHistory } from "./order-status-history"
import { LazyLoader } from "./lazy-loader"
import { OrderCustomers } from "./order-customers"

export interface OrderDetail {
    erpProccesses: any[]
    marketPlace: MarketPlace
    orderCustomers: OrderCustomers
    orderItems: OrderItem[]
    orderStatusHistories: OrderStatusHistory[]
    lazyLoader: LazyLoader
    marketPlaceId: number
    orderPk: string
    orderNumber: string
    orderTotalPrice: number
    orderTaxPercent: number
    orderTaxTotal: any
    orderDiscountTotal: number
    orderDiscountPercent: number
    orderJdeInvoice: any
    orderJdeOrder: any
    orderTrackingCode: string
    orderShoppingCart: number
    orderShoppingId: string
    orderSellerStatus: any
    isSuccess: boolean
    isCancel: boolean
    paymentReport: boolean
    orderSellerDate: string
  }


