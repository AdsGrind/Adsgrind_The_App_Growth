"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { GlassCard, cn } from '@/components/ui';

const FAQ_DATA = [
    {
        question: "How do advertiser campaigns work?",
        answer: "We work on a performance basis (CPI/CPA). Advertisers provide the app/offer, define target KPIs, and we leverage our global publisher network to drive high-quality installs and actions."
    },
    {
        question: "What traffic sources are supported?",
        answer: "We support a wide range of channels including Direct In-App inventory, Display Networks, Social Media, OEM (Pre-installs), Native Ads, and Influencer traffic."
    },
    {
        question: "How are publishers paid?",
        answer: "Publishers are provided with competitive Payouts via Wire, PayPal, or USDT. We offer a low minimum threshold to ensure steady cash flow for our partners."
    },
    {
        question: "What countries do you support?",
        answer: "ADSGRIND has global coverage. Our strongest regions include India, Southeast Asia (SEA), Middle East, Europe, United States, and Latin America."
    },
    {
        question: "How do you ensure traffic quality?",
        answer: "We use a multi-layered fraud detection system and manual traffic monitoring. Every impression and click is analyzed in real-time to filter out bot traffic and ensure high user LTV."
    },
    {
        question: "What is the minimum campaign budget?",
        answer: "We work with clients of all scales, but typically recommend a starting budget that allows for sufficient data collection and optimization (usually $1,000+)."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-40 bg-[#000000] border-y border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-24">
                    <div className="lg:w-1/3">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block"
                        >
                            Assistance
                        </motion.span>
                        <h2 className="font-display font-bold text-5xl md:text-7xl mb-10 uppercase text-white leading-[0.95] tracking-[-0.03em]">
                            Global<br />Queries.
                        </h2>
                        <p className="text-white/40 text-xl leading-relaxed">
                            Infrastructure deployment and performance standards. Still have questions? Reach out to our technical team.
                        </p>
                    </div>

                    <div className="lg:w-2/3 border border-white/10">
                        {FAQ_DATA.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={cn(
                                    "border-white/10",
                                    idx < FAQ_DATA.length - 1 && "border-b"
                                )}
                            >
                                <button 
                                    className="w-full p-8 text-left flex items-center justify-between group transition-colors hover:bg-white/[0.02]"
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                >
                                    <span className={cn(
                                        "text-sm font-bold uppercase tracking-widest transition-colors",
                                        openIndex === idx ? "text-white" : "text-white/40 group-hover:text-white/70"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <div className={cn(
                                        "w-8 h-8 border border-white/10 flex items-center justify-center transition-all",
                                        openIndex === idx ? "bg-white text-black border-transparent" : "text-white/20 group-hover:text-white/50"
                                    )}>
                                        {openIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-10 text-[11px] text-white/30 uppercase tracking-widest leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
