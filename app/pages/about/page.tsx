"use client"

import React from 'react';
import {
    Target,
    Megaphone,
    Users,
    Video,
    Search,
    PenTool,
    ArrowRight,
    Zap,
    Cpu
} from 'lucide-react';
import { ScrollFadeIn } from '@/app/components/scrollanimation';
import { colors } from '@/lib/colors';
import { ImageAvatar } from '@/app/components/imageAvatar';

const services = [
    {
        title: "Digital Strategy",
        description: "Crafting tailored online growth plans that align with your specific business goals and market position.",
        icon: <Target className="w-6 h-6 text-white" />,
        gradient: "from-blue-500 to-cyan-400"
    },
    {
        title: "Meta Ads Campaigns",
        description: "Running precise, high-converting Facebook and Instagram ad campaigns to maximize your ROI.",
        icon: <Megaphone className="w-6 h-6 text-white" />,
        gradient: "from-purple-500 to-pink-400"
    },
    {
        title: "One-on-One Coaching",
        description: "Guiding individuals personally on how to monetize online opportunities effectively and sustainably.",
        icon: <Users className="w-6 h-6 text-white" />,
        gradient: "from-orange-500 to-amber-400"
    },
    {
        title: "Content Coaching",
        description: "Helping you unlock your creative potential to develop engaging, viral-ready content strategies.",
        icon: <Video className="w-6 h-6 text-white" />,
        gradient: "from-rose-500 to-red-400"
    },
    {
        title: "SEO Consultation",
        description: "Optimizing your online presence for visibility, ranking, and organic growth on search engines.",
        icon: <Search className="w-6 h-6 text-white" />,
        gradient: "from-emerald-500 to-green-400"
    },
    {
        title: "Content Writing",
        description: "Producing compelling, audience-focused, and SEO-driven copy that converts readers into buyers.",
        icon: <PenTool className="w-6 h-6 text-white" />,
        gradient: "from-indigo-500 to-blue-400"
    }
];

export default function ServicesSection() {
    return (
        <section id="about" className="py-24" style={{ backgroundColor: colors.deep, color: 'white' }}>
            <div className="container mx-auto px-6">
                <ScrollFadeIn threshold={0.1}>
                    <span className="uppercase tracking-widest text-sm font-bold mb-4 block">
                        What I Do
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-12 leading-tight">
                        Carol The Digital <span style={{ color: colors.pop }}> Analyst.</span>
                    </h2>
                </ScrollFadeIn>

                <div className="flex flex-col lg:flex-row gap-12 overflow-hidden">
            
                    <ScrollFadeIn delay={150} className="lg:w-1/2 space-y-8 cursor-pointer">
                        <div className="p-6 rounded-xl border-l-4 transition-all duration-300 hover:border-l-8" style={{ borderColor: colors.pop, backgroundColor: colors.base + '50', boxShadow: `0 0 10px ${colors.pop}20` }}>
                            <p className="text-2xl font-semibold leading-relaxed" style={{ color: 'white' }}>
                                I've helped over 100 individuals discover their ability to create income online. Some have launched their own businesses by turning their talents into profitable ventures, while others have learned valuable digital skills such as content writing, social media management, and more — transforming those skills into sustainable sources of income.
                            </p>
                        </div>

                        <p className="text-lg leading-relaxed pt-2 text-white">
                            My journey didn't just start — it has been a process of growth, resilience, and purpose. I began learning digital skills as a mother of twins, when I realized how difficult it was to re-enter the job market while caring for my children. That challenge became my turning point and ignited my passion for empowering other mums to find freedom and opportunity online.
                        </p>
                        
                        <p className="text-base leading-relaxed pt-2 text-white">
                            What began with a single YouTube video has grown into 10+ certifications and over 7 years of experience in the digital space. Along the way, I've had the privilege of working with brands across education, technology, gardening, and personal development — and I'm always open to new collaborations that inspire growth and impact.
                        </p>
                    </ScrollFadeIn>

                    <div className="lg:w-1/2 grid grid-cols-2 gap-6 p-2 max-h-[550px] p-4 overflow-y-hidden">
                        <ScrollFadeIn delay={300}>
                            <div className="p-6 rounded-lg border-2 h-full" style={{ borderColor: colors.soft }}>
                                <Users size={32} className="mb-3" style={{ color: colors.pop }} />
                                <p className="text-2xl font-bold mb-1">100+ Individuals</p>
                                <p className="text-sm" style={{ color: colors.soft }}>Empowered for success</p>
                            </div>
                        </ScrollFadeIn>
                        
                        <ScrollFadeIn delay={400}>
                            <div className="p-6 rounded-lg border-2 h-full" style={{ borderColor: colors.soft }}>
                                <Target size={32} className="mb-3" style={{ color: colors.pop }} />
                                <p className="text-2xl font-bold mb-1">95% Success Rate</p>
                                <p className="text-sm" style={{ color: colors.soft }}>Client growth metric</p>
                            </div>
                        </ScrollFadeIn>
                        
                        <ScrollFadeIn delay={500}>
                            <div className="p-6 rounded-lg border-2 h-full" style={{ borderColor: colors.soft }}>
                                <Cpu size={32} className="mb-3" style={{ color: colors.pop }} />
                                <p className="text-2xl font-bold mb-1">24/7 Online Support</p>
                                <p className="text-sm" style={{ color: colors.soft }}>Continuous online support</p>
                            </div>
                        </ScrollFadeIn>
                        
                        <ScrollFadeIn delay={600}>
                            <div className="p-6 rounded-lg border-2 h-full" style={{ borderColor: colors.soft }}>
                                <Zap size={32} className="mb-3" style={{ color: colors.pop }} />
                                <p className="text-2xl font-bold mb-1">7+ Years</p>
                                <p className="text-sm" style={{ color: colors.soft }}>Digital experience</p>
                            </div>
                        </ScrollFadeIn>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}