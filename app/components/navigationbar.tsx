// components/NavigationBar.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/pages/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];
import { X } from "lucide-react";

export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-[var(--site-black)]">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-white">
                                <span className="text-[var(--site-pink)]">CarolDigital</span>Analyist</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="space-x-1">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.name}>
                                        <NavigationMenuLink
                                            href={item.href}
                                            className={cn(
                                                "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-white",
                                                "hover:bg-accent hover:text-accent-foreground",
                                                "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                                                "disabled:pointer-events-none disabled:opacity-50"
                                            )}
                                        >
                                            {item.name}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* CTA Button - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                            Login
                        </Button>
                        <Button size="sm" className="bg-[var(--site-pink)] hover:bg-[var(--site-light-pink)] hover:cursor-pointer rounded-sm font-bold">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <MenuIcon className="h-6 w-6 " />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[400px] bg-[var(--site-black)]/90 text-white flex flex-col [&>button]:hidden border-none"
                        >
                            {/* Close Button - Larger and positioned at top */}
                            <div className="flex justify-end p-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <X className="min-h-6 min-w-6 text-white" />
                                </Button>
                            </div>

                            {/* Centered Navigation Content */}
                            <div className="flex-1 flex flex-col items-center justify-start space-y-6">
                                {/* Mobile Logo - Centered */}
                                <Link
                                    href="/"
                                    className="flex flex-col items-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="text-2xl font-bold text-center mb-2">CarolDigitalAnalyst</span>
                                    {/* <div className="w-16 h-1 bg-[var(--site-pink)] rounded-full"></div> */}
                                </Link>

                                {/* Mobile Navigation Items - Centered */}
                                <div className="flex flex-col items-center space-y-6 w-full">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-xl font-medium transition-all duration-300 hover:text-[var(--site-pink)] hover:scale-110 py-2 w-full text-center"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile CTA Buttons - Centered */}
                                <div className="flex flex-col space-y-4 pt-6 w-full max-w-[200px]">
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent border-white text-white hover:bg-white hover:text-[var(--site-black)]"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        className="w-full bg-[var(--site-pink)] hover:bg-[var(--site-pink)]/90 text-white font-semibold"
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}

// Menu Icon Component
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