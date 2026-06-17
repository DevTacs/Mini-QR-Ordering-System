import {setCartService} from "@/services/cart.service"
import {useMutation, useQueryClient} from "@tanstack/react-query"

export const useAddToCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["add-to-cart"],
        mutationFn: setCartService,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]})
        },
    })
}
