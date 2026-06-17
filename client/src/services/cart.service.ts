import type {CartItem} from "@/types/cart.type"

const CART_KEY = "cart"

export function getCartService(): CartItem[] {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]")
}
export async function setCartService(item: CartItem) {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]")

    const existing: CartItem = cart.find(
        (i: CartItem) => i.productId === item.productId,
    )

    if (existing) {
        existing.quantity += 1
    } else {
        cart.push(item)
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart))
}
