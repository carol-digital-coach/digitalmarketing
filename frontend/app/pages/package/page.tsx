"use client"
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Zap, Target, TrendingUp, Cpu, Globe, Layers, Aperture, BarChart2, ArrowRight, Activity } from 'lucide-react';
import { ScrollFadeIn } from '@/app/components/scrollanimation';
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const seoData = {
    "data": {
        "id": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69",
        "title": "SEO Consultation ( Local SEO, Onpage, Offpage, Technical, Eccorce SEO)",
        "short_description": "SEO audit (technical, on-page, local)"
    },
    "packages": [
        {
            "id": "24889396-e8e2-4869-abc0-5a3be63b40f3",
            "name": "Strategy Snapshot",
            "description": "Basic audit, focusing on foundational site health.",
            "min_price": 15000.0,
            "max_price": 25000.0,
            "service": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69"
        },
        {
            "id": "96314243-7252-4c29-89aa-4bca43a0dd25",
            "name": "Growth Blueprint",
            "description": "Comprehensive strategy, including content and technical execution.",
            "min_price": 30000.0,
            "max_price": 45000.0,
            "service": "55ccf921-9d92-4cf8-af1e-9fa70dfacd69"
        },
        {
            "id": "8b2d2d5f-e99e-4f3c-b2ba-63da9022cd03",
            "name": "Pro SEO / Ecomerce/ Full SEO / Comprehensive / Premium",
            "description": "End-to-end management, designed for market leadership and high growth.",
            "min_price": 10000.0,
            "max_price": 15000.0,
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

const colors = {
    background: '#180A0A',
    cardBg: '#1E1E1E',
    primary: '#711A75',
    highlight: '#F10086',
    soft: '#F582A7',
    textMain: '#FFFFFF',
    textMuted: '#A3A3A3',
    border: '#333333'
};

const formatPrice = (price: any) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KSH',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

interface PricingDetail {
    package_id: string;
    package_name: string;
    package_list: Array<{
        id: string;
        title: string;
        package: string;
    }>;
}

function PackageComponent() {
    const pathname = usePathname()


    const search_params = useSearchParams()
    console.log(search_params.get("requested_package"))
    const { data, isLoading, error } = useQuery({
        queryKey: ['service'],
        queryFn: async () => {
            const data = axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}services/service/?id=${search_params.get("requested_package")}`)
            return data
        }
    })



    return (
    <div className="min-h-screen font-[Inter] antialiased selection:bg-pink-500 selection:text-white" style={{ backgroundColor: colors.background }}>
        {/* Loading Skeleton Overlay - Shows when data is loading */}
        {!data && (
            <div className="reltive lg:top-15 sm:-top-20 inset-0 bg-background z-50 flex items-center justify-center w-screen">
                <div className="w-full  mx-auto">
                    {/* Top Section Skeleton */}
                    <div className="pt-48 pb-32 px-4 relative bg-white">
                        <div className="container mx-auto max-w-7xl relative z-10 overflow-hidden">
                            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
                                <div className="lg:col-span-4 mb-16 lg:mb-0 lg:sticky lg:top-4 top-0 p-2 overflow-hidden">
                                    <div className="flex items-center mb-6">
                                        <Skeleton className="text-4xl font-bold uppercase bg-[var(--site-black)]/50 h-12 w-64" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-6 leading-tight text-black">
                                        <Skeleton className="h-8 w-80 bg-[var(--site-black)]/50" />
                                    </h2>
                                    <Skeleton className="text-xl leading-relaxed text-black h-32 w-full bg-[var(--site-black)]/50" />
                                </div>

                                {/* Right Column: Feature Cards Skeleton */}
                                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden p-2">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="h-full overflow-hidden p-4">
                                            <div className="group p-8 rounded-2xl h-full border transition-all duration-500 bg-[var(--site-purple)]">
                                                <div className="mb-6 inline-flex p-4 rounded-xl relative overflow-hidden">
                                                    <Skeleton className="w-8 h-8" style={{ color: colors.highlight }} />
                                                </div>
                                                <Skeleton className="text-2xl font-bold mb-3 h-8 w-48" style={{ color: colors.textMain }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section Skeleton */}
                    <div className="py-22 px-4 relative overflow-hidden bg-[var(--site-purple)]">
                        <div className="container mx-auto max-w-7xl relative z-10">
                            <div className="text-center mb-24 p-4">
                                <Skeleton className="text-4xl md:text-5xl font-bold mb-6 text-white overflow-hidden h-12 w-64 mx-auto" />
                                <Skeleton className="text-xl max-w-2xl mx-auto text-white h-6 w-96 mx-auto" />
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center p-2 overflow-hidden">
                                {[...Array(3)].map((_, index) => {
                                    const isFeatured = index === 1; // Middle card is featured
                                    return (
                                        <div key={index} className={`h-full ${isFeatured ? 'p-6 lg:mt-5 mt-4 md:-mt-8 mb-4 md:mb-8' : 'p-6 lg:mt-5 mt-4 md:-mt-8 mb-4 md:mb-8'}`}>
                                            <div className={`relative p-8 rounded-3xl border-none flex flex-col overflow-hidden relative transition-all duration-500 h-full border group bg-[var(--site-black)]`}>
                                                {isFeatured && (
                                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                                        Most Popular
                                                    </div>
                                                )}

                                                <div className="mb-8">
                                                    <Skeleton className="text-2xl font-bold mb-2 text-white h-8 w-32" />
                                                    <Skeleton className="h-1 w-10 rounded-full mt-4" style={{ backgroundColor: isFeatured ? colors.highlight : colors.primary }} />
                                                </div>

                                                <div className="mb-8">
                                                    <div className="flex items-baseline">
                                                        <Skeleton className="text-4xl font-black text-white h-12 w-40" />
                                                    </div>
                                                    <Skeleton className="text-md font-medium text-white line h-5 w-48" />
                                                </div>

                                                <Skeleton className="text-lg mb-8 pb-8 border-b border-gray-800 text-white h-6 w-full" />

                                                <ul className="space-y-4 mb-6">
                                                    {[...Array(4)].map((_, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start">
                                                            <Skeleton
                                                                className="mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full"
                                                                style={{ backgroundColor: isFeatured ? colors.highlight : colors.soft }}
                                                            />
                                                            <Skeleton className="text-lg text-white h-5 w-3/4" />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Skeleton
                                                    className={`absolute bottom-4 right-8 w-[80%] py-4 text-md font-bold uppercase rounded-xl transition-all duration-300 flex items-center justify-center text-white bg-[var(--site-pink)]`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Final CTA Block Skeleton */}
                    <div className="py-24 px-4 text-center border-t border-gray-900" style={{ backgroundColor: colors.background }}>
                        <Skeleton className="mx-auto mb-6 w-12 h-12 rounded-full" style={{ color: colors.highlight }} />
                        <Skeleton className="text-3xl font-bold text-white mb-4 h-10 w-96 mx-auto" />
                        <Skeleton className="text-gray-400 mb-8 h-6 w-64 mx-auto" />
                        <Skeleton className="px-10 py-4 text-lg font-bold uppercase rounded-full transition duration-300 bg-[var(--site-pink)] text-white h-14 w-48 mx-auto" />
                    </div>
                </div>
            </div>
        )}

        {/* Actual Content - Only shows when data is loaded */}
        {data && (
            <>
                <div className="pt-48 pb-32 px-4 relative bg-white">
                    <div className="container mx-auto max-w-7xl relative z-10 overflow-hidden">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
                            <div className="lg:col-span-4 mb-16 lg:mb-0 lg:sticky lg:top-4 top-0 p-2 overflow-hidden">
                                <ScrollFadeIn delay={200}>
                                    <div className="flex items-center mb-6">
                                        <span className="text-4xl font-bold uppercase text-[var(--site-black)]">
                                            {data?.data?.data?.title}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-6 leading-tight text-black">
                                        <span className='text-black'>Package offers the following</span>
                                    </h2>
                                    <p className="text-xl leading-relaxed text-black">
                                        {data?.data?.data?.short_description}
                                    </p>
                                </ScrollFadeIn>
                            </div>

                            {/* Right Column: Feature Cards */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden p-2">
                                {data?.data?.keypoints.map((point: any, index: any) => {
                                    const Icon = [Cpu, Target, TrendingUp, Globe, Aperture][index % 5];
                                    const descriptions = [
                                        "Deep-dive technical audits to ensure your foundation is flawless for crawlers.",
                                        "High-intent keyword mapping that targets users ready to convert, not just browse.",
                                        "Strategic outreach to build domain authority through high-quality backlink profiles.",
                                        "Optimizing user journeys to turn organic visitors into paying customers.",
                                        "Data-driven forecasting to predict trends and adapt strategies proactively."
                                    ];

                                    return (
                                        <ScrollFadeIn key={point.id} delay={index * 100} className="h-full overflow-hidden p-4">
                                            <div className="group p-8 rounded-2xl h-full border transition-all duration-500 hover:-translate-y-2 bg-[var(--site-purple)]">
                                                {/* Icon Container with Glow */}
                                                <div className="mb-6 inline-flex p-4 rounded-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: index % 2 === 0 ? colors.highlight : colors.primary }}></div>
                                                    <Icon size={28} style={{ color: colors.highlight }} className="relative z-10" />
                                                </div>

                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors" style={{ color: colors.textMain }}>
                                                    {point.title}
                                                </h3>

                                                {/* Hover Border Glow Effect */}
                                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            </div>
                                        </ScrollFadeIn>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-22 px-4 relative overflow-hidden bg-[var(--site-purple)]">
                    <div className="container mx-auto max-w-7xl relative z-10">
                        <ScrollFadeIn>
                            <div className="text-center mb-24 p-4">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white overflow-hidden">
                                    Payment Plans
                                </h2>
                                <p className="text-xl max-w-2xl mx-auto text-white">
                                    Transparent pricing for serious growth partners.
                                </p>
                            </div>
                        </ScrollFadeIn>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center p-2 overflow-hidden">
                            {data?.data?.packages.map((pkg: any, index: any) => {
                                const isFeatured =
                                    pkg.name.toLowerCase().includes("pro") ||
                                    pkg.name.toLowerCase().includes('full') ||
                                    pkg.name.toLowerCase().includes('comprehensive') ||
                                    pkg.name.toLowerCase().includes('ecommerce');
                                const minPrice = formatPrice(pkg.min_price);
                                const maxPrice = formatPrice(pkg.max_price);

                                const packageDetails = data?.data?.pricing_details?.find(
                                    (detail: PricingDetail) => detail.package_id === pkg.id
                                );

                                return (
                                    <ScrollFadeIn key={pkg.id} delay={index * 150} className={`h-full ${isFeatured ? 'p-6 lg:mt-5 mt-4 md:-mt-8 mb-4 md:mb-8' : 'p-6 lg:mt-5 mt-4 md:-mt-8 mb-4 md:mb-8'}`}>
                                        <div className={`relative p-8 rounded-3xl border-none hover:translate-y-5 flex flex-col overflow-hidden relative transition-all duration-500 h-full border group hover:border-pink-500/50 bg-[var(--site-black)]`}>
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
                                                <span className="text-md font-medium text-white line">
                                                    {maxPrice && maxPrice !== minPrice ? ` - ${maxPrice}` : ''} / One time payment
                                                </span>
                                            </div>

                                            <p className="text-lg mb-8 pb-8 border-b border-gray-800 text-white">
                                                {pkg.description}
                                            </p>

                                            {/* FIXED: Use packageDetails.package_list instead of data?.data?.pricing_details?.package_list */}
                                            <ul className="space-y-4 mb-6">
                                                {packageDetails?.package_list?.map((item: any, itemIndex: any) => (
                                                    <li key={itemIndex} className="flex items-start">
                                                        <CheckCircle
                                                            size={18}
                                                            className="mr-3 mt-1 flex-shrink-0"
                                                            style={{ color: isFeatured ? colors.highlight : colors.soft }}
                                                        />
                                                        <span className="text-lg text-white">{item.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link href={{ pathname: "/pages/payments", query: `package_id=${pkg.id}` }}>
                                                <button
                                                    className={`absolute bottom-4 right-8 w-[80%] hover:cursor-pointer hover:bg-[var(--site-purple)] py-4 text-md font-bold uppercase rounded-xl transition-all duration-300 flex items-center justify-center text-white bg-[var(--site-pink)]`}
                                                >
                                                    Select Plan
                                                </button>
                                            </Link>
                                        </div>
                                    </ScrollFadeIn>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Final CTA Block */}
                <div className="py-24 px-4 text-center border-t border-gray-900" style={{ backgroundColor: colors.background }}>
                    <ScrollFadeIn>
                        <Activity size={48} className="mx-auto mb-6" style={{ color: colors.highlight }} />
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to scale your organic revenue?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Stop guessing. Start growing.
                        </p>
                        <button
                            className="px-10 py-4 text-lg font-bold uppercase rounded-full transition duration-300 hover:shadow-[0_0_30px_rgba(241,0,134,0.5)] hover:-translate-y-1 bg-[var(--site-pink)] text-white"
                        >
                            Schedule Strategy Call
                        </button>
                    </ScrollFadeIn>
                </div>
            </>
        )}
    </div>
    );
};

export default function PackagePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <PackageComponent />
        </Suspense>
    )
}