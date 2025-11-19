"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  ChevronDown,
  ArrowUpRight,
  Globe,
  Palette,
  Code,
  Megaphone
} from 'lucide-react';

// --- Color Palette ---
const colors = {
  base: "#180A0A",    // Darkest Base
  deep: "#711A75",    // Deep Purple (Borders, Dark Accents)
  pop: "#F10086",     // Hot Pink (CTAs, Links, Hovers)
  soft: "#F582A7"     // Soft Pink (Secondary Text, Subtitles)
};

// --- Reusable Scroll Animation Component ---
const ScrollFadeIn = ({ children, delay = 0, threshold = 0.2, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // If the element is intersecting and we haven't set it visible yet
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
        // Stop observing once visible for a one-time animation
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


// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setLinkHovered(
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      );
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  if (isMobile) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out ${
          linkHovered ? "w-12 h-12 opacity-50" : "w-3 h-3 opacity-100"
        }`}
        style={{ backgroundColor: colors.pop }}
      />
    </div>
  );
};

const Navigation = ({ isOpen, setIsOpen }) => {
  const links = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Agency", href: "#agency" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
      <a href="#" className="text-2xl font-bold tracking-tighter uppercase z-50">
        Timothe
      </a>
      
      <div className="hidden md:flex gap-8 z-50">
        {links.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-sm font-medium uppercase tracking-widest hover:text-gray-300 transition-colors relative group"
          >
            {link.name}
            <span 
              className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: colors.pop }}
            ></span>
          </a>
        ))}
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden z-50 focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out z-40 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ backgroundColor: colors.base }}
      >
        <div className="flex flex-col gap-8 text-center">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-4xl font-bold text-white uppercase transition-colors"
              style={{ WebkitTextStroke: `1px ${colors.soft}`, color: 'transparent' }}
              onMouseOver={e => e.currentTarget.style.color = colors.soft}
              onMouseOut={e => e.currentTarget.style.color = 'transparent'}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white" style={{ backgroundColor: colors.base }}>
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(circle at 50% 50%, ${colors.deep} 0%, ${colors.base} 60%)` }}
      ></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <ScrollFadeIn delay={0}>
          <h1 className="text-[15vw] leading-[0.85] font-black tracking-tighter uppercase mix-blend-overlay opacity-80 select-none">
            Timothe
          </h1>
        </ScrollFadeIn>
        <ScrollFadeIn delay={200}>
          <p 
            className="mt-8 text-lg md:text-xl max-w-md font-light tracking-widest uppercase"
            style={{ color: colors.soft }}
          >
            Digital Analyst & <br/> Creative Director
          </p>
        </ScrollFadeIn>
        
        <div className="mt-12 animate-bounce">
           <ChevronDown className="opacity-50" size={32} style={{ color: colors.soft }} />
        </div>
      </div>
    </section>
  );
};

