"use client"

import { Instagram,Linkedin, Twitter } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export const Footer = () => {
    const pathname:string = usePathname()
  return (
    <footer className={pathname.startsWith("/admin") ? "hidden" : `${pathname.startsWith("/pages/about") || pathname.startsWith("/pages/courses") ? "bg-[var(--site-black)]" : "bg-[var(--site-purple)] text-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white bg-clip-text text-transparent">
              Carol
            </h3>
            <p className="text-sm text-gray-300">
              Your Online Digital Coach
            </p>
            <p className="text-xs text-white leading-relaxed">
              Empowering entrepreneurs and businesses to thrive in the digital world through strategic coaching, proven systems, and authentic growth
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-[#F10086] transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#F10086] transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#F10086] transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#F10086] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#711A75] hover:bg-[#F10086] transition-colors flex items-center justify-center bg-[var(--site-pink)]">
                <span className="text-xs"><Instagram size={23}/></span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#711A75] hover:bg-[#F10086] transition-colors flex items-center justify-center bg-[var(--site-pink)]">
                <span className="text-xs"><Linkedin size={23}/></span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#711A75] hover:bg-[#F10086] transition-colors flex items-center justify-center bg-[var(--site-pink)]">
                <span className="text-xs"><Twitter size={23}/></span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#711A75]">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white">
            <p>&copy; 2025 Carol - The Digital Coach. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#F582A7] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#F582A7] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}