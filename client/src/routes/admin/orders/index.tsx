import {createFileRoute, useNavigate} from "@tanstack/react-router"
import {Badge} from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useUpdateStatus} from "@/hooks/order/useUpdateStatus"
import {useSummary} from "@/hooks/order/useSummary"

export const Route = createFileRoute("/admin/orders/")({
    component: RouteComponent,
})

const statusMap: Record<number, {label: string; className: string}> = {
    0: {label: "Pending", className: "bg-yellow-600"},
    1: {label: "Paid", className: "bg-green-600"},
    2: {label: "Failed", className: "bg-red-600"},
}

function RouteComponent() {
    const navigate = useNavigate()
    const {data: orders} = useSummary()
    const {mutateAsync} = useUpdateStatus()

    async function handlePaymentStatusUpdate({
        orderNumber,
        paymentStatus,
    }: {
        orderNumber: number
        paymentStatus: number
    }) {
        await mutateAsync({orderNumber, paymentStatus})
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Orders</h1>
                <p className="text-sm text-gray-400">
                    Browse through a list of orders
                </p>
            </div>
            <div className="rounded-lg border border-gray-800">
                <table className="w-full text-sm">
                    <thead className="bg-gray-900 text-gray-300">
                        <tr>
                            <th className="p-3 text-left">Order #</th>
                            <th className="p-3 text-left">Items</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders && orders.data.length === 0 ? (
                            <p>No orders found</p>
                        ) : (
                            orders &&
                            orders.data.map((order) => (
                                <tr
                                    key={order.orderNumber}
                                    onClick={() => {
                                        navigate({
                                            to: `/admin/orders/${order.orderNumber}`,
                                        })
                                    }}
                                    className="border-t border-gray-800 hover:bg-gray-900/50">
                                    <td className="p-3">
                                        #{order.orderNumber}
                                    </td>

                                    <td className="p-3">{order.itemsCount}</td>

                                    <td className="p-3">
                                        Php {order.overallTotal}
                                    </td>

                                    <td className="p-3">
                                        <Badge
                                            className={
                                                statusMap[order.paymentStatus]
                                                    .className
                                            }>
                                            {
                                                statusMap[order.paymentStatus]
                                                    .label
                                            }
                                        </Badge>
                                    </td>

                                    <td className="p-3">
                                        <Select
                                            value={String(order.paymentStatus)}
                                            disabled={order.paymentStatus === 1}
                                            onValueChange={async (value) =>
                                                await handlePaymentStatusUpdate(
                                                    {
                                                        orderNumber:
                                                            order.orderNumber,
                                                        paymentStatus:
                                                            Number(value),
                                                    },
                                                )
                                            }>
                                            <SelectTrigger className="w-35 border-gray-700">
                                                <SelectValue placeholder="Update" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="0">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="1">
                                                    Paid
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Failed
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
