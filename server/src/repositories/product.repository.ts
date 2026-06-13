import type {PoolConnection} from "mysql2/promise"
import type {Product} from "../types/product.type.js"

export const getAllProductsRepository = async (
    connection: PoolConnection,
): Promise<Product[]> => {
    const [rows] = await connection.query<Product[]>("SELECT * FROM Product")
    return rows
}

export const getProductByIdRepository = async (
    connection: PoolConnection,
    productId: number,
): Promise<Product | null> => {
    const [rows] = await connection.query<Product[]>(
        "SELECT * FROM Product WHERE ProductId = ?",
        [productId],
    )

    return rows[0] ?? null
}

export const deductStockByProductIdRepository = async (
    connection: PoolConnection,
    productId: number,
    quantity: number,
) => {
    const [result] = await connection.query(
        "UPDATE Product SET Stock = Stock - ? WHERE ProductId = ?",
        [quantity, productId],
    )
    return (result as any).affectedRows
}
