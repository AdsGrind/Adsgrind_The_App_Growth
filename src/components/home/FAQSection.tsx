"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { GlassCard } from '@/components/ui';

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
        answer: "Adsgrind has global coverage. Our strongest regions include India, Southeast Asia (SEA), Middle East, Europe, United States, and Latin America."
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
        <section className="section-padding bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
                    <div className="lg:w-1/3">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-brand-purple mb-4 block"
                        >
                            Got Questions?
                        </motion.span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl mb-4 md:mb-8 uppercase italic text-white leading-tight">
                            Frequently Asked <br />
                            <span className="text-gradient">Questions</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-4 md:mb-8">
                            Everything you need to know about scaling your app growth with Adsgrind. Still have questions? Reach out to our team.
                        </p>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                        {FAQ_DATA.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <GlassCard 
                                    className={`p-0 overflow-hidden border-white/5 transition-all duration-300 ${openIndex === idx ? 'border-brand-purple/30 bg-brand-purple/5' : 'hover:border-white/10'}`}
                                >
                                    <button 
                                        className="w-full p-4 md:p-6 text-left flex items-center justify-between"
                                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    >
                                        <span className={`text-lg font-bold transition-colors ${openIndex === idx ? 'text-brand-purple' : 'text-slate-200'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openIndex === idx ? 'rotate-180 bg-brand-purple border-transparent text-white' : 'text-slate-500'}`}>
                                            {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
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
                                                <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
