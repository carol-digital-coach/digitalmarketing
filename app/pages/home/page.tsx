"use client"
import AboutPage from "../about/page"
import ServicesPage from "../services/page";

import StatCard from "@/app/components/statscard"
import { Zap, ArrowRight } from "lucide-react";
import { CustomCursor } from "@/app/components/customcursor";
import { ScrollFadeIn } from "@/app/components/scrollanimation";
import { colors } from "@/lib/colors";

export default function HomePage (){
    return (
        <div className="min-h-screen bg-[var(--site-pink)] font-[var(--font-itim-regular)]">
            <div className="bg-[var(--site-pink)]/50">
                <div className="flex flex-col lg:flex-row items-start justify-center min-h-[90vh] lg:min-h-[80vh] px-4 py-8 lg:py-0 lg:mt-10 gap-8 lg:gap-16">
                    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: colors.pop, color: 'white' }}>

                        {/* Subtle Background Grid Animation */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(${colors.deep} 1px, transparent 1px), linear-gradient(to right, ${colors.deep} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                                {/* Pulsing Dot representing data entry point */}
                                <div className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full animate-ping-slow" style={{ backgroundColor: colors.pop }}></div>
                                <div className="absolute bottom-[30%] right-[20%] w-3 h-3 rounded-full animate-ping-slow-delay" style={{ backgroundColor: colors.pop }}></div>
                            </div>
                        </div>
                        <style>{`
        @keyframes ping-slow {
            0% { transform: scale(0.1); opacity: 0.5; }
            100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 5s infinite; }
        .animate-ping-slow-delay { animation: ping-slow 5s infinite 2.5s; }
      `}</style>

                        <div className="flex lg:flex-row container mx-auto px-6 relative z-10 flex flex-col items-center text-center pt-20 overflow-hidden p-4">
                            <div
                            className="overflow-hidden"
                            >
                                <ScrollFadeIn delay={100}>
                                    <img src="../carolpic.png" alt="" className="hidden lg:block h-[600px]"/>
                                    <img src="../carolpic2.png" alt="" className="lg:hidden sm:block rounded-[50%]"/>
                                </ScrollFadeIn>
                            </div>
                            <div
                            className="overflow-hidden"
                            >
                                <ScrollFadeIn delay={0}>
                                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-4xl leading-tight overflow-hidden">
                                        Your Online Digital <span style={{ color: colors.base }}>Coach</span>
                                    </h1>
                                </ScrollFadeIn>
                                <ScrollFadeIn delay={200}>
                                    <p
                                        className="mt-8 text-xl md:text-2xl max-w-3xl font-light tracking-wide"
                                    
                                    >
                                        Empowering entrepreneurs and businesses to thrive in the digital world through strategic coaching, proven systems, and authentic growth.
                                    </p>
                                </ScrollFadeIn>

                                <ScrollFadeIn delay={400} className="mt-12">
                                    <button 
                                    className="px-8 py-3 text-lg font-bold uppercase rounded-md hover:cursor-pointer bg-[var(--site-black)] border-3 border-[var(--site-black)] hover:bg-transparent hover:text-[var(--site-black)]"
                                    >
                                        View Services <ArrowRight size={20} className="inline ml-2 text-siteBlack" />
                                    </button>
                                </ScrollFadeIn>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <AboutPage />
            <ServicesPage />
        </div>
    )
}