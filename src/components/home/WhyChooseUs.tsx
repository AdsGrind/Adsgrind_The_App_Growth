"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
import { 
    Activity, 
    Globe, 
    ShieldCheck, 
    Headphones, 
    Zap, 
    BarChart, 
    UserCheck, 
    Trophy 
} from 'lucide-react';

const WhyChooseUs = () => {
    const reasons = [
        { title: "Performance-Focused", icon: <Activity />, desc: "KPI-driven campaigns optimized for maximum ROI." },
        { title: "Global Traffic", icon: <Globe />, desc: "Access to high-fidelity inventory across all global GEOs." },
        { title: "Fraud Detection", icon: <ShieldCheck />, desc: "Advanced monitoring to ensure 100% human traffic." },
        { title: "Dedicated Support", icon: <Headphones />, desc: "Expert account managers available around the clock." },
        { title: "Scalable Growth", icon: <Zap />, desc: "Infrastructures built to handle rapid vertical scaling." },
        { title: "Real-Time Reporting", icon: <BarChart />, desc: "Live dashboards for sub-second performance insights." },
        { title: "Experienced Managers", icon: <UserCheck />, desc: "Technical marketers with decades of performance experience." },
        { title: "Trusted Platform", icon: <Trophy />, desc: "The partner of choice for top global advertisers." }
    ];

    return (
        <section className="section-padding bg-transparent relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-20">
                    <div className="lg:w-1/3">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 block"
                        >
                            The Adsgrind Advantage
                        </motion.span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl mb-4 md:mb-8 uppercase italic text-white leading-tight">
                            Why <span className="text-gradient">Choose</span> Us
                        </h2>
                        <p className="text-slate-400 text-lg mb-4 md:mb-8">
                            We don't just deliver clicks; we deliver growth. Our technical-first approach to performance marketing ensures that every campaign is built on a foundation of quality and scale.
                        </p>
                        <div className="h-1 w-20 bg-brand-orange rounded-full mb-6 md:mb-8"></div>
                        <p className="text-slate-500 italic text-sm">
                            "Transparency and results are the pillars of our partnership model."
                        </p>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {reasons.map((reason, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0 group-hover:scale-110 transition-transform text-lg">
                                        {reason.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-1">{reason.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{reason.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
