import React from 'react';
import { 
  Target, 
  Megaphone, 
  Users, 
  Video, 
  Search, 
  PenTool, 
  ArrowRight 
} from 'lucide-react';

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
    <section className="w-full min-h-screen bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 space-y-4 overflow-y-hidden">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight overflow-y-hidden">
            What I Do Best
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Transforming Digital Dreams To Reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-[var(--site-purple)]/80 rounded-lg border border-gray-100 hover:border-none hover:bg-[var(--site-pink)]/60 hover:shadow-md hover:cursor-pointer transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-white leading-relaxed mb-6 hover:text-white">
                {service.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
              
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-gray-200 to-transparent opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-1 rounded-full bg-gray-100">
            <button className="px-8 py-4 bg-[var(--site-black)] text-white text-lg font-semibold rounded-full hover:bg-[var(--site-pink)] transition-colors duration-300 shadow-sm hover:cursor-pointer flex items-center gap-2 mx-auto">
              Let's Scale Your Business
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Not sure where to start? <a href="#" className="text-black underline hover:text-black">Book a free discovery call.</a>
          </p>
        </div>

      </div>
    </section>
  );
}