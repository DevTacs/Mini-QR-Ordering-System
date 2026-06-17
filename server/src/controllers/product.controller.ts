import type {Request, Response} from "express"
import {getAllProductsService} from "../services/product.service.js"

export const getAllProducts = async (req: Request, res: Response) => {
    const result = await getAllProductsService()
    const products = result.map((item) => ({
        ...item,
        price: Number(item.price),
    }))

    res.status(200).json({
        data: products,
        success: true,
        message: products.length
            ? "Products retrieved successfully"
            : "No products found",
    })
}
