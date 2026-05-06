"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, cn, Counter } from '@/components/ui';
import { Target, BarChart, ShieldCheck, Clock } from 'lucide-react';

const CaseStudy = () => {
    return (
    <section className="py-40 bg-[#000000] border-y border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <div className="lg:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block"
                        >
                            Success Story
                        </motion.span>
                        <h2 className="font-display font-bold text-5xl md:text-7xl mb-12 uppercase leading-[0.95] text-white tracking-[-0.04em]">
                            Fintech<br />Scale Audit.
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-8 mb-16 border-l border-white/10 pl-8">
                            <div>
                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Region</div>
                                <div className="text-xl font-bold text-white uppercase tracking-tight">United States</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Sector</div>
                                <div className="text-xl font-bold text-white uppercase tracking-tight">Financial Technology</div>
                            </div>
                        </div>

                        <p className="text-white/40 text-xl mb-16 leading-relaxed max-w-xl">
                            A leading US Fintech institution required rapid user acquisition with strict performance thresholds. We deployed an engineered UA strategy focusing on high-intent data nodes.
                        </p>

                        <div className="grid grid-cols-1 gap-0 border border-white/10">
                            {[
                                { label: "Objective", value: "Verified User Acquisition", icon: <Target className="text-white" size={16} /> },
                                { label: "Duration", value: "30 Days Intensive Scale", icon: <Clock className="text-white" size={16} /> },
                                { label: "Audit", value: "Fraud-Protected Traffic", icon: <ShieldCheck className="text-white" size={16} /> },
                            ].map((item, i) => (
                                <div key={i} className={cn(
                                    "flex items-center gap-6 p-8",
                                    i < 2 && "border-b border-white/10"
                                )}>
                                    <div className="w-8 h-8 border border-white/20 flex items-center justify-center text-white">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-1">{item.label}</div>
                                        <div className="text-[11px] font-bold text-white uppercase tracking-widest">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-12 border border-white/20 bg-white/[0.02] relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white">Performance Metrics</h3>
                                    <BarChart className="text-white/20" size={20} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Conversions</div>
                                        <div className="text-6xl font-bold text-white tracking-tighter">
                                            <Counter value={38.4} decimals={1} suffix="K" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Efficiency</div>
                                        <div className="text-6xl font-bold text-white tracking-tighter">
                                            <Counter value={4.8} decimals={1} suffix="%" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Cost Analysis</div>
                                        <div className="text-6xl font-bold text-white tracking-tighter">
                                            <Counter value={4.20} decimals={2} prefix="$" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Target Delta</div>
                                        <div className="text-6xl font-bold text-white tracking-tighter">ROI</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudy;
