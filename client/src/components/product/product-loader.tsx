import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden border-gray-800 bg-gray-900">
            {/* Image */}
            <Skeleton className="h-44 w-full rounded-none bg-gray-800" />

            <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-3/4 bg-gray-800" />
                <Skeleton className="h-4 w-full bg-gray-800" />
                <Skeleton className="h-4 w-2/3 bg-gray-800" />
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24 rounded-full bg-gray-800" />
                    <Skeleton className="h-6 w-20 bg-gray-800" />
                </div>

                <Skeleton className="h-10 w-full rounded-xl bg-gray-800" />
            </CardContent>
        </Card>
    )
}
