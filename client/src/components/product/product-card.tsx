import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import type {Product} from "@/types/product.type"
import {useQueryClient} from "@tanstack/react-query"
import {useAddToCart} from "@/hooks/cart/useAddToCart"
import type {CartItem} from "@/types/cart.type"

export function ProductCard({product}: {product: Product}) {
    const queryClient = useQueryClient()
    const data = queryClient.getQueryData<CartItem[]>(["cart"])
    const addToCartMutation = useAddToCart()

    const getItemQuantity = (productId: number) => {
        return data?.find((i) => i.productId === productId)?.quantity ?? 0
    }

    const handleAddToCart = (item: CartItem) => {
        const itemQuantity = getItemQuantity(item.productId)

        if (itemQuantity >= product.stock) return
        addToCartMutation.mutate(item)
    }

    const stockColor =
        product.stock > 10
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : product.stock > 0
              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              : "bg-red-500/20 text-red-400 border-red-500/30"

    return (
        <Card className="group overflow-hidden border-gray-800 bg-gray-900 transition hover:-translate-y-1 hover:border-gray-700">
            <div className="h-44 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transform-gpu will-change-transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            <CardHeader className="space-y-1">
                <CardTitle className="text-base font-semibold text-primary-foreground">
                    {product.name}
                </CardTitle>
                <p className="text-xs text-gray-400 line-clamp-2">
                    {product.description}
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Badge className={`border ${stockColor}`}>
                        {product.stock} in stock
                    </Badge>

                    <span className="text-lg font-semibold text-white">
                        Php {product.price.toFixed(2)}
                    </span>
                </div>

                <Button
                    variant="secondary"
                    disabled={
                        getItemQuantity(product.productId) >= product.stock
                    }
                    onClick={() =>
                        handleAddToCart({
                            productId: product.productId,
                            description: product.description,
                            name: product.name,
                            stock: product.stock,
                            price: product.price,
                            imageUrl: product.imageUrl,
                            quantity: 1,
                        })
                    }
                    className="w-full rounded-xl bg-amber-600 text-white hover:bg-amber-500 hover:text-white disabled:opacity-50">
                    {addToCartMutation.isPending ? "Adding..." : "Add to cart"}
                </Button>
            </CardContent>
        </Card>
    )
}
