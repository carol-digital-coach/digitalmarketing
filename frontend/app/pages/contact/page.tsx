"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormData {
    name: string;
    email: string;
    service: string;
    message: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        service: '1-on-1 Coaching',
        message: '',
    });

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "What exactly does a Digital Coach do?",
            answer: "As your digital coach, I help you navigate the complex world of online branding, social media strategy, and digital tool integration to scale your personal or business brand efficiently."
        },
        {
            question: "Do you offer custom coaching packages?",
            answer: "Absolutely! While I have standard programs, I can tailor a strategy specifically to your current tech stack and growth goals."
        },
        {
            question: "How soon can we start?",
            answer: "Typically, after you send this message, I'll reach out within 24-48 hours to schedule a discovery call. We can usually kick off within 1-2 weeks."
        }
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(`Thanks for reaching out! Carol will contact you soon.`);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#180A0A] text-white font-sans selection:bg-[#F10086]">
            <div className="max-w-7xl mx-auto py-20 px-6">

                <header className="text-center mb-20 p-4">
                    <h1 className="overflow-hidden p-4 flex flex-col md:flex-row items-center justify-center gap-3 text-4xl md:text-6xl text-white font-black uppercase tracking-tighter italic oveflow-hidden">
                        <span className="text-[#F10086] overflow-hidden px-4">Start</span>
                        <span className="relative inline-block bg-[var(--site-pink)] text-[#180A0A] p-2 transform -rotate-1 shadow-[10px_10px_10px_0px_var(--site-purple)] overflow-hidden">
                            your transformation
                        </span>
                    </h1>

                    <p className="mt-8 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Ready to master your digital presence? Stop guessing and start growing.
                        Send a message to kickstart your journey today.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <div className="space-y-12">

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="bg-[#711A75] p-4 rounded-2xl group-hover:bg-[#F10086] transition-colors">
                                    <Mail size={28} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-[#F582A7] text-sm font-bold uppercase tracking-tighter">Email Me</h4>
                                    <p className="text-2xl font-semibold">carol@caroldigitalmarketing.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="bg-[#711A75] p-4 rounded-2xl group-hover:bg-[#F10086] transition-colors">
                                    <MessageSquare size={28} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-[#F582A7] text-sm font-bold uppercase tracking-tighter">Work Hours</h4>
                                    <p className="text-2xl font-semibold">Mon — Fri, 7am - 8pm</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="bg-[#711A75] p-4 rounded-2xl group-hover:bg-[#F10086] transition-colors">
                                    <Phone size={28} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-[#F582A7] text-sm font-bold uppercase tracking-tighter">Contact</h4>
                                    <p className="text-2xl font-semibold">0704197466</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--site-purple)]/20 p-8 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-6 text-[var(--site-pink)]">Common Questions</h3>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-[#711A75]/30 pb-4">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            className="w-full text-[var(--site-light-pink)] flex justify-between items-center text-left font-semibold text-lg hover:text-[var(--site-light-pink)] transition-colors"
                                        >
                                            {faq.question}
                                            {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        {openFaq === index && (
                                            <p className="mt-3 text-white leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Glassmorphism Form */}
                    <div className="bg-[#711A75]/20 p-10 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#F582A7] uppercase mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-[var(--site-black)]/50 text-white px-5 py-4 outline-none transition border border-white/50 rounded-md"
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#F582A7] uppercase mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-[var(--site-black)]/50 text-white px-5 py-4 outline-none transition border border-white/50 rounded-md"
                                    placeholder="name@email.com"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div>
                <label className="block text-sm font-bold text-[#F582A7] uppercase mb-2">Interested In</label>
                <select
                  name="service"
                  className="w-full bg-[var(--site-black)]/50 text-white px-5 py-4 outline-none transition appearance-none"
                  onChange={handleChange}
                >
                  <option>1-on-1 Coaching</option>
                  <option>Digital Audit</option>
                  <option>Social Media Strategy</option>
                  <option>Group Workshops</option>
                </select>
              </div> */}

                            <div>
                                <label className="block text-sm font-bold text-[#F582A7] uppercase mb-2">How can I help you?</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-[var(--site-black)] text-white px-5 py-4 outline-none transition border border-white/50 rounded-md"
                                    placeholder="Describe your goals..."
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-16 bg-[var(--site-purple)] hover:bg-[var(--site-purple)]/50 text-white font-black py-5 rounded-xl flex items-center justify-center gap-2 hover:cursor-pointer"
                                disabled={true}
                            >
                                BOOK MY DISCOVERY CALL <Send size={20} />
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactPage;