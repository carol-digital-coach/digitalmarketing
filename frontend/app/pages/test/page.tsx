"use client"

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Target,
  Zap,
  Cpu,
  LineChart,
  HardHat,
  Trello,
  BookOpen,
  Users,
  Briefcase,
  Layers,
} from 'lucide-react';

// --- User-Defined Color Palette (Dark Mode Ready) ---
const colors = {
    base: "#180A0A",    // Very dark background (main canvas)
    deep: "#711A75",    // Deep Magenta/Purple (section background, card contrast)
    pop: "#F10086",     // Vibrant Pink/Fuchsia (Primary accent, CTA)
    soft: "#F582A7"     // Softer Rose Pink (Secondary accent, borders)
};

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Reusable Scroll Animation Component ---
const ScrollFadeIn = ({ children, delay = 0, threshold = 0.2, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [threshold, isVisible]);

  // Apply classes for initial state and transition
  const classes = `transition-all duration-1000 ease-out
                   ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                   ${className}`;

  return (
    <div
      className={classes}
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- NAVIGATION COMPONENT ---
const Navigation = ({ isOpen, setIsOpen }) => {
    const navigationItems = [
        // New Pages Added Here
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Courses", href: "#courses" },

        // Existing Pages
        { name: "Process", href: "#process" },
        { name: "Carol AI", href: "#carol" },
        { name: "Insights", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className="fixed top-0 z-50 w-full px-6 py-4 transition-all duration-300 shadow-xl"
            style={{ backgroundColor: colors.base, borderBottom: `1px solid ${colors.soft}30` }}
        >
            <div className="container mx-auto">
                <div className="flex h-12 md:h-16 items-center justify-between">

                    {/* Logo: CarolDigital Analyst (Text set to white/pop for dark background) */}
                    <a href="#" className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter" style={{ color: 'white' }}>
                                <span style={{ color: colors.pop }}>CAROL</span>.AI
                            </span>
                        </div>
                    </a>

                    {/* Desktop Menu and CTA */}
                    <div className="hidden md:flex items-center space-x-8">

                        {/* Navigation Links */}
                        <div className="flex space-x-6">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium uppercase tracking-widest relative group transition-colors"
                                    style={{ color: 'white' }}
                                >
                                    {item.name}
                                    <span
                                      className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                                      style={{ backgroundColor: colors.pop }}
                                    ></span>
                                </a>
                            ))}
                        </div>

                        {/* CTA Button - Desktop */}
                        <button className="px-6 py-2 text-sm font-bold uppercase rounded-full transition-all duration-300 shadow-lg"
                            style={{ backgroundColor: colors.pop, color: colors.base, border: `1px solid ${colors.pop}` }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = colors.soft}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = colors.pop}
                        >
                            Start Analysis
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden z-50 focus:outline-none p-2 border rounded-full"
                        style={{ borderColor: colors.soft }}
                    >
                        <Menu size={24} style={{ color: colors.pop }} />
                    </button>

                    {/* Mobile Menu Overlay (Using deep color for contrast) */}
                    <div
                      className={cn(
                        "fixed inset-0 flex flex-col justify-start items-center transition-transform duration-500 ease-in-out z-[99] p-6 pt-20",
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                      )}
                      style={{ backgroundColor: colors.deep }}
                    >
                        {/* Close Button */}
                        <div className="flex justify-end w-full mb-16">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-10 w-10 rounded-full flex items-center justify-center"
                                style={{ color: colors.pop, border: `1px solid ${colors.soft}` }}
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Mobile Navigation Items */}
                        <div className="flex flex-col items-center space-y-8 w-full">
                             {navigationItems.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="text-4xl font-black uppercase transition-colors"
                                  style={{ color: 'white' }}
                                  onMouseOver={e => e.currentTarget.style.color = colors.pop}
                                  onMouseOut={e => e.currentTarget.style.color = 'white'}
                                >
                                  {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};
// --- END NAVIGATION COMPONENT ---

// --- HERO COMPONENT ---
const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: colors.base, color: 'white' }}>

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

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center pt-20">
        <ScrollFadeIn delay={0}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase max-w-4xl leading-tight">
            Predictable <span style={{ color: colors.pop }}>ROI</span>, Powered by AI.
          </h1>
        </ScrollFadeIn>
        <ScrollFadeIn delay={200}>
          <p
            className="mt-8 text-xl md:text-2xl max-w-3xl font-light tracking-wide"
            style={{ color: colors.soft }}
          >
            We deploy **Carol**, our proprietary intelligence engine, to eliminate guesswork and model guaranteed growth paths for your digital channels.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn delay={400} className="mt-12">
            <button className="px-8 py-3 text-lg font-bold uppercase rounded-full transition-all duration-300 shadow-xl"
                style={{ backgroundColor: colors.pop, color: colors.base }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = colors.soft}
                onMouseOut={e => e.currentTarget.style.backgroundColor = colors.pop}
            >
                View the Data Process <ArrowRight size={20} className="inline ml-2" />
            </button>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

