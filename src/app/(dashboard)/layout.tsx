"use client"
import React from "react"

import { cx } from "@/utils/utils"

import { Sidebar } from "@/components/ui/navigation/Sidebar"
import ThemeDropdown from "@/components/layout/ThemeDropdown"

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
        <div className="mx-auto max-w-screen-xl h-full">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <main
                className={cx(
                    isCollapsed ? "lg:pl-[60px]" : "lg:pl-64",
                    "ease transform-gpu transition-all duration-100 will-change-transform lg:bg-gray-50 lg:py-3 lg:pr-3 lg:dark:bg-background",
                    "h-full"  // Esto asegura que el main ocupe el 100% de la altura disponible
                )}
            >
                <div className="min-h-[calc(100vh-24px)] p-3 pb-3 lg:rounded-lg lg:border lg:border-primary-br dark:bg-gray-925 lg:dark:border-border-main bg-background-subtle">
                    <header className="flex items-center justify-between mb-3">
                        <h2 className="text-xl dark:text-gray-400" >Dashbaord</h2>
                        <ThemeDropdown />
                    </header>
                    <section className="overflow-y-auto ">
                        {children}
                    </section>
                </div>
            </main>
        </div>
    )
}