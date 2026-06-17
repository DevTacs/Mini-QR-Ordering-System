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
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold">Orders</h1>
                <p className="text-xs sm:text-sm text-gray-400">
                    Browse through a list of orders
                </p>
            </div>

            {/* TABLE WRAPPER */}
            <div className="rounded-lg border border-gray-800 overflow-x-auto">
                <table className="w-full min-w-175 text-sm">
                    <thead className="bg-gray-900 text-gray-300">
                        <tr>
                            <th className="p-3 text-left">Order #</th>
                            <th className="p-3 text-left hidden sm:table-cell">
                                Items
                            </th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!orders?.data?.length ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-4 text-center text-gray-400">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.data.map((order) => (
                                <tr
                                    key={order.orderNumber}
                                    onClick={() =>
                                        navigate({
                                            to: `/admin/orders/${order.orderNumber}`,
                                        })
                                    }
                                    className="border-t border-gray-800 hover:bg-gray-900/50 cursor-pointer">
                                    {/* Order # */}
                                    <td className="p-3 font-medium">
                                        #{order.orderNumber}
                                    </td>

                                    {/* Items (hidden on mobile) */}
                                    <td className="p-3 hidden sm:table-cell">
                                        {order.itemsCount}
                                    </td>

                                    {/* Total */}
                                    <td className="p-3 whitespace-nowrap">
                                        Php {order.overallTotal}
                                    </td>

                                    {/* Status */}
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

                                    {/* Update */}
                                    <td
                                        className="p-3"
                                        onClick={(e) => e.stopPropagation()}>
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
                                            <SelectTrigger className="w-[120px] border-gray-700 text-xs">
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
