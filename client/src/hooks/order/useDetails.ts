import {getOrderDetailsByOrderNumberService} from "@/services/order.service"
import {useQuery} from "@tanstack/react-query"

export const useDetails = ({orderNumber}: {orderNumber: number}) =>
    useQuery({
        queryKey: ["orderDetails", orderNumber],
        queryFn: () => getOrderDetailsByOrderNumberService(Number(orderNumber)),
    })
