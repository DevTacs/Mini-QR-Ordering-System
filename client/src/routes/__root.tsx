import {
    Link,
    Outlet,
    createRootRoute,
    useLocation,
    useNavigate,
} from "@tanstack/react-router"
import {Button} from "@/components/ui/button"
import {QrCode, ShoppingCart} from "lucide-react"
import {useCart} from "@/hooks/cart/useCart"
import {exportQR} from "@/utils/qr-code"

export const Route = createRootRoute({
    component: RootLayout,
})

function RootLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const {data: cart} = useCart()

    const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                    {/* Logo */}
                    <h1 className="text-sm sm:text-xl font-semibold tracking-tight">
                        Mini<span className="text-amber-600">QROrdering</span>
                        System
                    </h1>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        {/* Cart page link */}
                        {location.pathname === "/cart" && (
                            <Link
                                to="/"
                                className="text-xs sm:text-sm text-gray-300 hover:text-white">
                                Products
                            </Link>
                        )}

                        {/* Admin section */}
                        {location.pathname.startsWith("/admin/orders") && (
                            <>
                                <Link
                                    to="/admin/orders"
                                    className="text-xs sm:text-sm text-gray-300 hover:text-white">
                                    Orders
                                </Link>

                                <button
                                    onClick={exportQR}
                                    className="flex items-center gap-1 text-xs sm:text-sm text-gray-300 hover:text-white">
                                    Export QR
                                    <QrCode className="h-4 w-4 text-amber-600" />
                                </button>
                            </>
                        )}

                        {/* Cart button */}
                        {!location.pathname.startsWith("/admin/orders") && (
                            <Button
                                className="relative flex items-center gap-2 rounded-xl bg-amber-600 px-3 py-2 sm:px-4"
                                onClick={() => navigate({to: "/cart"})}>
                                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />

                                <span className="text-xs sm:text-sm">
                                    My Cart
                                </span>

                                {cartCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-500 text-[10px] sm:text-xs font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-6xl px-4 py-4 sm:p-6">
                <Outlet />
            </main>
        </div>
    )
}
