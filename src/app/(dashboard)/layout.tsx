"use client"
import React from "react"

import { cx } from "@/utils/utils"

import { Sidebar } from "@/components/ui/navigation/Sidebar"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }
    return (
        <div className="mx-auto max-w-screen-2xl ">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <main
                className={cx(
                    isCollapsed ? "lg:pl-[60px]" : "lg:pl-64",
                    "ease transform-gpu transition-all duration-100 will-change-transform lg:bg-gray-50 lg:py-3 lg:pr-3 lg:dark:bg-background",
                )}
            >
                <div className="min-h-[calc(100vh-24px)] p-4 sm:p-6 lg:rounded-lg lg:border lg:border-gray-200 dark:bg-gray-925 lg:dark:border-border-main bg-main">
                    {children}
                </div>
            </main>
        </div>
    )
}