import {getCartService} from "@/services/cart.service"
import type {CartItem} from "@/types/cart.type"
import {useQuery} from "@tanstack/react-query"

export const useCart = () => {
    return useQuery<CartItem[]>({
        queryKey: ["cart"],
        queryFn: getCartService,
    })
}
