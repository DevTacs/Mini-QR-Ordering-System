import {api} from "@/configs/axios.config"
import type {Product} from "@/types/product.type"
import type {ApiResponse} from "@/types/response.type"

export const getAllProductsService = async (): Promise<
    ApiResponse<Product[]>
> => {
    try {
        const {
            data: {data, message, success},
        } = await api.get(`/products`)

        return {
            data,
            success,
            message,
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
