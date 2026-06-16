import {api} from "@/configs/axios.config"
import type {CreateOrder, OrderDetails, OrderSummary} from "@/types/order.type"
import type {ApiResponse, ApiResponseWithoutData} from "@/types/response.type"

export const getOrderSummaryService = async (): Promise<
    ApiResponse<OrderSummary[]>
> => {
    try {
        const {
            data: {data, message, success},
        } = await api.get("/orders/summary")
        return {data, message, success}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updatePaymentStatusService = async ({
    orderNumber,
    paymentStatus,
}: {
    orderNumber: number
    paymentStatus: number
}): Promise<ApiResponseWithoutData> => {
    try {
        const {
            data: {message, success},
        } = await api.patch(`/orders/${orderNumber}/payment-status`, {
            paymentStatus,
        })
        console.log(message, success)
        return {message, success}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createOrderService = async (payload: CreateOrder) => {
    try {
        const {
            data: {message, success},
        } = await api.post("/orders", payload)

        console.log(message, success)
        return {message, success}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getOrderDetailsByOrderNumberService = async (
    orderNumber: number,
): Promise<ApiResponse<OrderDetails[]>> => {
    try {
        const {
            data: {data, message, success},
        } = await api.get(`/orders/${orderNumber}/details`)
        return {data, message, success}
    } catch (error) {
        console.log(error)
        throw error
    }
}
