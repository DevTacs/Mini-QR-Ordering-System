import {createFileRoute} from "@tanstack/react-router"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import type {OrderDetails} from "@/types/order.type"
import {useDetails} from "@/hooks/order/useDetails"

export const Route = createFileRoute("/admin/orders/$orderNumber")({
    component: RouteComponent,
})

const statusMap: Record<number, {label: string; className: string}> = {
    0: {label: "Pending", className: "bg-yellow-600 text-white"},
    1: {label: "Paid", className: "bg-green-600 text-white"},
    2: {label: "Failed", className: "bg-red-600 text-white"},
}

function RouteComponent() {
    const {orderNumber} = Route.useParams()
    const {data: orderDetails} = useDetails({
        orderNumber: Number(orderNumber),
    })

    if (!orderDetails) {
        return (
            <div className="text-center text-gray-400 py-10">
                Loading or Not found...
            </div>
        )
    }

    const total = orderDetails.data.reduce(
        (sum, item) => sum + Number(item.totalPrice),
        0,
    )

    const status = orderDetails.data[0]?.paymentStatus
    const createdAt = orderDetails.data[0]?.createdAt

    const getStatus = (status?: number) => {
        const s = statusMap[status ?? -1]

        return (
            <Badge className={s?.className ?? "bg-gray-700 text-gray-200"}>
                {s?.label ?? "Unknown"}
            </Badge>
        )
    }

    return (
        <div className="space-y-5 sm:space-y-6 text-gray-200">
            {/* HEADER */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-lg sm:text-2xl font-semibold text-white">
                    Order #{orderNumber}
                </h1>
                {getStatus(status!)}
            </div>

            <p className="text-xs sm:text-sm text-gray-400">
                {createdAt && new Date(createdAt).toLocaleString()}
            </p>

            {/* ITEMS */}
            <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white text-base sm:text-lg">
                        Items
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {orderDetails.data.map((item: OrderDetails) => (
                        <div
                            key={item.orderId}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 border-b border-gray-800 pb-4 last:border-b-0">
                            {/* IMAGE */}
                            <img
                                src={item.imageUrl}
                                className="h-20 w-full sm:h-16 sm:w-16 rounded-md object-cover"
                            />

                            {/* DETAILS */}
                            <div className="flex-1">
                                <h3 className="text-sm sm:text-base font-medium text-white">
                                    {item.name}
                                </h3>

                                <p className="text-xs text-gray-400 line-clamp-2 sm:line-clamp-1">
                                    {item.description}
                                </p>

                                <div className="text-xs text-gray-500 mt-1">
                                    Qty: {item.quantity} • ₱{item.price}
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="text-sm sm:text-base font-semibold text-white sm:text-right">
                                ₱{Number(item.totalPrice).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* SUMMARY */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-gray-800 pt-4 text-base sm:text-lg font-semibold text-white">
                <span>Total</span>
                <span>Php {total.toFixed(2)}</span>
            </div>
        </div>
    )
}
