import {getAllProductsService} from "@/services/product.service"
import {useQuery} from "@tanstack/react-query"

export const useProducts = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: getAllProductsService,
    })

    return {data, error, isLoading}
}
