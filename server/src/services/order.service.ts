import {connection} from "../data/db.js"
import {
    PaymentStatus,
    type CreateOrderPayload,
    type OrderDetails,
    type OrderSummary,
} from "../types/order.type.js"
import {
    createOrderRepository,
    getAllOrdersSummaryRepository,
    getOrderByNumberRepository,
    getOrderDetailsByOrderNumberRepository,
    getOrderTotalAmountRepository,
    getRecentOrderNumberRepository,
    updatePaymentStatusRepository,
} from "../repositories/order.repository.js"
import {
    deductStockByProductIdRepository,
    getProductByIdRepository,
} from "../repositories/product.repository.js"
import createHttpError from "http-errors"

export const getAllOrdersSummaryService = async (): Promise<OrderSummary[]> => {
    const conn = await connection.getConnection()
    try {
        const result = await getAllOrdersSummaryRepository(conn)
        return result.map((item) => {
            return {
                orderNumber: item.OrderNumber,
                itemsCount: item.ItemsCount,
                overallTotal: item.OverallTotal,
                paymentStatus: item.PaymentStatus,
            } as OrderSummary
        })
    } finally {
        conn.release()
    }
}

export const getOrderDetailsByOrderNumberService = async (
    orderNumber: number,
) => {
    const conn = await connection.getConnection()
    try {
        const orders = await getOrderByNumberRepository(conn, orderNumber)
        if (orders.length === 0) throw createHttpError(404, "Order not found")

        const result = await getOrderDetailsByOrderNumberRepository(
            conn,
            orderNumber,
        )
        return result.map((item) => {
            return {
                orderId: item.OrderId,
                orderNumber: item.OrderNumber,
                quantity: item.Quantity,
                totalPrice: item.TotalPrice,
                paymentStatus: item.PaymentStatus,
                createdAt: item.CreatedAt,
                productId: item.ProductId,
                name: item.Name,
                description: item.Description,
                price: item.Price,
                imageUrl: item.ImageUrl,
            } as OrderDetails
        })
    } finally {
        conn.release()
    }
}

export const createOrderService = async (data: CreateOrderPayload) => {
    const conn = await connection.getConnection()

    try {
        await conn.beginTransaction()

        // //Get order number
        const recentOrderNumber = await getRecentOrderNumberRepository(conn)
        const nextOrderNumber = recentOrderNumber ? recentOrderNumber + 1 : 1

        for (const item of data.items) {
            const product = await getProductByIdRepository(conn, item.productId)

            if (!product) throw createHttpError(404, "Product not found")

            if (product.stock < item.quantity)
                throw createHttpError(400, "Insufficient stock")

            // insert order item
            const orderResult = await createOrderRepository(conn, {
                orderNumber: nextOrderNumber,
                productId: item.productId,
                quantity: item.quantity,
                totalPrice: Number(product.Price) * Number(item.quantity),
                paymentStatus: data.paymentStatus,
            })

            if (orderResult == 0) {
                throw createHttpError(400, "Order creation failed")
            }
        }

        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export const getOrderTotalAmountService = async (orderNumber: number) => {
    const conn = await connection.getConnection()
    try {
        const orders = await getOrderByNumberRepository(conn, orderNumber)
        if (orders.length === 0) throw createHttpError(404, "Order not found")

        return await getOrderTotalAmountRepository(conn, orderNumber)
    } finally {
        conn.release()
    }
}

export const updatePaymentStatusService = async (
    orderNumber: number,
    paymentStatus: PaymentStatus,
) => {
    const conn = await connection.getConnection()
    try {
        await conn.beginTransaction()

        const orders = await getOrderByNumberRepository(conn, orderNumber)
        if (orders.length === 0) throw createHttpError(404, "Order not found")

        if (orders[0]!.PaymentStatus === PaymentStatus.Paid)
            throw createHttpError(400, "Order already paid")

        for (const order of orders) {
            const product = await getProductByIdRepository(
                conn,
                order.ProductId,
            )

            if (!product) throw createHttpError(404, "Product not found")

            if (product.Stock < order.Quantity)
                throw createHttpError(400, "Insufficient stock")

            const result = await deductStockByProductIdRepository(
                conn,
                order.ProductId,
                order.Quantity,
            )

            if (result == 0) throw createHttpError(400, "Stock update failed")
        }
        const result = await updatePaymentStatusRepository(
            conn,
            orderNumber,
            paymentStatus,
        )

        if (result == 0)
            throw createHttpError(400, "Payment status update failed")

        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}
