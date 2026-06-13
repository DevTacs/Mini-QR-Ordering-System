import type {Request, Response} from "express"
import {
    createOrderService,
    getAllOrdersService,
    getOrderTotalAmountService,
} from "../services/order.service.js"

export const getAllOrders = async (req: Request, res: Response) => {
    const result = await getAllOrdersService()
    res.json({
        data: result,
        status: "success",
        message: result.length
            ? "Orders retrieved successfully"
            : "No orders found",
    })
}

export const createOrder = async (req: Request, res: Response) => {
    const payload = req.body

    await createOrderService(payload)
    res.status(201).json({
        success: true,
        message: "Order created successfully",
    })
}

export const getTotalOrderAmount = async (req: Request, res: Response) => {
    const {orderNumber} = req.params

    const result = await getOrderTotalAmountService(Number(orderNumber))
    res.status(200).json({
        data: {
            orderTotal: result,
        },
        success: true,
        message: "Order retrieved successfully",
    })
}
