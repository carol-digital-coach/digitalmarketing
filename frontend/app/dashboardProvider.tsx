"use client"
import { FC, ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppSidebar } from "./components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"


export const DashboardProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter()
    const EXCLUDED_PATHNAMES = ["/pages/auth/signin", "/pages/auth/signup", "/pages", "/home"]
    const should_display = !EXCLUDED_PATHNAMES.some(path => pathname.startsWith(path))

    if (should_display) {
        return (
            <div className={`${!should_display} ? "hidden" : " "`}>
                <AppSidebar>{children}</AppSidebar>
                <Toaster />
            </div>
        )   
    }

    return <>
    {children}
    </>
}