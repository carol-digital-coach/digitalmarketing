"use client"
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Zap, Target, TrendingUp, Cpu, Globe, Layers, Aperture, BarChart2, ArrowRight, Activity } from 'lucide-react';

// --- Data Structure (Unchanged) ---
const seoData = {
    "data": {
        "id": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69",
        "title": "SEO Consultation ( Local SEO, Onpage, Offpage, Technical, Eccorce SEO)",
        "short_description": "SEO audit (technical, on-page, local)"
    },
    "packages": [
        {
            "id": "24889396-e8e2-4869-abc0-5a3be63b40f3",
            "name": "SEO Starter",
            "description": "Basic audit, focusing on foundational site health.",
            "min_price": 20000.0,
            "max_price": 30000.0,
            "service": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69"
        },
        {
            "id": "96314243-7252-4c29-89aa-4bca43a0dd25",
            "name": "Standard SEO",
            "description": "Comprehensive strategy, including content and technical execution.",
            "min_price": 35000.0,
            "max_price": 60000.0,
            "service": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69"
        },
        {
            "id": "8b2d2d5f-e99e-4f3c-b2ba-63da9022cd03",
            "name": "Pro SEO / Ecomerce/ Full SEO",
            "description": "End-to-end management, designed for market leadership and high growth.",
            "min_price": 60000.0,
            "max_price": 120000.0,
            "service": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69"
        }
    ],
    "keypoints": [
        { "id": "5fe82914-ddd5-4b3d-b810-06f66ef4fab9", "title": "Technical & Local Audit" },
        { "id": "82e96496-54aa-4625-9034-47ed7c4beca6", "title": "Advanced Keyword Strategy" },
        { "id": "911dc97c-5d02-47f9-a91c-8a7719bd7a85", "title": "Authority Link Building" },
        { "id": "7fa3cb1f-f68c-4aca-8a22-7408aef8d8ad", "title": "Conversion Rate Optimization (CRO)" },
        { "id": "14665a67-3b8a-4853-bcc6-ddd99fb251b5", "title": "Predictive Performance Modeling" }
    ]
};

// --- Color Definitions (Dark Mode Palette) ---
const colors = {
    background: '#180A0A', // Deep Black Main Background
    cardBg: '#1E1E1E',     // Slightly lighter for cards
    primary: '#711A75',    // Deep Violet
    highlight: '#F10086',  // Bright Pink
    soft: '#F582A7',       // Soft Pink
    textMain: '#FFFFFF',
    textMuted: '#A3A3A3',
    border: '#333333'
};

// Helper to format currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// --- Animation Component: RevealOnScroll ---
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- HeroSection Removed ---

