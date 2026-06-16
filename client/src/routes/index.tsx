import {createFileRoute} from "@tanstack/react-router"
import {ProductCard} from "@/components/product/product-card"
import {useProducts} from "@/hooks/products/useProducts"
import type {Product} from "@/types/product.type"
import {ProductCardSkeleton} from "@/components/product/product-loader"

export const Route = createFileRoute("/")({
    component: ProductsPage,
})

function ProductsPage() {
    const {data: response, isLoading} = useProducts()

    console.log(response)
    if (isLoading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({length: 6}).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        )
    }
    return (
        <div className="space-y-6">
            {/* Stats / Header Row */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Products</h2>
                    <p className="text-sm text-gray-400">
                        Browse through a list of products
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Product Cards */}
                {response && response.data.length === 0
                    ? "No products found"
                    : response &&
                      response.data.map((product: Product) => (
                          <ProductCard
                              key={product.productId}
                              product={product}
                          />
                      ))}
            </div>
        </div>
    )
}
