import * as React from "react"
import {Outlet, createRootRoute} from "@tanstack/react-router"
import {Button} from "@/components/ui/button"

export const Route = createRootRoute({
    component: RootLayout,
})

function RootLayout() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Top Bar */}
            <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-semibold tracking-tight">
                        Product Dashboard
                    </h1>

                    <Button className="rounded-xl">+ Add Product</Button>
                </div>
            </header>

            {/* Page Content */}
            <main className="mx-auto max-w-6xl p-6">
                <Outlet />
            </main>
        </div>
    )
}
