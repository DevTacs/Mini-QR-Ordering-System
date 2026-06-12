import {connection} from "../data/db.js"
import type {Item} from "../types/product.type.js"

export const getAllProductsService = async (): Promise<Item[]> => {
    const [rows] = await connection.query<Item[]>("SELECT * FROM Item")
    return rows
}
