export type CreateOrder = {
    paymentStatus: PaymentStatus
    items: OrderItem[]
}

type OrderItem = {
    productId: number
    quantity: number
}

export enum PaymentStatus {
    Pending = 0,
    Paid = 1,
    Failed = 2,
}

export type OrderSummary = {
    orderNumber: number
    overallTotal: number
    paymentStatus: number
    itemsCount: number
}

export type OrderDetails = {
    orderId: number
    orderNumber: number
    quantity: number
    totalPrice: number
    paymentStatus: number
    createdAt: string
    productId: number
    name: string
    description: string
    price: number
    imageUrl: string
}
