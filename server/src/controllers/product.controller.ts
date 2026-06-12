import type {Request, Response} from "express"
import {getAllProductsService} from "../services/product.service.js"

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await getAllProductsService()
        const products = result.map((item) => ({
            ...item,
            Price: Number(item.Price),
        }))

        return res.status(200).json({
            data: products,
            success: true,
            message: products.length
                ? "Products retrieved successfully"
                : "No products found",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}
