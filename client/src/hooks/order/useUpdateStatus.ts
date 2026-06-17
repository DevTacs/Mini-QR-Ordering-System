import {updatePaymentStatusService} from "@/services/order.service"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {toast} from "sonner"

export const useUpdateStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["update-payment-status"],
        mutationFn: async ({
            orderNumber,
            paymentStatus,
        }: {
            orderNumber: number
            paymentStatus: number
        }) => await updatePaymentStatusService({orderNumber, paymentStatus}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["orders"]})
            toast.success("Payment status updated successfully", {
                id: "update-payment-status",
            })
        },
        onError: () => {
            toast.error("Payment status update failed", {
                id: "update-payment-status",
            })
        },
    })
}
