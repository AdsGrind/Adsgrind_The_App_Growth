"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, cn } from '@/components/ui';
import { 
    Smartphone, 
    Layout, 
    Target, 
    Share2, 
    Gift, 
    Briefcase, 
    Users, 
    Bell 
} from 'lucide-react';

const TrafficSources = () => {
    const sources = [
        { title: "Mobile Apps", icon: <Smartphone size={20} />, desc: "Direct in-app traffic from global partners." },
        { title: "Display Networks", icon: <Layout size={20} />, desc: "Broad reach across premium display ad networks." },
        { title: "Native Platforms", icon: <Target size={20} />, desc: "Engagement-driven ads that blend seamlessly." },
        { title: "Social Media", icon: <Share2 size={20} />, desc: "High-intent traffic from all major social platforms." },
        { title: "Incent & Non-Incent", icon: <Gift size={20} />, desc: "Tailored campaigns for diverse user motivations." },
        { title: "OEM Traffic", icon: <Briefcase size={20} />, desc: "Pre-installed app placements on top devices." },
        { title: "Influencer Traffic", icon: <Users size={20} />, desc: "Trusted endorsements that drive authentic growth." },
        { title: "Push Notification", icon: <Bell size={20} />, desc: "Real-time engagement directly on user screens." }
    ];

    return (
        <section className="bg-[#000000] border-y border-white/10 section-padding">
            <div className="container mx-auto px-6">
                <div className="mb-24">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block"
                    >
                        Channels & Inventory
                    </motion.span>
                    <h2 className="font-display font-bold text-5xl md:text-7xl mb-10 uppercase text-white tracking-[-0.03em] leading-none">
                        Premium<br />Traffic Access.
                    </h2>
                    <p className="text-white/40 text-xl max-w-2xl leading-relaxed">
                        Diverse mix of high-fidelity traffic sources ensuring precise audience reach at institutional scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
                    {sources.map((source, idx) => (
                        <motion.div
                            key={source.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className={cn(
                                "p-12 transition-all duration-300 hover:bg-white/[0.03] group",
                                (idx + 1) % 4 !== 0 && "lg:border-r border-white/10",
                                (idx + 1) % 2 !== 0 && "sm:border-r lg:border-r-0 border-white/10",
                                idx < 4 && "lg:border-b border-white/10",
                                idx < 6 && "sm:border-b lg:border-b-0 border-white/10",
                                "border-b sm:border-b-0 border-white/10"
                            )}
                        >
                            <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10 text-white group-hover:bg-white group-hover:text-black transition-all">
                                {source.icon}
                            </div>
                            <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-widest">{source.title}</h3>
                            <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-widest">
                                {source.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrafficSources;
