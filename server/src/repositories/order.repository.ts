import type {ResultSetHeader} from "mysql2"
import type {
    Order,
    CreateOrder,
    PaymentStatus,
    OrderSummary,
    OrderDetails,
} from "../types/order.type.js"
import type {PoolConnection} from "mysql2/promise"

export const getAllOrdersSummaryRepository = async (
    connection: PoolConnection,
): Promise<OrderSummary[]> => {
    const [rows] = await connection.query<OrderSummary[]>(
        `SELECT
        OrderNumber,
        SUM(TotalPrice) AS OverallTotal,
        PaymentStatus,
        SUM(Quantity) AS ItemsCount
    FROM \`Order\`
    GROUP BY OrderNumber, PaymentStatus
    ORDER BY OrderNumber DESC`,
    )

    return rows
}

export const getOrderDetailsByOrderNumberRepository = async (
    connection: PoolConnection,
    orderNumber: number,
) => {
    const [rows] = await connection.query<OrderDetails[]>(
        `
        SELECT
            o.OrderId,
            o.OrderNumber,
            o.Quantity,
            o.TotalPrice,
            o.PaymentStatus,
            o.CreatedAt,

            p.ProductId,
            p.Name,
            p.Description,
            p.Price,
            p.ImageUrl
        FROM \`Order\` o
        JOIN Product p ON o.ProductId = p.ProductId
        WHERE o.OrderNumber = ?
        `,
        [orderNumber],
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
    const {orderNumber, productId, quantity, totalPrice, paymentStatus} = order
    const [result] = await connection.query<ResultSetHeader>(
        "INSERT INTO `Order` (OrderNumber, ProductId, Quantity, TotalPrice, PaymentStatus) VALUES (?, ?, ?, ?, ?)",
        [orderNumber, productId, quantity, totalPrice, Number(paymentStatus)],
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

export const updatePaymentStatusRepository = async (
    connection: PoolConnection,
    orderNumber: number,
    paymentStatus: PaymentStatus,
) => {
    const [result] = await connection.query<ResultSetHeader>(
        `UPDATE \`Order\` SET PaymentStatus = ? WHERE OrderNumber = ?`,
        [Number(paymentStatus), orderNumber],
    )
    return result.affectedRows
}
