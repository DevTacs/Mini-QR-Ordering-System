import type {CartItem} from "@/types/cart.type"
import {useQueryClient} from "@tanstack/react-query"
import {Button} from "../ui/button"

export default function CartPanel({cart}: {cart: CartItem[]}) {
    const queryClient = useQueryClient()

    const updateCart = async (updated: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(updated))
        await queryClient.invalidateQueries({queryKey: ["cart"]})
    }

    const addQty = (productId: number) => {
        if (!cart) return
        const existing = cart.find(
            (item: CartItem) => item.productId === productId,
        )
        if (existing && existing.quantity >= existing.stock) return

        const updated: CartItem[] = cart.map((item: CartItem) =>
            item.productId === productId
                ? {...item, quantity: item.quantity + 1}
                : item,
        )

        updateCart(updated)
    }

    const removeQty = (productId: number) => {
        if (!cart) return
        const updated: CartItem[] = cart
            .map((item: CartItem) =>
                item.productId === productId
                    ? {...item, quantity: item.quantity - 1}
                    : item,
            )
            .filter((item) => item.quantity > 0)

        updateCart(updated)
    }
    return (
        <div className="space-y-4">
            {cart?.map((item: CartItem) => (
                <div
                    key={item.productId}
                    className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4">
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                        <img
                            src={item.imageUrl}
                            className="h-14 w-14 rounded-lg object-cover"
                        />

                        <div>
                            <h2 className="font-semibold">{item.name}</h2>
                            <p className="text-sm text-gray-400">
                                ₱{item.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => removeQty(item.productId)}>
                            -
                        </Button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <Button
                            variant="secondary"
                            disabled={
                                item.quantity === item.stock ||
                                item.quantity >= item.stock
                            }
                            onClick={() => addQty(item.productId)}>
                            +
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
