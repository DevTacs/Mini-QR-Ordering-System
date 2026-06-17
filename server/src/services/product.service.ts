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
        const products = await getAllProductsRepository(conn)
        return products.map((product) => {
            return {
                productId: product.ProductId,
                name: product.Name,
                description: product.Description,
                stock: product.Stock,
                price: product.Price,
                imageUrl: product.ImageUrl,
            } as Product
        })
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