{/* --- INTRO SECTION --- */}
const Intro = () => {
  return (
    <section className="py-24" style={{ backgroundColor: colors.base, color: colors.soft }}>
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <ScrollFadeIn threshold={0.1}>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-xl">
            I am Timothe, a creative director and digital analyst who believes in the power of <span className="text-white">data-driven design</span>. 
            My agency helps brands find clarity in the noise and build digital experiences that resonate.
          </p>
        </ScrollFadeIn>
        <div className="grid grid-cols-2 gap-8">
          <ScrollFadeIn delay={200} threshold={0.1}>
            <div className="border-l-2 pl-6" style={{ borderColor: colors.deep }}>
              <h3 className="text-4xl font-bold text-white mb-2">10+</h3>
              <p className="text-sm uppercase tracking-widest">Years Experience</p>
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn delay={400} threshold={0.1}>
            <div className="border-l-2 pl-6" style={{ borderColor: colors.deep }}>
              <h3 className="text-4xl font-bold text-white mb-2">150+</h3>
              <p className="text-sm uppercase tracking-widest">Projects Launched</p>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}

const Marquee = ({ text, reverse = false }) => {
  return (
    <div className="w-full py-12 bg-white text-black overflow-hidden border-y border-black">
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8">
            {text} —
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, category, year, image, index }) => {
  return (
    <ScrollFadeIn delay={index * 150} threshold={0.25}>
      <div className="group relative w-full aspect-[4/3] overflow-hidden cursor-pointer" style={{ backgroundColor: colors.base }}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span 
              className="text-xs font-bold uppercase tracking-widest border px-2 py-1 rounded-full text-white"
              style={{ borderColor: colors.soft }}
            >{category}</span>
            <span className="font-mono text-sm" style={{ color: colors.soft }}>{year}</span>
          </div>
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>
            <div 
              className="w-full h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"
              style={{ backgroundColor: colors.pop }}
            ></div>
            <div 
              className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"
              style={{ color: colors.pop }}
            >
              <span className="text-sm uppercase tracking-widest font-medium">View Case</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </ScrollFadeIn>
  );
};

const Work = () => {
  const projects = [
    { title: "Magentaverse", category: "Branding", year: "2023", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { title: "Purple Haze", category: "Web Design", year: "2023", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" },
    { title: "Rose Tower", category: "Architecture", year: "2022", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" },
    { title: "Future Funk", category: "Editorial", year: "2024", image: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=2668&auto=format&fit=crop" },
  ];

  return (
    <section id="work" className="py-24 text-white px-6" style={{ backgroundColor: colors.base }}>
      <div className="container mx-auto">
        <ScrollFadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Selected<br/><span style={{ color: colors.soft }}>Works</span></h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest transition-colors pb-2 border-b" style={{ color: colors.soft, borderColor: colors.deep }}
              onMouseOver={e => e.currentTarget.style.color = colors.pop}
              onMouseOut={e => e.currentTarget.style.color = colors.soft}
            >
              All Projects <ArrowUpRight size={16} />
            </button>
          </div>
        </ScrollFadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            // Pass index to ProjectCard for staggered animation delay
            <ProjectCard key={i} index={i} {...p} />
          ))}
        </div>
        
        <button className="md:hidden mt-12 w-full flex justify-center items-center gap-2 text-sm uppercase tracking-widest py-4 border hover:bg-white transition-colors"
          style={{ color: colors.soft, borderColor: colors.deep }}
          onMouseOver={e => { e.currentTarget.style.backgroundColor = colors.pop; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = colors.pop; }}
          onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.soft; e.currentTarget.style.borderColor = colors.deep; }}
        >
            All Projects <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
};

const ServiceItem = ({ title, description, icon: Icon, index }) => {
  return (
    <ScrollFadeIn delay={index * 100} threshold={0.3}>
      <div className="group transition-colors duration-300" style={{ borderTop: `1px solid ${colors.deep}` }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = `${colors.deep}1A`} // 10% opacity
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-start gap-6 md:w-1/2">
              <span className="font-mono text-lg pt-1" style={{ color: colors.soft }}>0{index + 1}</span>
              <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4 text-white">
                      {title}
                      <Icon className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: colors.pop }} size={28} />
                  </h3>
                  <p className="leading-relaxed group-hover:text-white transition-colors" style={{ color: colors.soft }}>
                      {description}
                  </p>
              </div>
          </div>
          <div className="md:w-1/3 flex justify-end">
              <div 
                className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45"
                style={{ borderColor: colors.soft, color: colors.soft }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = colors.pop; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = colors.pop; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.soft; e.currentTarget.style.borderColor = colors.soft; }}
              >
                  <ArrowRight size={20} />
              </div>
          </div>
        </div>
      </div>
    </ScrollFadeIn>
  );
};

const Services = () => {
  const services = [
    { title: "Digital Strategy", description: "Defining your roadmap for digital transformation, ensuring every step aligns with your business goals.", icon: Globe },
    { title: "Brand Identity", description: "Crafting unique visual languages that resonate with your audience and stand the test of time.", icon: Palette },
    { title: "Development", description: "Robust, scalable, and high-performance technical solutions for web and mobile applications.", icon: Code },
    { title: "Marketing", description: "Data-driven campaigns that drive conversion and build lasting relationships with customers.", icon: Megaphone },
  ];

  return (
    <section id="services" className="text-white py-24" style={{ backgroundColor: colors.base }}>
      <div className="container mx-auto px-6 mb-16">
        <ScrollFadeIn>
           <span 
             className="uppercase tracking-widest text-sm font-bold mb-4 block"
             style={{ color: colors.soft }}
           >Our Expertise</span>
           <h2 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
              We build brands that define <span className="italic" style={{ color: colors.soft }}>culture</span>.
           </h2>
        </ScrollFadeIn>
      </div>
      <div style={{ borderBottom: `1px solid ${colors.deep}` }}>
        {services.map((s, i) => (
            // Pass index to ServiceItem for staggered animation delay
            <ServiceItem key={i} index={i} {...s} />
        ))}
      </div>
    </section>
  );
};

