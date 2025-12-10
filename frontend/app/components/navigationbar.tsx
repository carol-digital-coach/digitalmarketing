"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "lucide-react";
import { colors } from "@/lib/colors";

const navigationItems = [
    { name: "Home", href: "/home" },
    { name: "Services", href: "/pages/services" },
    { name: "Courses", href: "/pages/courses" },
    { name: "About", href: "/pages/about" },
    { name: "Blog", href: "/pages/blog" },
    { name: "Contact", href: "/pages/contact" },
];
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUserAuth } from "@/lib/userDataContext";
import {
    DropdownMenuContent,
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";



export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const current_path = usePathname()
    const router = useRouter()
    const { state, dispatch } = useUserAuth()

    return (
        <nav
            className={current_path.startsWith("/admin") ? "hidden" : "fixed sm:py-4 top-0 z-50 w-full px-6 py-2  md:py-6 lg:h-25 h-18 overflow-y-hidden"}
            style={{ backgroundColor: colors.base }}
        >
            <div className="container mx-auto">
                <div className="flex h-12 md:h-16 items-center justify-between">
                    <a href="#" className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                                <span style={{ color: colors.pop }}>Carol </span>The Digital Coach
                            </span>
                        </div>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">

                        <div className="flex space-x-6">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={current_path == item.href ?
                                        "text-sm font-medium uppercase  tracking-widest text-[var(--site-pink)] relative group transition-colors p-2 overflow-y-hidden hover:text-[var(--site-pink)]"
                                        :
                                        "text-sm font-medium uppercase  tracking-widest text-white relative group transition-colors p-2 overflow-y-hidden hover:text-[var(--site-pink)]"}
                                >
                                    {item.name}
                                    <div className={current_path == item.href ? "w-full text-white h-0.5 bg-[var(--site-pink)] rounded-md" : "none"}>

                                    </div>
                                    <span
                                        className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                                        style={{ backgroundColor: colors.pop }}
                                    ></span>
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">

                            {!state.user ?
                                <Link href="/pages/auth/signin" passHref>
                                    <button className="px-6 py-2 text-sm font-bold uppercase rounded-sm transition-all duration-300 shadow-lg cursor-pointer"
                                        style={{ backgroundColor: colors.pop, color: 'white' }}
                                        onMouseOver={e => e.currentTarget.style.backgroundColor = colors.soft}
                                        onMouseOut={e => e.currentTarget.style.backgroundColor = colors.pop}
                                    // onClick={() => router.push("/pages/auth/signup")}
                                    >
                                        Login
                                    </button>
                                </Link>
                                :
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <div
                                            className="
                                                group
                                                flex items-center 
                                                p-1
                                                rounded-full 
                                                cursor-pointer
                                                bg-[var(--site-pink)]   
                                                text-white       
                                                shadow-md        
                                                transition-all   
                                                duration-500     
                                                hover:bg-pink-600 
                                                hover:pr-5 /* Adds padding back when name expands */
                                                hover:shadow-lg
                                                ring-offset-background
                                                focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
      "
                                        >
                                            {/* Avatar remains static */}
                                            <img
                                                className="rounded-full w-9 h-9 object-cover border-2 border-white/50 shrink-0"
                                                src={state ? state.user?.user?.avatar : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                                                alt="User Avatar"
                                            />

                                            {/* Username: Collapsed by default, expands on parent hover */}
                                            <div className="
                                                grid grid-cols-[0fr] 
                                                group-hover:grid-cols-[1fr] 
                                                transition-all 
                                                duration-500 
                                                ease-in-out
                                            ">
                                                <p className="
                                                    overflow-hidden 
                                                    whitespace-nowrap 
                                                    text-sm 
                                                    font-semibold 
                                                    opacity-0 
                                                    group-hover:opacity-100 
                                                    group-hover:ml-3
                                                    transition-all 
                                                    duration-500
                                                ">
                                                    {state ? state.user?.user?.username : "Account"}
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-48 mt-2 p-1 border-slate-200">
                                        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        {/* <DropdownMenuItem className="cursor-pointer py-2 px-3 focus:bg-slate-100 rounded-md">
                                            View Account
                                        </DropdownMenuItem> */}

                                        {state.user?.user?.super_user && <DropdownMenuItem className="cursor-pointer py-2 px-3 focus:bg-slate-100 rounded-md">
                                            <Link
                                                href="/admin/dashboard"
                                                target="_blank"
                                            >
                                                <button

                                                >
                                                    Admin Dashboard
                                                </button>
                                            </Link>
                                        </DropdownMenuItem>}

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem className="cursor-pointer py-2 px-3 focus:bg-red-50 text-red-600 font-medium rounded-md">
                                            <button
                                                onClick={() => dispatch({ type: "LOGOUT" })}
                                            >
                                                Logout
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }
                        </div>

                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden z-50 focus:outline-none p-2 border rounded-full"
                        style={{ borderColor: colors.deep }}
                    >
                        <Menu size={24} className="text-white" />
                    </button>
                    <div
                        className={cn(
                            "fixed inset-0 flex  flex-col justify-start items-center transition-transform duration-500 ease-in-out z-[99] p-6 pt-12",
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        )}
                        style={{ backgroundColor: colors.base }}
                    >
                        <div className="flex justify-end w-full mb-2 p-4 overflow-hidden">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center h-screen space-y-6 w-full h-screen overflow-hidden p-2 mt-4">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-black text-white uppercase transition-colors overflow-hidden"
                                    // Use inline styles for the unique text-stroke effect
                                    style={{ WebkitTextStroke: `1px ${colors.soft}`, color: 'transparent' }}
                                    onMouseOver={e => e.currentTarget.style.color = colors.soft}
                                    onMouseOut={e => e.currentTarget.style.color = 'transparent'}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        <div className="flex flex-col space-y-4 pt-5 w-full max-w-[240px] h-[300px]">
                            <Link
                                href={{ pathname : `/pages/auth/signin` }}
                            >
                                <button
                                    className="h-15 w-full py-3 text-sm font-bold uppercase rounded-full transition-all duration-300 border"
                                    style={{ color: colors.soft, borderColor: colors.soft }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = colors.pop; e.currentTarget.style.color = colors.pop; }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = colors.soft; e.currentTarget.style.color = colors.soft; }}
                                    onClick={() => setIsOpen(false)}                 
                                >
                                    Login
                                </button>
                            </Link>
                            <Link
                                href={{ pathname : `/pages/auth/signup` }}
                            >
                                <button
                                    className="h-15 w-full py-3 text-sm font-bold uppercase rounded-full transition-all duration-300 shadow-lg"
                                    style={{ backgroundColor: colors.pop, color: 'white' }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = colors.soft}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = colors.pop}
                                    onClick={() => setIsOpen(false)}    
                                >
                                    <Link href="/pages/auth/signup">
                                        Get Started
                                    </Link>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white min-w-8 min-h-8"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}