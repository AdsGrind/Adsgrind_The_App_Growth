"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Globe, ShieldCheck, Headphones, Zap, BarChart, UserCheck, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const WhyChooseUs = () => {
    const reasons = [
        { title: "Performance-Focused", icon: <Activity size={16} />, desc: "KPI-driven systems optimized for maximum verified ROI." },
        { title: "Global Network", icon: <Globe size={16} />, desc: "High-fidelity inventory access across all global GEOs." },
        { title: "Fraud Shield", icon: <ShieldCheck size={16} />, desc: "Multi-layer detection ensuring 100% human traffic quality." },
        { title: "Institutional Support", icon: <Headphones size={16} />, desc: "Expert account managers available around the clock." },
        { title: "Engineered Scale", icon: <Zap size={16} />, desc: "Built to handle rapid vertical scaling without efficiency loss." },
        { title: "Real-Time Intelligence", icon: <BarChart size={16} />, desc: "Live dashboards with sub-second performance insights." },
        { title: "Technical Expertise", icon: <UserCheck size={16} />, desc: "Technical marketers with decades of performance experience." },
        { title: "Global Standard", icon: <Trophy size={16} />, desc: "The partner of choice for top global app advertisers." }
    ];

    return (
        <section className="py-40 bg-[#000000] border-y border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-start gap-24">
                    <div className="lg:w-1/3 lg:sticky lg:top-32">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">Advantage</span>
                        <h2 className="font-display font-bold text-5xl md:text-7xl mb-10 uppercase text-white leading-[0.95] tracking-[-0.03em]">
                            Engineered<br />Excellence.
                        </h2>
                        <p className="text-white/40 text-xl mb-12 leading-relaxed">
                            Technical-first performance marketing. Every campaign is built on a foundation of quality, precision, and measurable scale.
                        </p>
                        <div className="h-px w-16 bg-white/20 mb-8" />
                        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                            Transparency and results are the pillars of our partner infrastructure.
                        </p>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10">
                        {reasons.map((reason, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className={cn(
                                    "p-10 transition-all duration-300 hover:bg-white/[0.03] group",
                                    idx % 2 === 0 && "sm:border-r border-white/10",
                                    idx < 6 && "border-b border-white/10",
                                    idx >= 6 && "border-b sm:border-b-0 border-white/10"
                                )}
                            >
                                <div className="w-8 h-8 border border-white/20 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black transition-all">
                                    {reason.icon}
                                </div>
                                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-widest">{reason.title}</h3>
                                <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-widest">{reason.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
