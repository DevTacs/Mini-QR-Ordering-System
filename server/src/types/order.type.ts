import type {RowDataPacket} from "mysql2"

export interface Order extends RowDataPacket {
    OrderId: number
    OrderNumber: number
    ProductId: number
    PaymentStatus: PaymentStatus
}

export interface CreateOrder {
    OrderNumber: number
    ProductId: number
    PaymentStatus: PaymentStatus
}

export type PaymentStatus = {
    Pending: "Pending"
    Complete: "Complete"
}
