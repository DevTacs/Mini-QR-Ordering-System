import {getOrderSummaryService} from "@/services/order.service"
import {useQuery} from "@tanstack/react-query"

export const useSummary = () =>
    useQuery({
        queryKey: ["orders"],
        queryFn: getOrderSummaryService,
    })
