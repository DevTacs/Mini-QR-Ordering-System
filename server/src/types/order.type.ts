import type {RowDataPacket} from "mysql2"

export interface Order extends RowDataPacket {
    orderId: number
    orderNumber: number
    productId: number
    quantity: number
    totalPrice: number
    paymentStatus: PaymentStatus
    createdAt: string
}

export interface OrderSummary extends RowDataPacket {
    orderNumber: number
    overallTotal: number
    paymentStatus: number
    itemsCount: number
}

export interface OrderDetails extends RowDataPacket {
    orderId: number
    orderNumber: number
    quantity: number
    totalPrice: number
    paymentStatus: PaymentStatus
    createdAt: string
    productId: number
    name: string
    description: string
    price: number
    imageUrl: string
}

export type CreateOrderPayload = {
    items: {
        productId: number
        quantity: number
    }[]
    paymentStatus: PaymentStatus
}

export interface CreateOrder {
    orderNumber: number
    productId: number
    quantity: number
    totalPrice: number
    paymentStatus: PaymentStatus
}

export enum PaymentStatus {
    Pending = 0,
    Paid = 1,
    Failed = 2,
}
