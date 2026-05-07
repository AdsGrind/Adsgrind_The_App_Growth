"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Smartphone, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Counter } from '@/components/ui';

const MarketOpportunity = () => {
    const opportunities = [
        { title: "Smartphone Users", numValue: 6.8, suffix: "B+", decimals: 1, icon: <Smartphone className="text-white" size={16} />, desc: "A massive, expanding pool of addressable users worldwide." },
        { title: "Competing Apps", numValue: 5, suffix: "M+", icon: <TrendingUp className="text-white" size={16} />, desc: "Cutting through the noise requires precision UA strategies." },
        { title: "Mobile Ad Spend", numValue: 350, prefix: "$", suffix: "B", icon: <DollarSign className="text-white" size={16} />, desc: "Digital budgets shifting rapidly toward mobile performance." },
        { title: "Performance Focus", numValue: 85, suffix: "%", icon: <Users className="text-white" size={16} />, desc: "Advertisers now prioritizing verified ROI over impressions." },
    ];

    return (
        <section className="bg-[#000000] border-y border-white/10 section-padding">
            <div className="container mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <div className="lg:w-1/2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">Intelligence</span>
                        <h2 className="font-display font-bold text-5xl md:text-7xl mb-10 leading-[0.95] text-white uppercase tracking-[-0.04em]">
                            The Mobile<br />Economy.
                        </h2>
                        <p className="text-white/50 text-xl mb-16 leading-relaxed max-w-xl">
                            Billions of users. Millions of competing apps. The demand for measurable, performance-focused user acquisition is an institutional necessity.
                        </p>

                        <div className="space-y-8">
                            {[
                                { label: "Smartphone Adoption Rate", value: 92 },
                                { label: "Average Time on Mobile", value: 78 },
                                { label: "Performance Spend Shift", value: 65 },
                            ].map((bar, i) => (
                                <div key={bar.label} className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                                        <span className="text-white/40">{bar.label}</span>
                                        <span className="text-white">
                                            <Counter value={bar.value} suffix="%" />
                                        </span>
                                    </div>
                                    <div className="h-px w-full bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${bar.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: i * 0.2, ease: [0.23, 1, 0.32, 1] }}
                                            className="h-full bg-white will-change-[width]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10">
                        {opportunities.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={cn(
                                    "p-10 hover:bg-white/[0.02] transition-colors",
                                    idx % 2 === 0 && "sm:border-r border-white/10",
                                    idx < 2 && "border-b border-white/10",
                                    idx >= 2 && "border-b sm:border-b-0 border-white/10"
                                )}
                            >
                                <div className="w-8 h-8 border border-white/20 flex items-center justify-center mb-8 text-white">
                                    {item.icon}
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">
                                    <Counter 
                                        value={item.numValue} 
                                        prefix={item.prefix} 
                                        suffix={item.suffix} 
                                        decimals={item.decimals} 
                                    />
                                </div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-white/40">{item.title}</h4>
                                <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-widest">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketOpportunity;