// --- NEW: ABOUT SECTION (deep background) ---
const AboutSection = () => {
    return (
        <section id="about" className="py-24" style={{ backgroundColor: colors.deep, color: 'white' }}>
            <div className="container mx-auto px-6">
                <ScrollFadeIn threshold={0.1}>
                    <span className="uppercase tracking-widest text-sm font-bold mb-4 block" style={{ color: colors.soft }}>
                        Who We Are
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-12 leading-tight">
                        Fusing Data Science with <span style={{ color: colors.pop }}>Digital Strategy</span>.
                    </h2>
                </ScrollFadeIn>

                <div className="flex flex-col lg:flex-row gap-12">
                    <ScrollFadeIn delay={150} className="lg:w-1/2">
                        <p className="text-xl font-light mb-6 leading-relaxed" style={{ color: 'white' }}>
                            Carol.AI was founded on the principle that modern marketing should be a science, not an art. We transitioned from traditional agency models to a data-first consultancy, utilizing our proprietary Carol engine to build **unbeatable growth models** for our clients.
                        </p>
                        <p className="text-lg leading-relaxed" style={{ color: colors.soft }}>
                            Our team consists of PhD-level data scientists, veteran performance marketers, and strategic architects who work as a unified unit to predict and execute the most effective digital campaigns.
                        </p>
                    </ScrollFadeIn>

                    <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                        <ScrollFadeIn delay={300}>
                            <div className="p-6 rounded-lg border-2 h-full" style={{ borderColor: colors.soft }}>
                                <Users size={32} className="mb-3" style={{ color: colors.pop }} />
                                <p className="text-2xl font-bold mb-1">100+ Clients</p>
                                <p className="text-sm" style={{ color: colors.soft }}>Scaled globally</p>
                            </div>
                        </ScrollFadeIn>
                        <ScrollFadeIn delay={450}>
                             <div className="p-6 rounded-lg border-2 h-full" style={{ borderColor: colors.soft }}>
                                <Zap size={32} className="mb-3" style={{ color: colors.pop }} />
                                <p className="text-2xl font-bold mb-1">5 Year Models</p>
                                <p className="text-sm" style={{ color: colors.soft }}>Predictive accuracy</p>
                            </div>
                        </ScrollFadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- NEW: SERVICES SECTION (base background) ---
const ServicesSection = () => {
    const serviceItems = [
        { title: "Performance Marketing", desc: "AI-optimized paid media strategies across all major platforms, guaranteeing lower CPA and higher LTV.", icon: Zap },
        { title: "Technical SEO Audit", desc: "Deep-dive structural and semantic analysis using Carol to unlock organic potential and resolve crawl issues.", icon: HardHat },
        { title: "Data Stack Integration", desc: "Seamless consolidation and normalization of disparate data sources for accurate reporting and modeling.", icon: Cpu },
        { title: "Strategy & Consulting", desc: "Expert guidance from our leadership team to align Carol's intelligence with your executive goals.", icon: Briefcase },
    ];
    return (
        <section id="services" className="py-24" style={{ backgroundColor: colors.base, color: 'white' }}>
            <div className="container mx-auto px-6">
                <ScrollFadeIn>
                    <span className="uppercase tracking-widest text-sm font-bold mb-4 block" style={{ color: colors.soft }}>
                        What We Deliver
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-16 leading-tight">
                        The <span style={{ color: colors.pop }}>Core</span> Services.
                    </h2>
                </ScrollFadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceItems.map((item, index) => (
                        <ScrollFadeIn key={index} delay={index * 150} threshold={0.3}>
                            <div className="p-6 rounded-xl h-full border-2 transition-all duration-300"
                                style={{ borderColor: colors.soft, backgroundColor: colors.deep }}
                                onMouseOver={e => e.currentTarget.style.borderColor = colors.pop}
                                onMouseOut={e => e.currentTarget.style.borderColor = colors.soft}
                            >
                                <item.icon size={36} className="mb-4" style={{ color: colors.pop }} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-sm" style={{ color: colors.soft }}>{item.desc}</p>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- EXISTING: PROCESS SECTION ---
const ProcessItem = ({ title, description, icon: Icon, index }) => {
  return (
    <ScrollFadeIn delay={index * 150} threshold={0.3}>
      <div className="p-8 rounded-xl h-full border transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] shadow-pop-darker"
           // Use the darker base color for the card background, and white text
           style={{ borderColor: colors.soft, backgroundColor: colors.base, color: 'white' }}
           onMouseOver={e => e.currentTarget.style.borderColor = colors.pop}
           onMouseOut={e => e.currentTarget.style.borderColor = colors.soft}
      >
          <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold" style={{ color: colors.pop }}>0{index + 1}</span>
              <Icon size={28} style={{ color: colors.soft }} />
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: 'white' }}>{title}</h3>
          <p className="leading-relaxed" style={{ color: colors.soft }}>{description}</p>
      </div>
    </ScrollFadeIn>
  );
};

const Process = () => {
  const services = [
    {
      title: "Data Ingestion & Audit",
      description: "Secure ingestion of all funnel data points. Carol performs an exhaustive audit, identifying immediate anomalies and structural flaws.",
      icon: HardHat
    },
    {
      title: "Predictive Modeling (Carol)",
      description: "The AI simulates thousands of future scenarios to pinpoint the highest-leverage actions and lowest-risk paths to growth.",
      icon: Cpu
    },
    {
      title: "Strategic Blueprinting",
      description: "Our human experts translate Carol's models into a precise, step-by-step roadmap for content, paid media, and technical SEO.",
      icon: Trello
    },
    {
      title: "Continuous Optimization",
      description: "Real-time performance is fed back into Carol, ensuring the strategy automatically adapts to market changes and maximizes ROAS.",
      icon: LineChart
    },
  ];

  return (
    <section id="process" className="py-24" style={{ backgroundColor: colors.deep, color: 'white' }}>
      <div className="container mx-auto px-6">
        <ScrollFadeIn>
           <span
             className="uppercase tracking-widest text-sm font-bold mb-4 block"
             style={{ color: colors.soft }}
           >Our Method</span>
           <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-16 leading-tight">
              A Four-Step <span style={{ color: colors.pop }}>Intelligence Cycle</span>.
           </h2>
        </ScrollFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
                <ProcessItem key={i} index={i} {...s} />
            ))}
        </div>
      </div>
    </section>
  );
};

// --- NEW: COURSES SECTION (base background) ---
const CoursesSection = () => {
    const courseItems = [
        { title: "AI-Driven Performance Marketing", desc: "Master the principles of predictive budget allocation and LTV modeling for digital ads.", duration: "8 Weeks" },
        { title: "Advanced Data Stack Architecture", desc: "Learn to build, govern, and audit unified data environments for maximum intelligence.", duration: "5 Weeks" },
        { title: "Semantic Content Strategy", desc: "A deep dive into using AI for topic modeling, intent matching, and content forecasting.", duration: "6 Weeks" },
    ];
    return (
        <section id="courses" className="py-24" style={{ backgroundColor: colors.base, color: 'white' }}>
            <div className="container mx-auto px-6">
                <ScrollFadeIn>
                    <span className="uppercase tracking-widest text-sm font-bold mb-4 block" style={{ color: colors.soft }}>
                        Education
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-16 leading-tight">
                        Train Your Team on the <span style={{ color: colors.pop }}>Carol Standard</span>.
                    </h2>
                </ScrollFadeIn>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courseItems.map((item, index) => (
                        <ScrollFadeIn key={index} delay={index * 150} threshold={0.3}>
                            <div className="p-8 rounded-xl h-full border-2 transition-all duration-300 flex flex-col"
                                style={{ borderColor: colors.soft, backgroundColor: colors.deep }}
                                onMouseOver={e => e.currentTarget.style.borderColor = colors.pop}
                                onMouseOut={e => e.currentTarget.style.borderColor = colors.soft}
                            >
                                <BookOpen size={36} className="mb-4" style={{ color: colors.pop }} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-sm flex-grow mb-4" style={{ color: colors.soft }}>{item.desc}</p>
                                <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: colors.soft + '30' }}>
                                    <span className="text-sm font-semibold" style={{ color: colors.pop }}>{item.duration}</span>
                                    <ArrowRight size={20} style={{ color: colors.soft }} />
                                </div>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- EXISTING: CAROL AI SECTION ---
const CarolAI = () => {
    return (
        <section id="carol" className="py-24" style={{ backgroundColor: colors.deep, color: 'white' }}>
            <div className="container mx-auto px-6">
                <ScrollFadeIn threshold={0.1}>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-center">
                        The <span style={{ color: colors.pop }}>Carol</span> AI Engine
                    </h2>
                    <p className="text-center text-xl font-light mb-16 max-w-3xl mx-auto" style={{ color: colors.soft }}>
                        Carol is not a tool; she is our unfair advantage. A system built on proprietary models for optimal digital funnel performance.
                    </p>
                </ScrollFadeIn>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
                    {/* Data Visualization / Carol Representation */}
                    <div className="lg:w-1/3 p-4">
                        <ScrollFadeIn threshold={0.1}>
                            <div className="relative w-[300px] h-[300px] mx-auto">
                                {/* Core Processing Unit */}
                                <div
                                    className="absolute inset-0 rounded-full border-4"
                                    style={{ borderColor: colors.soft, boxShadow: `0 0 40px ${colors.pop}80` }}
                                ></div>
                                {/* Animated Data Ring 1 (Pulse) */}
                                <div
                                    className="absolute inset-0 rounded-full border-2 animate-pulse-slow"
                                    style={{ borderColor: colors.pop }}
                                ></div>
                                {/* Animated Data Ring 2 (Spinning Grid) */}
                                <div
                                    className="absolute inset-2 rounded-full border border-dashed animate-spin-slow flex items-center justify-center"
                                    style={{ borderColor: colors.soft }}
                                >
                                    <Cpu size={80} style={{ color: colors.pop }} className="opacity-70" />
                                </div>
                                <style>{`
                                    @keyframes pulse-slow {
                                        0%, 100% { transform: scale(1); opacity: 0.9; }
                                        50% { transform: scale(1.05); opacity: 1; }
                                    }
                                    @keyframes spin-slow {
                                        from { transform: rotate(0deg); }
                                        to { transform: rotate(360deg); }
                                    }
                                    .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
                                    .animate-spin-slow { animation: spin-slow 15s linear infinite; }
                                `}</style>
                            </div>
                        </ScrollFadeIn>
                    </div>

                    {/* Features List */}
                    <div className="lg:w-2/3 max-w-2xl min-h-[380px] p-2">
                        <h3 className="text-3xl font-bold mb-6" style={{ color: colors.pop }}>
                            Key Capabilities
                        </h3>
                        <div className="space-y-6">
                            {[
                                { title: "True Predictive Modeling", desc: "Forecasts up to 18 months of performance across all metrics, minimizing surprise downturns." },
                                { title: "Semantic Opportunity Mapping", desc: "Analyzes content gaps and intent mismatches on a semantic level far beyond standard keyword analysis." },
                                { title: "Automated Funnel Pathing", desc: "Identifies and scores hundreds of conversion paths, automatically recommending the highest-yield segment to target next." },
                            ].map((item, index) => (
                                <ScrollFadeIn delay={index * 200 + 200} key={item.title}>
                                    <div className="flex items-start border-b pb-4 last:border-b-0" style={{ borderColor: colors.soft + '30' }}>
                                        <Target size={24} style={{ color: colors.soft }} className="mt-1 mr-4 flex-shrink-0" />
                                        <div>
                                            <p className="text-xl font-semibold mb-1" style={{ color: colors.pop }}>{item.title}</p>
                                            <p className="font-light" style={{ color: 'white' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                </ScrollFadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- EXISTING: INSIGHTS (Work/Case Studies) SECTION ---
const InsightCard = ({ title, category, metric, index }) => {
  return (
    <ScrollFadeIn delay={index * 100} threshold={0.25}>
      <div className="p-6 rounded-lg border-2 h-full transition-all duration-300 shadow-md"
        // Card background is the main deep color, text is white
        style={{ borderColor: colors.soft, backgroundColor: colors.base, color: 'white' }}
        onMouseOver={e => e.currentTarget.style.borderColor = colors.pop}
        onMouseOut={e => e.currentTarget.style.borderColor = colors.soft}
      >
        <h4 className="text-sm uppercase tracking-widest font-semibold mb-1" style={{ color: colors.soft }}>{category}</h4>
        <h3 className="text-2xl font-bold mb-4" style={{ color: 'white' }}>{title}</h3>
        <p className="text-4xl font-black mb-4" style={{ color: colors.pop }}>{metric}</p>
        <div
          className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium transition-colors"
          style={{ color: colors.pop }}
        >
          View Full Insight <ArrowRight size={16} />
        </div>
      </div>
    </ScrollFadeIn>
  );
};

const Insights = () => {
  const insights = [
    { title: "B2B Lead Score Refinement", category: "Conversion", metric: "+45% SQL", link: "#" },
    { title: "Localized Content Strategy", category: "SEO", metric: "3.2M Impressions", link: "#" },
    { title: "PPC Budget Allocation Model", category: "PPC", metric: "2.1X ROAS", link: "#" },
    { title: "Q3 Funnel Leakage Detection", category: "Analytics", metric: "-25% Drop-off", link: "#" },
  ];

  return (
    <section id="work" className="py-24 px-6" style={{ backgroundColor: colors.base }}>
      <div className="container mx-auto">
        <ScrollFadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16" style={{ color: 'white' }}>
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                Actionable <span style={{ color: colors.pop }}>Insights</span>
              </h2>
              <p className="mt-2 text-lg" style={{ color: colors.soft }}>Results driven by predictive, not retrospective, analysis.</p>
            </div>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((p, i) => (
            <InsightCard key={i} index={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- EXISTING: FOOTER/CONTACT ---
const Footer = () => {
  return (
    <footer id="contact" className="pt-24 pb-12 px-6" style={{ backgroundColor: colors.deep, color: 'white' }}>
        <div className="container mx-auto">
          <ScrollFadeIn threshold={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24 border-b pb-12" style={{ borderColor: colors.soft }}>
                <div className="md:col-span-1">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
                        Ready to<br/>Connect?
                    </h2>
                    <a
                      href="mailto:analysis@carolai.com"
                      className="text-xl md:text-2xl pb-2 transition-all inline-flex items-center gap-4 font-mono"
                      style={{ borderBottom: `2px solid ${colors.pop}`, color: colors.pop }}
                      onMouseOver={e => e.currentTarget.style.color = 'white'}
                      onMouseOut={e => e.currentTarget.style.color = colors.pop}
                    >
                        analysis@carolai.com <ArrowRight />
                    </a>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.soft }}>Location</h4>
                    <address className="not-italic text-lg" style={{ color: 'white' }}>
                        Global Data Hub A-23<br/>
                        London, UK<br/>
                        New York, USA
                    </address>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.soft }}>Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>Service Terms</a></li>
                        <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>Client Login</a></li>
                    </ul>
                </div>
            </div>
            </ScrollFadeIn>

            <div className="flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest" style={{ color: colors.soft }}>
                <span className="order-2 md:order-1 mt-4 md:mt-0">© 2024 CAROL.AI | A Digital Intelligence Agency</span>
                <span className="order-1 md:order-2 font-mono" style={{ color: colors.pop }}>V 2.2.0</span>
            </div>
        </div>
    </footer>
  );
}

// --- Main App Component ---

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:text-black overflow-x-hidden" style={{ backgroundColor: colors.base, color: 'white', selectionBackgroundColor: colors.pop }}>
        <style dangerouslySetInnerHTML={{__html: `
            /* Custom Scrollbar for better aesthetic on dark background */
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: ${colors.base};
            }
            ::-webkit-scrollbar-thumb {
                background: ${colors.soft};
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${colors.pop};
            }

            html {
                scroll-behavior: smooth;
            }
        `}} />

        <Navigation isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

        <main>
            <Hero />
            <AboutSection />
            <ServicesSection />
            <Process />
            <CoursesSection />
            <CarolAI />
            <Insights />
        </main>

        <Footer />
    </div>
  );
}