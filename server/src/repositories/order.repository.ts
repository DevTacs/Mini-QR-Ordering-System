import type {ResultSetHeader} from "mysql2"
import type {Order, CreateOrder} from "../types/order.type.js"
import type {PoolConnection} from "mysql2/promise"

export const getAllOrdersRepository = async (
    connection: PoolConnection,
): Promise<Order[]> => {
    const [rows] = await connection.query<Order[]>(
        "SELECT * FROM `Order` Order By OrderNumber Asc",
    )
    return rows
}

export const getOrderByNumberRepository = async (
    connection: PoolConnection,
    orderNumber: number,
) => {
    const [rows] = await connection.query<Order[]>(
        "SELECT * FROM `Order` WHERE OrderNumber = ?",
        [orderNumber],
    )
    return rows
}

export const getRecentOrderNumberRepository = async (
    connection: PoolConnection,
) => {
    const [rows] = await connection.query(
        "SELECT MAX(OrderNumber) as recentOrderNumber FROM `Order`",
    )
    return (rows as any)[0].recentOrderNumber
}

export const createOrderRepository = async (
    connection: PoolConnection,
    order: CreateOrder,
) => {
    const {OrderNumber, ProductId, Quantity, TotalPrice, PaymentStatus} = order
    const [result] = await connection.query<ResultSetHeader>(
        "INSERT INTO `Order` (OrderNumber, ProductId, Quantity, TotalPrice, PaymentStatus) VALUES (?, ?, ?, ?, ?)",
        [OrderNumber, ProductId, Quantity, TotalPrice, PaymentStatus],
    )
    return result.affectedRows
}

export const getOrderTotalAmountRepository = async (
    connection: PoolConnection,
    orderNumber: number,
) => {
    const [rows] = await connection.query(
        `SELECT SUM(TotalPrice) AS orderTotal FROM \`Order\` WHERE OrderNumber = ?`,
        [orderNumber],
    )

    return (rows as any)[0].orderTotal
}
