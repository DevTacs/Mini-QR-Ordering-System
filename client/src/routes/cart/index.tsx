import {createFileRoute} from "@tanstack/react-router"
import {Button} from "@/components/ui/button"
import {useCart} from "@/hooks/cart/useCart"
import CartPanel from "@/components/cart/cart-panel"
import {PaymentStatus} from "@/types/order.type"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {createOrderService} from "@/services/order.service"
import {toast} from "sonner"

export const Route = createFileRoute("/cart/")({
    component: RouteComponent,
})

function RouteComponent() {
    const queryClient = useQueryClient()
    const {data: cart} = useCart()
    const {mutateAsync} = useMutation({
        mutationKey: ["create-order"],
        mutationFn: createOrderService,
        onSuccess: () => {
            localStorage.removeItem("cart")
            queryClient.invalidateQueries({queryKey: ["cart"]})
            toast.success("Order created successfully")
        },
    })

    const total = cart?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )

    const handlePayment = async (status: PaymentStatus) => {
        if (!cart) return
        const items = cart.map((item) => {
            return {
                productId: item.productId,
                quantity: item.quantity,
            }
        })

        const payload = {
            paymentStatus: status,
            items,
        }
        await mutateAsync(payload)
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>

            {cart && cart.length === 0 ? (
                <p className="text-gray-400">Your cart is empty</p>
            ) : (
                <>
                    <CartPanel cart={cart ?? []} />
                    <div className="flex justify-between border-t border-gray-800 pt-4 text-lg font-semibold">
                        <span>Total</span>
                        <span>Php {total?.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            className="bg-green-600 hover:bg-green-500"
                            onClick={() =>
                                handlePayment(PaymentStatus.Pending)
                            }>
                            Pay Success
                        </Button>

                        <Button
                            className="bg-red-600 hover:bg-red-500"
                            onClick={() => handlePayment(PaymentStatus.Failed)}>
                            Pay Failed
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
