import {connection} from "../data/db.js"
import {
    PaymentStatus,
    type CreateOrderPayload,
    type Order,
} from "../types/order.type.js"
import {
    createOrderRepository,
    getAllOrdersRepository,
    getOrderByNumberRepository,
    getOrderTotalAmountRepository,
    getRecentOrderNumberRepository,
} from "../repositories/order.repository.js"
import {
    deductStockByProductIdRepository,
    getProductByIdRepository,
} from "../repositories/product.repository.js"
import createHttpError from "http-errors"

export const getAllOrdersService = async (): Promise<Order[]> => {
    const conn = await connection.getConnection()
    try {
        return await getAllOrdersRepository(conn)
    } finally {
        conn.release()
    }
}

export const getRecentOrderNumberService = async (): Promise<number> => {
    const conn = await connection.getConnection()
    try {
        return await getRecentOrderNumberRepository(conn)
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

        for (const item of data.Items) {
            const product = await getProductByIdRepository(conn, item.ProductId)

            if (!product) {
                throw createHttpError(404, "Product not found")
            }

            if (product.Stock < item.Quantity) {
                throw createHttpError(400, "Insufficient stock")
            }

            const result = await deductStockByProductIdRepository(
                conn,
                item.ProductId,
                item.Quantity,
            )

            if (result == 0) {
                throw createHttpError(400, "Stock update failed")
            }

            // insert order item
            const orderResult = await createOrderRepository(conn, {
                OrderNumber: nextOrderNumber,
                ProductId: item.ProductId,
                Quantity: item.Quantity,
                TotalPrice: Number(product.Price) * Number(item.Quantity),
                PaymentStatus: PaymentStatus.Pending,
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
