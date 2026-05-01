"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
import { TrendingUp, Smartphone, Users, DollarSign } from 'lucide-react';

const MarketOpportunity = () => {
    const opportunities = [
        { 
          title: "Billion Smartphone Users", 
          value: "6.8", 
          suffix: "B+", 
          icon: <Smartphone className="text-brand-orange" />,
          desc: "A massive, expanding pool of potential users worldwide."
        },
        { 
          title: "Competing Apps", 
          value: "5", 
          suffix: "M+", 
          icon: <TrendingUp className="text-brand-red" />,
          desc: "Cutting through the noise requires expert UA strategies."
        },
        { 
          title: "Rising Ad Budgets", 
          value: "350", 
          suffix: "B", 
          icon: <DollarSign className="text-brand-purple" />,
          desc: "Digital spend is shifting rapidly towards mobile performance."
        },
        { 
          title: "Performance Focus", 
          value: "85", 
          suffix: "%", 
          icon: <Users className="text-brand-success" />,
          desc: "Advertisers are prioritizing ROI over pure impressions."
        }
    ];

    return (
        <section className="py-32 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 block"
                        >
                            Market Opportunity
                        </motion.span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 leading-tight text-white uppercase italic">
                            The Mobile <span className="text-gradient">Explosion</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                            The mobile landscape is evolving at a breakneck pace. With billions of users and millions of competing apps, the demand for measurable, performance-focused marketing has never been higher.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { label: "Smartphone Adoption", value: 92 },
                                { label: "Average Time on Mobile", value: 78 },
                                { label: "Performance Spend Shift", value: 65 }
                            ].map((bar, i) => (
                                <div key={bar.label} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                                        <span className="text-slate-300">{bar.label}</span>
                                        <span className="text-brand-orange">{bar.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${bar.value}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.2 }}
                                            className="h-full bg-gradient-to-r from-brand-red to-brand-orange"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {opportunities.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <GlassCard className="h-full p-8 border-white/5 hover:border-white/20 transition-all duration-500">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                        {item.icon}
                                    </div>
                                    <div className="text-3xl font-bold mb-2 flex items-baseline gap-1">
                                        {item.value}
                                        <span className="text-lg text-slate-500">{item.suffix}</span>
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">{item.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed italic">{item.desc}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketOpportunity;
