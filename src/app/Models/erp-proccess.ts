export interface ERPProccess {
    id:                 number;
    orderMarketPlaceId: number;
    orderOrderPk:       string;
    orderOrderNumber:   string;
    erpMessage:         string;
    erpProccessState:   boolean;
    erpProccessDate:    Date;
}
