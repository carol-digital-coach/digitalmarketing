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



export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const current_path = usePathname()
    const router = useRouter()

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

                            <button className="hidden px-6 py-2 text-sm font-bold uppercase rounded-sm transition-all duration-300 shadow-lg cursor-pointer"
                                style={{ backgroundColor: colors.pop, color: 'white' }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = colors.soft}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = colors.pop}
                                // onClick={() => router.push("/pages/auth/signup")}
                            >
                                <Link href="/pages/auth/signup" passHref>
                                        Get Started
                                </Link>
                            </button>
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

                        <div className="flex flex-col space-y-4 pt-5 w-full max-w-[240px]">
                            <button
                                className="h-20 w-full py-3 text-sm font-bold uppercase rounded-full transition-all duration-300 border"
                                style={{ color: colors.soft, borderColor: colors.soft }}
                                onMouseOver={e => { e.currentTarget.style.borderColor = colors.pop; e.currentTarget.style.color = colors.pop; }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = colors.soft; e.currentTarget.style.color = colors.soft; }}
                            >
                                Login
                            </button>
                            <button
                                className="h-20 w-full py-3 text-sm font-bold uppercase rounded-full transition-all duration-300 shadow-lg"
                                style={{ backgroundColor: colors.pop, color: 'white' }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = colors.soft}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = colors.pop}
                            >
                                <Link href="/pages/auth/signup">
                                    Get Started
                                </Link>
                            </button>
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