import type {ResultSetHeader} from "mysql2"
import {connection} from "../data/db.js"
import type {Order, CreateOrder} from "../types/order.type.js"

export const getAllOrdersService = async (): Promise<Order[]> => {
    const [rows] = await connection.query<Order[]>("SELECT * FROM `Order`")
    return rows
}

export const getRecentOrderNumberService = async () => {
    const [rows] = await connection.query(
        "SELECT MAX(OrderNumber) as recentOrderNumber FROM `Order`",
    )
    return (rows as any)[0].recentOrderNumber
}

export const createOrderService = async (order: CreateOrder) => {
    const [result] = await connection.query<ResultSetHeader>(
        "INSERT INTO `Order` (OrderNumber, ProductId, PaymentStatus) VALUES (?, ?, ?)",
        [order.OrderNumber, order.ProductId, order.PaymentStatus],
    )
    return result.affectedRows
}
