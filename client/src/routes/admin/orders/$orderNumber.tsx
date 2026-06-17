import {createFileRoute} from "@tanstack/react-router"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {useQuery} from "@tanstack/react-query"
import {getOrderDetailsByOrderNumberService} from "@/services/order.service"
import type {OrderDetails} from "@/types/order.type"

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
    const {data: orderDetails} = useQuery({
        queryKey: ["orderDetails", orderNumber],
        queryFn: () => getOrderDetailsByOrderNumberService(Number(orderNumber)),
    })

    if (!orderDetails) return null

    console.log(orderDetails)

    const total = orderDetails.data.reduce(
        (sum, item) => sum + Number(item.totalPrice),
        0,
    )

    const status = orderDetails.data[0].paymentStatus
    const createdAt = orderDetails.data[0].createdAt

    const getStatus = (status?: number) => {
        const s = statusMap[status ?? -1]

        return (
            <Badge className={s?.className ?? "bg-gray-700 text-gray-200"}>
                {s?.label ?? "Unknown"}
            </Badge>
        )
    }

    return (
        <div className="space-y-6 text-gray-200">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">
                    Order #{orderNumber}
                </h1>
                {getStatus(status!)}
            </div>

            <p className="text-sm text-gray-400">
                {new Date(createdAt!).toLocaleString()}
            </p>

            {/* ITEMS */}
            <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">Items</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {orderDetails &&
                        orderDetails.data.map((item: OrderDetails) => (
                            <div
                                key={item.orderId}
                                className="flex gap-4 border-b border-gray-800 pb-3 last:border-b-0">
                                <img
                                    src={item.imageUrl}
                                    className="h-16 w-16 rounded-md object-cover"
                                />

                                <div className="flex-1">
                                    <h3 className="font-medium text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 line-clamp-1">
                                        {item.description}
                                    </p>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Qty: {item.quantity} • ₱{item.price}
                                    </div>
                                </div>

                                <div className="font-semibold text-white">
                                    ₱{Number(item.totalPrice).toFixed(2)}
                                </div>
                            </div>
                        ))}
                </CardContent>
            </Card>

            {/* SUMMARY */}
            <div className="flex justify-between border-t border-gray-800 pt-4 text-lg font-semibold text-white">
                <span>Total</span>
                <span>Php {total.toFixed(2)}</span>
            </div>
        </div>
    )
}