const KeyPointsSection = () => (
    // Increased top padding (pt-48) to make it suitable as the new page header
    <div className="pt-48 pb-32 px-4 relative" style={{ backgroundColor: colors.background }}>
        {/* Background Glows for the top of the page */}
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] animate-pulse" style={{ backgroundColor: colors.primary }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-5 blur-[120px]" style={{ backgroundColor: colors.highlight }}></div>

        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
                
                {/* Left Column: Sticky Title - Adjusted sticky top to accommodate header status */}
                <div className="lg:col-span-4 mb-16 lg:mb-0 lg:sticky lg:top-8">
                    <RevealOnScroll>
                        <div className="flex items-center mb-6">
                            <div className="h-[2px] w-12 mr-4" style={{ backgroundColor: colors.highlight }}></div>
                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.soft }}>
                                Methodology
                            </span>
                        </div>
                        <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: colors.textMain }}>
                            The Architecture of <span style={{ color: colors.primary }}>Scale</span>
                        </h2>
                        <p className="text-lg leading-relaxed" style={{ color: colors.textMuted }}>
                            We build comprehensive organic growth engines powered by five interconnected strategic pillars.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Right Column: Feature Cards */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {seoData.keypoints.map((point, index) => {
                        const Icon = [Cpu, Target, TrendingUp, Globe, Aperture][index % 5];
                        const descriptions = [
                            "Deep-dive technical audits to ensure your foundation is flawless for crawlers.",
                            "High-intent keyword mapping that targets users ready to convert, not just browse.",
                            "Strategic outreach to build domain authority through high-quality backlink profiles.",
                            "Optimizing user journeys to turn organic visitors into paying customers.",
                            "Data-driven forecasting to predict trends and adapt strategies proactively."
                        ];

                        return (
                            <RevealOnScroll key={point.id} delay={index * 100} className="h-full">
                                <div 
                                     className="group p-8 rounded-2xl h-full border transition-all duration-500 hover:-translate-y-2"
                                     style={{ 
                                         backgroundColor: '#131313', // Very subtle contrast from main bg
                                         borderColor: colors.border,
                                         boxShadow: `0 0 0 0 transparent`
                                     }}
                                >
                                    {/* Icon Container with Glow */}
                                    <div className="mb-6 inline-flex p-4 rounded-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                        <div className="absolute inset-0 opacity-20" style={{ backgroundColor: index % 2 === 0 ? colors.highlight : colors.primary }}></div>
                                        <Icon size={28} style={{ color: index % 2 === 0 ? colors.highlight : colors.soft }} className="relative z-10" />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors" style={{ color: colors.textMain }}>
                                        {point.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                                        {descriptions[index]}
                                    </p>
                                    
                                    {/* Hover Border Glow Effect */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

const PricingTableSection = () => (
    <div className="py-32 px-4 relative overflow-hidden" style={{ backgroundColor: colors.background }}>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2a0e2a] to-transparent opacity-30 pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
            <RevealOnScroll>
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Investment Plans
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
                        Transparent pricing for serious growth partners.
                    </p>
                </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center">
                {seoData.packages.map((pkg, index) => {
                    const isFeatured = pkg.name.toLowerCase().includes('pro') || pkg.name.toLowerCase().includes('full');
                    const minPrice = formatPrice(pkg.min_price);
                    const maxPrice = formatPrice(pkg.max_price);

                    return (
                        <RevealOnScroll key={pkg.id} delay={index * 150} className={`h-full ${isFeatured ? '-mt-4 md:-mt-8 mb-4 md:mb-8' : ''}`}>
                            <div
                                className={`p-8 rounded-3xl flex flex-col relative transition-all duration-500 h-full border group hover:border-pink-500/50`}
                                style={{ 
                                    backgroundColor: isFeatured ? '#1A0B1A' : '#111111', 
                                    borderColor: isFeatured ? colors.highlight : colors.border,
                                    boxShadow: isFeatured ? `0 0 50px -10px ${colors.highlight}40` : 'none',
                                    transform: isFeatured ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                {isFeatured && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2 text-white">
                                        {pkg.name.split('/')[0].trim()}
                                    </h3>
                                    <div className="h-1 w-10 rounded-full mt-4 group-hover:w-20 transition-all duration-500" style={{ backgroundColor: isFeatured ? colors.highlight : colors.primary }}></div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-black text-white">{minPrice}</span>
                                    </div>
                                    <span className="text-sm font-medium" style={{ color: colors.textMuted }}>
                                        {maxPrice && maxPrice !== minPrice ? ` - ${maxPrice}` : ''} / month
                                    </span>
                                </div>
                                
                                <p className="text-sm mb-8 pb-8 border-b border-gray-800" style={{ color: colors.textMuted }}>
                                    {pkg.description}
                                </p>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {seoData.keypoints.slice(0, index + 3).map((point, i) => ( 
                                        <li key={i} className="flex items-start">
                                            <CheckCircle size={18} className="mr-3 mt-1 flex-shrink-0" style={{ color: isFeatured ? colors.highlight : colors.soft }} />
                                            <span className="text-sm text-gray-300">{point.title}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-4 text-sm font-bold uppercase rounded-xl transition-all duration-300 flex items-center justify-center`}
                                    style={{ 
                                        backgroundColor: isFeatured ? colors.highlight : 'transparent', 
                                        color: colors.textMain,
                                        border: isFeatured ? 'none' : `1px solid ${colors.border}`,
                                    }}
                                >
                                    Select Plan
                                </button>
                            </div>
                        </RevealOnScroll>
                    );
                })}
            </div>
        </div>
    </div>
);

const App = () => {
    return (
        <div className="min-h-screen font-[Inter] antialiased selection:bg-pink-500 selection:text-white" style={{ backgroundColor: colors.background }}>
            {/* HeroSection removed. Starting directly with KeyPointsSection. */}
            <KeyPointsSection />
            <PricingTableSection />

            {/* Final CTA Block */}
            <div className="py-24 px-4 text-center border-t border-gray-900" style={{ backgroundColor: colors.background }}>
                <RevealOnScroll>
                    <Activity size={48} className="mx-auto mb-6" style={{ color: colors.highlight }} />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to scale your organic revenue?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Stop guessing. Start growing.
                    </p>
                    <button
                        className="px-10 py-4 text-lg font-bold uppercase rounded-full transition duration-300 hover:shadow-[0_0_30px_rgba(241,0,134,0.5)] hover:-translate-y-1"
                        style={{ backgroundColor: 'white', color: colors.background }}
                    >
                        Schedule Strategy Call
                    </button>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default App;