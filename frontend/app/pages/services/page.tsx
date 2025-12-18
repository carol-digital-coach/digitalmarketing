"use client"
import { ScrollFadeIn } from "@/app/components/scrollanimation";
import { colors } from "@/lib/colors";
import { Zap, HardHat, Cpu, Briefcase, Target, Feather, Megaphone, Search, Users, MessageSquare, CheckCircle, FileSearch } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RiWhatsappFill } from "react-icons/ri";
import { FaPhoneVolume } from "react-icons/fa6";
import axios from "axios"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function ServicesPage() {
    const serviceCategories = [
        {
            title: "Digital Strategy & Planning",
            icon: Target,
            mainDesc: "Build a clear, actionable roadmap for your sustained online growth.",
            items: [
                "Online Business Strategy: Step-by-step guidance to start or grow your online business.",
                "Digital Roadmap Creation: Plan content, ads, and growth strategies for 3–6 months.",
                "Brand Positioning: Define your unique value proposition and niche online.",
                "Market & Competitor Analysis: Learn how to stand out and attract the right audience.",
            ],
        },
        {
            title: "Paid Advertising & Campaigns",
            icon: Megaphone,
            mainDesc: "Run highly optimized ads that convert efficiently and maximize your return on investment (ROI).",
            items: [
                "Meta Ads Campaigns: Comprehensive Facebook & Instagram ad strategy, setup, and optimization.",
                "Ad Performance Tracking: Monitor critical metrics like CTR, conversions, and true ROI.",
                "Retargeting & Funnel Ads: Implement strategies to turn warm visitors into paying clients.",
                "Budget & Bid Strategy Guidance: Optimize ad spend for maximum results.",
            ],
        },
        {
            title: "SEO & Online Visibility",
            icon: Search,
            mainDesc: "Get discovered by your ideal audience organically and establish a strong online presence.",
            items: [
                "SEO Consultation: Expert on-page and off-page guidance for better search engine ranking.",
                "Keyword Research & Planning: Target profitable, high-intent search terms.",
                "Website Optimization Guidance: Improve site structure, speed, and overall user experience.",
                "Content SEO Strategy: Create high-value, SEO-friendly content that reliably converts visitors.",
            ],
        },
        {
            title: "Content Coaching & Creation",
            icon: Feather,
            mainDesc: "Master the art of creating content that truly engages your audience and drives business growth.",
            items: [
                "Content Strategy: Plan the what, when, and how for maximum impact across channels.",
                "Content Creation Coaching: Guidance for blogs, social posts, emails, and compelling captions.",
                "Visual Content Guidance: Practical tips for creating professional graphics and visuals.",
                "Content Repurposing: Turn one foundational piece of content into multiple formats to save time and increase reach.",
            ],
        },
        {
            title: "One-on-One Coaching & Mentorship",
            icon: Users,
            mainDesc: "Personalized, direct guidance designed to accelerate your skills and overall online success.",
            items: [
                "Freelancing Skills Coaching: Learn how to find, pitch, and successfully secure high-paying clients online.",
                "Personal Branding Mentorship: Strategically build your authority and influence within your industry.",
                "Social Media Growth Coaching: Proven strategies to increase followers and engagement rates.",
                "Digital Skills Training: Practical, hands-on training in SEO, content creation, ads, and strategy implementation.",
            ],
        },
        {
            title: "Social Media & Community Management",
            icon: MessageSquare,
            mainDesc: "Cultivate your online presence, foster an engaged community, and drive organic reach.",
            items: [
                "Social Media Audits: Identify current performance gaps and lucrative opportunities for growth.",
                "Posting & Scheduling Guidance: Optimize posting frequency and timing for peak engagement.",
                "Engagement & Community Growth: Actionable tips to grow an active, loyal follower base.",
                "Analytics & Performance Tracking: Utilize insights to continuously refine and improve your results.",
            ],
        },
        {
            title: "High-Performance Ads Setup & Optimization",
            icon: FileSearch,
            mainDesc: "Build a powerful, authoritative online presence. This package provides the technical, content, and strategy support required to dominate organic search rankings.",
            items: [
                "Technical Website Audit",
                "Comprehensive Keyword Strategy",
                "In-Depth Competitor Analysis",
                "Customized Content Strategy Guide",
                "Actionable SEO Implementation Roadmap"
            ]
        }
    ];

    const { data, isLoading, error } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_LIVE}services/`)
            // console.log(data)
            return data.data
        }
    })

    // console.log(data?.data)


    return (
        <section id="services" className="py-24 min-h-screen overflow-hidden" style={{ backgroundColor: colors.base, color: 'white' }}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl overflow-hidden">
                <ScrollFadeIn delay={200}>
                    <h1 className="uppercase tracking-widest text-6xl font-bold mb-3 block overflow-hidden">
                        Services
                    </h1>
                    <h2 className="text-3xl md:text-5xl lg:text-4xl font-extrabold max-w-5xl mb-12 leading-tight overflow-hidden">
                        Empowering Entrepreneurs & SMEs with <span style={{ color: colors.pop }}>Practical Digital Strategies.</span>
                    </h2>
                    <p className="text-lg mb-16 max-w-4xl text-white overflow-hidden">
                        Helping entrepreneurs and SMEs grow online through practical digital strategies, high-impact content, targeted SEO, effective paid ads, and personalized coaching.
                    </p>
                </ScrollFadeIn>

                <div className="w-full container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
                        {!data || isLoading ? (
                            <>
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-row gap-x-2 items-center mb-4">
                                    <Spinner className="text-lg animate-spin" />
                                    <p className="font-medium text-white">Getting Services please wait...</p>
                                </div>

                                {[0, 1, 2, 3, 4, 5].map((_, idx) => (
                                    <div key={idx} className="flex flex-col w-full max-w-[500px] mx-auto rounded-xl p-4 shadow-sm">
                                        <div className="flex flex-row items-center w-full space-x-4 mb-4">
                                            <Skeleton className="h-12 w-12 rounded-md bg-[var(--site-purple)]/20 shrink-0" />
                                            <div className="space-y-2 flex-1">
                                                <Skeleton className="h-4 w-3/4 bg-[var(--site-purple)]/50" />
                                                <Skeleton className="h-4 w-1/2 bg-[var(--site-purple)]/50" />
                                            </div>
                                        </div>

                                        <div className="w-full space-y-4">
                                            <Skeleton className="h-[200px] w-full bg-[var(--site-purple)]/50 rounded-md" />
                                            <Skeleton className="h-[40px] w-full bg-[var(--site-purple)]/50 rounded-md" />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            data?.data.map((category: any, index: any) => (
                                <ScrollFadeIn key={index} delay={index * 100} threshold={0.1}>
                                    <div
                                        className="p-8 rounded-xl h-full flex flex-col transition-all duration-500 shadow-xl cursor-pointer border-2"
                                        style={{
                                            backgroundColor: colors.deep,
                                            borderColor: colors.deep
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.borderColor = colors.pop;
                                            e.currentTarget.style.boxShadow = `0 10px 15px -3px ${colors.pop}50`;
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.borderColor = colors.deep;
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <h3 className="text-2xl font-bold mb-3 text-white">{category.title}</h3>
                                        <p className="text-base mb-6 italic opacity-80">{category.short_description}</p>

                                        <div className="flex-grow space-y-3 mt-6 mb-6">
                                            <h4 className="text-sm uppercase font-semibold tracking-wider text-white">
                                                Package Includes:
                                            </h4>
                                            {category.keypoints.map((item: { title: string }, i: any) => (
                                                <div key={i} className="flex items-start text-sm text-white">
                                                    <CheckCircle size={16} className="mr-3 mt-0.5 flex-shrink-0" />
                                                    <span>{item.title}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href={{pathname: "/pages/package", query: `requested_package=${category.id}`}}>
                                            <button className="p-2 mt-auto w-full text-white text-lg font-bold py-3 rounded-md transition-all duration-300 bg-[var(--site-black)]  hover:shadow-sm hover:bg-[var(--site-pink)] hover:cursor-pointer">
                                                Get {category.title.slice(0, 18)}...
                                            </button>
                                        </Link>
                                    </div>
                                </ScrollFadeIn>
                            ))
                        )}
                    </div>
                </div>

                <ScrollFadeIn delay={900}>
                    <div className="mt-20 p-10 md:p-16 rounded-md text-center shadow-sm"
                        style={{ backgroundColor: colors.soft, color: colors.base }}
                    >
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 overflow-hidden">
                            Ready to grow your brand and skills online?
                        </h3>
                        <p className="text-lg mb-8 font-medium">
                            Book a consultation today and start your journey with Carol the Digital Coach.
                        </p>
                        <Button
                            className="inline-block p-4 bg-white text-lg text-black font-bold h-15"
                            disabled={true}
                        >
                            Book a Consultation
                        </Button>
                    </div>
                </ScrollFadeIn>
            </div>
        </section>
    )
}