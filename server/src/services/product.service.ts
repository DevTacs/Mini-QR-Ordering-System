import {connection} from "../data/db.js"
import {
    deductStockByProductIdRepository,
    getAllProductsRepository,
    getProductByIdRepository,
} from "../repositories/product.repository.js"
import type {Product} from "../types/product.type.js"

export const getAllProductsService = async (): Promise<Product[]> => {
    const conn = await connection.getConnection()
    try {
        return await getAllProductsRepository(conn)
    } finally {
        conn.release()
    }
}

export const getProductByIdService = async (
    productId: number,
): Promise<Product | null> => {
    const conn = await connection.getConnection()
    try {
        return await getProductByIdRepository(conn, productId)
    } finally {
        conn.release()
    }
}
