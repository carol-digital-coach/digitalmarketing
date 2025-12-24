"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    Send,
    CircleDollarSign,
    FolderTree
} from "lucide-react"

import { NavMain } from "@/app/components/nav-main"
import { NavProjects } from "@/app/components/nav-projects"
import { NavUser } from "@/app/components/nav-user"
import { TeamSwitcher } from "@/app/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "@/components/ui/sidebar"
import { FC, ReactNode } from "react"


const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Carol Digital",
            logo: GalleryVerticalEnd,
            plan: "Admin dashboard",
        },
    ],
    navMain: [
        {
            title: "Website Modules",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "/admin/dashboard",
                },
                {
                    title: "Services",
                    url: "/admin/pages/services",
                },
                {
                    title: "Courses",
                    url: "#",
                },
                {
                    title: "Blogs",
                    url: "#",
                },
                {
                    title: "Articles",
                    url: "#",
                },

            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Comming soon",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "About this platform",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Theme",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Payment",
            url: "#",
            icon: CircleDollarSign,
        },
        {
            name: "Messages",
            url: "#",
            icon: Send,
        },
    ],
}

export const AppSidebar: FC<{ children: ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpened] = React.useState<boolean>(true)

    return (
        <div className="relative">
            <SidebarProvider>
                <Sidebar collapsible="icon" className="bg-blue-300">
                    <SidebarHeader className="bg-[var(--site-pink)] text-white font-bold">
                        <TeamSwitcher teams={data.teams} />
                    </SidebarHeader>
                    <SidebarContent className="bg-[var(--site-pink)] text-white font-bold">
                        <NavMain items={data.navMain} />
                        <NavProjects projects={data.projects} />
                    </SidebarContent>
                    <SidebarFooter className="bg-[var(--site-purple)] text-white font-bold">
                        <NavUser user={data.user} />
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>
                <SidebarTrigger
                    className={`
                        absolute top-0 z-10 transition-all duration-300 ease-in-out
                    ${isOpen
                            ? 'left-4 lg:left-[16rem]'
                            : 'left-4 lg:left-12'
                        }
    `}
                    onClick={
                        () => setIsOpened(!isOpen)
                    }
                >
                </SidebarTrigger>
                <SidebarInset>
                    <div>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
