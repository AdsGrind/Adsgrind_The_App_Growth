"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
import { Target, BarChart, ShieldCheck, Clock } from 'lucide-react';

const CaseStudy = () => {
    return (
    <section className="py-32 bg-[#080d1a] transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block"
                        >
                            Success Story
                        </motion.span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 uppercase italic leading-tight text-white">
                            Fintech <span className="text-gradient">CPA</span> Hero
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">GEO</div>
                                <div className="text-xl font-bold text-white">United States</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Industry</div>
                                <div className="text-xl font-bold text-white">Fintech</div>
                            </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                            A leading US Fintech app needed to scale its high-quality user base with strict CPA constraints. We implemented a multi-channel acquisition strategy focusing on high-intent Native and Video traffic.
                        </p>

                        <div className="space-y-6">
                            {[
                                { label: "Objective", value: "Verified High-Quality Users", icon: <Target className="text-brand-red" size={20} /> },
                                { label: "Campaign Duration", value: "30 Days Intensive Scale", icon: <Clock className="text-brand-orange" size={20} /> },
                                { label: "Traffic Quality", value: "Fraud-Protected Human Traffic", icon: <ShieldCheck className="text-brand-success" size={20} /> },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                                        <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        {/* Results Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            className="relative z-10"
                        >
                            <GlassCard className="p-12 border-brand-red/20 shadow-2xl relative overflow-hidden bg-slate-900/80">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[80px] rounded-full -z-10"></div>
                                
                                <h3 className="text-2xl font-bold mb-10 border-b border-slate-200 dark:border-white/10 pb-6 uppercase tracking-widest flex items-center justify-between">
                                    Final Campaign Results
                                    <BarChart className="text-brand-red" />
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                    <div className="space-y-2">
                                        <div className="text-5xl font-black text-brand-red">38K+</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Conversions</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-5xl font-black text-brand-orange">4.8%</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Conversion Rate</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-5xl font-black text-brand-purple">$4.20</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Average CPA</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-5xl font-black text-brand-success">ROI</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Scaled Stability</div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                        
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/20 blur-[60px] rounded-full"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-purple/20 blur-[100px] rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudy;
