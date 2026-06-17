import type {Request, Response} from "express"
import {
    createOrderService,
    getAllOrdersSummaryService,
    getOrderDetailsByOrderNumberService,
    getOrderTotalAmountService,
    updatePaymentStatusService,
} from "../services/order.service.js"

export const getAllOrdersSummary = async (req: Request, res: Response) => {
    const result = await getAllOrdersSummaryService()
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

export const updatePaymentStatus = async (req: Request, res: Response) => {
    const {orderNumber} = req.params
    const {paymentStatus} = req.body

    await updatePaymentStatusService(Number(orderNumber), paymentStatus)
    res.status(200).json({
        success: true,
        message: "Payment status updated successfully",
    })
}

export const getOrderDetails = async (req: Request, res: Response) => {
    const {orderNumber} = req.params

    const orders = await getOrderDetailsByOrderNumberService(
        Number(orderNumber),
    )

    res.status(200).json({
        data: orders,
        success: true,
        message: orders.length
            ? "Order details retrieved successfully"
            : "No order details found",
    })
}
