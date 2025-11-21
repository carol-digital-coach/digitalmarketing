"use client"
import { ScrollFadeIn } from "@/app/components/scrollanimation";
import { colors } from "@/lib/colors";
import { Zap, HardHat, Cpu, Briefcase, Target, Feather, Megaphone, Search, Users, MessageSquare, CheckCircle } from "lucide-react"


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
    ];
    return (
        <section id="services" className="py-24 min-h-screen overflow-hidden" style={{ backgroundColor: colors.base, color: 'white' }}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl overflow-hidden">
                <ScrollFadeIn>
                    <h1 className="uppercase tracking-widest text-2xl font-bold mb-3 block">
                        Services
                    </h1>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-5xl mb-12 leading-tight">
                        Empowering Entrepreneurs & SMEs with <span style={{ color: colors.pop }}>Practical Digital Strategies.</span>
                    </h2>
                    <p className="text-lg mb-16 max-w-4xl text-white">
                        Helping entrepreneurs and SMEs grow online through practical digital strategies, high-impact content, targeted SEO, effective paid ads, and personalized coaching.
                    </p>
                </ScrollFadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
                    {serviceCategories.map((category, index) => (
                        <ScrollFadeIn key={index} delay={index * 150} threshold={0.1}>
                            <div className="p-8 rounded-xl h-full flex flex-col transition-all duration-500 shadow-xl cursor-pointer"
                                style={{ backgroundColor: colors.deep, border: `2px solid ${colors.soft}` }}
                                onMouseOver={e => {
                                    e.currentTarget.style.borderColor = colors.pop;
                                    e.currentTarget.style.boxShadow = `0 10px 15px -3px ${colors.pop}50, 0 4px 6px -2px ${colors.pop}50`; // Subtle pink shadow
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.borderColor = colors.soft;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <category.icon size={40} className="mb-6 flex-shrink-0" />
                                <h3 className="text-2xl font-bold mb-3 text-white">{category.title}</h3>
                                <p className="text-base mb-6 italic" >{category.mainDesc}</p>


                                <div className="space-y-3 mt-auto mb-6">
                                    <h4 className="text-sm uppercase font-semibold tracking-wider">Key Offerings:</h4>
                                    {category.items.map((item, i) => (
                                        <div key={i} className="flex items-start text-sm">
                                            <CheckCircle size={16} className="mr-3 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="mt-auto w-fulltext-white text-lg font-bold py-3 rounded-sm transition-transform duration-300  hover:cursor-pointer hover:border-black hover:shadow-md bg-[var(--site-black)]"
                                    onClick={() => alert(`Showing details for ${category.title}`)}
                                >
                                    Request Service
                                </button>
                            </div>
                        </ScrollFadeIn>
                    ))}
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
                        <a href="#contact"
                            className="inline-block px-8 py-3 bg-white text-lg font-bold rounded-sm transition-all duration-300 transform shadow-lg hover:bg-black hover:text-white"
                        >
                            Book a Consultation
                        </a>
                    </div>
                </ScrollFadeIn>
            </div>
        </section>
    )
}