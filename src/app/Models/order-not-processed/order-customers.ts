import { OrderAddressBillings } from "./order-address-billings"
import { OrderAddressShipping } from "./order-address-shipping"

export interface OrderCustomers {
    customerFirstName: string
    customerLastName: string
    customerCity: string
    customerRegion: string
    customerPostCode: string
    customerEmail: string
    customerRegNumber: string
    customerRegType: string
    orderMarketPlaceId: number
    orderOrderPk: string
    orderOrderNumber: string
    orderAddressBillings: OrderAddressBillings
    orderAddressShipping: OrderAddressShipping
  }
