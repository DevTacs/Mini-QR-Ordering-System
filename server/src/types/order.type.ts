import type {RowDataPacket} from "mysql2"

export interface Order extends RowDataPacket {
    OrderId: number
    OrderNumber: number
    ProductId: number
    Quantity: number
    TotalPrice: number
    PaymentStatus: PaymentStatus
    CreatedAt: string
}

export type CreateOrderPayload = {
    Items: {
        ProductId: number
        Quantity: number
    }[]
}

export interface CreateOrder {
    OrderNumber: number
    ProductId: number
    Quantity: number
    TotalPrice: number
    PaymentStatus: PaymentStatus
}

export enum PaymentStatus {
    Pending,
    Complete,
}