const Agency = () => {
    return (
        <section id="agency" className="py-24 px-6" style={{ backgroundColor: '#FDFBFC', color: colors.base }}>
            <div className="container mx-auto flex flex-col md:flex-row gap-16">
                <div className="md:w-1/2">
                    <div className="sticky top-32">
                        <ScrollFadeIn>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none uppercase">
                                The<br/>Agcy.
                            </h2>
                        </ScrollFadeIn>
                        <ScrollFadeIn delay={200}>
                            <p className="text-xl font-medium leading-relaxed max-w-md mb-8">
                                Timothe is a global creative agency. We merge art, technology, and strategy to create digital products that people love.
                            </p>
                        </ScrollFadeIn>
                        <ScrollFadeIn delay={400}>
                            <div className="flex gap-4">
                                <div 
                                className="w-32 h-32 rounded-full flex items-center justify-center font-bold text-center leading-tight text-xs uppercase p-4 rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer"
                                style={{ backgroundColor: colors.base, color: 'white' }}
                                >
                                    Est. <br/> 2019 <br/> NYC
                                </div>
                            </div>
                        </ScrollFadeIn>
                    </div>
                </div>
                <div className="md:w-1/2 flex flex-col gap-12">
                    <ScrollFadeIn threshold={0.1}>
                        <img 
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" 
                            alt="Office" 
                            className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </ScrollFadeIn>
                    <div className="grid grid-cols-2 gap-8">
                        <ScrollFadeIn delay={100} threshold={0.2}>
                            <div>
                                <h4 className="text-4xl font-bold mb-2" style={{ color: colors.deep }}>45+</h4>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Awards Won</p>
                            </div>
                        </ScrollFadeIn>
                        <ScrollFadeIn delay={200} threshold={0.2}>
                            <div>
                                <h4 className="text-4xl font-bold mb-2" style={{ color: colors.deep }}>120+</h4>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Projects</p>
                            </div>
                        </ScrollFadeIn>
                        <ScrollFadeIn delay={300} threshold={0.2}>
                            <div>
                                <h4 className="text-4xl font-bold mb-2" style={{ color: colors.deep }}>15</h4>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Global Partners</p>
                            </div>
                        </ScrollFadeIn>
                        <ScrollFadeIn delay={400} threshold={0.2}>
                            <div>
                                <h4 className="text-4xl font-bold mb-2" style={{ color: colors.deep }}>24/7</h4>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Support</p>
                            </div>
                        </ScrollFadeIn>
                    </div>
                    <ScrollFadeIn delay={500} threshold={0.1}>
                        <p className="text-lg leading-relaxed text-neutral-700">
                            We believe in the power of silence in a noisy world. Our designs are clean, purposeful, and impactful. We don't just make things look good; we make them work. Our team is a diverse collective of thinkers, dreamers, and doers.
                        </p>
                    </ScrollFadeIn>
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
  return (
    <footer id="contact" className="text-white pt-24 pb-12 px-6" style={{ backgroundColor: colors.base, borderTop: `1px solid ${colors.deep}` }}>
        <div className="container mx-auto">
          <ScrollFadeIn threshold={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                        Let's work<br/>together.
                    </h2>
                    <a 
                      href="mailto:hello@timothe.agency" 
                      className="text-2xl md:text-3xl pb-2 transition-all inline-flex items-center gap-4"
                      style={{ borderBottom: `2px solid ${colors.soft}`, color: colors.soft }}
                      onMouseOver={e => { e.currentTarget.style.color = colors.pop; e.currentTarget.style.borderBottomColor = colors.pop; }}
                      onMouseOut={e => { e.currentTarget.style.color = colors.soft; e.currentTarget.style.borderBottomColor = colors.soft; }}
                    >
                        hello@timothe.agency <ArrowRight />
                    </a>
                </div>
                <div className="flex flex-col justify-between">
                     <div className="grid grid-cols-2 gap-8 mb-12">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.soft }}>Socials</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>Twitter / X</a></li>
                                <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white transition-colors" style={{ color: colors.soft }}>Behance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.soft }}>Office</h4>
                            <address className="not-italic" style={{ color: colors.soft }}>
                                120 Broadway<br/>
                                New York, NY 10271<br/>
                                United States
                            </address>
                        </div>
                     </div>
                     <p style={{ color: colors.soft }} className="max-w-xs opacity-70">
                        Subscribe to our newsletter for updates on our latest projects and insights.
                     </p>
                </div>
            </div>
            </ScrollFadeIn>
            
            <div className="flex flex-col md:flex-row justify-between items-end pt-8" style={{ borderTop: `1px solid ${colors.deep}` }}>
                <span className="text-[12vw] leading-[0.8] font-black uppercase select-none pointer-events-none" style={{ color: `${colors.deep}40` }}> 
                    Timothe
                </span>
                <div className="flex justify-between w-full md:w-auto mt-8 md:mt-0 text-xs uppercase tracking-widest gap-8" style={{ color: colors.deep }}>
                    <span>© 2024 Timothe Agency</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}

// --- Main App Component ---

export default function TimotheAgencySite() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:text-black" style={{ backgroundColor: colors.base, color: 'white', selectionBackgroundColor: colors.pop }}>
        {/* Using <style> tag here to define global styles and animations, 
          which is cleaner than inline styles for keyframes.
        */}
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
            }
            .animate-marquee {
                animation: marquee 20s linear infinite;
            }
            .animate-marquee-reverse {
                animation: marquee-reverse 20s linear infinite;
            }
            html {
                scroll-behavior: smooth;
            }
            body {
                cursor: none;
            }
            @media (max-width: 768px) {
                body {
                    cursor: auto;
                }
            }
        `}} />

        <CustomCursor />
        <Navigation isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
        
        <main>
            <Hero />
            <Intro /> 
            <Marquee text="Strategy — Design — Culture — Future" />
            <Work />
            <Services />
            <Marquee text="Create — Inspire — Disrupt — Evolve" reverse={true} />
            <Agency />
        </main>
        
        <Footer />
    </div>
  );
}