import { OrderStatusStatusCodeNavigation } from "./order-status-status-code-navigation"

export interface OrderStatusHistory {
    orderMarketPlaceId: number
    orderOrderPk: string
    orderOrderNumber: string
    orderStatusStatusCode: string
    orderStatusHistoryDate: string
    orderStatusStatusCodeNavigation: OrderStatusStatusCodeNavigation
  }
