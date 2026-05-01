"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
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
        { title: "Mobile Apps", icon: <Smartphone />, desc: "Direct in-app traffic from global partners." },
        { title: "Display Networks", icon: <Layout />, desc: "Broad reach across premium display ad networks." },
        { title: "Native Platforms", icon: <Target />, desc: "Engagement-driven ads that blend seamlessly." },
        { title: "Social Media", icon: <Share2 />, desc: "High-intent traffic from all major social platforms." },
        { title: "Incent & Non-Incent", icon: <Gift />, desc: "Tailored campaigns for diverse user motivations." },
        { title: "OEM Traffic", icon: <Briefcase />, desc: "Pre-installed app placements on top devices." },
        { title: "Influencer Traffic", icon: <Users />, desc: "Trusted endorsements that drive authentic growth." },
        { title: "Push Notification", icon: <Bell />, desc: "Real-time engagement directly on user screens." }
    ];

    return (
        <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[150px] rounded-full -z-10"></div>
            
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block"
                    >
                        Channels & Inventory
                    </motion.span>
                    <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 uppercase italic text-white">
                        Premium <span className="text-gradient">Traffic</span> Sources
                    </h2>
                    <p className="text-slate-400 text-lg">
                        We leverage a diverse mix of high-fidelity traffic sources to ensure your app reaches the right audience at the right time.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sources.map((source, idx) => (
                        <motion.div
                            key={source.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <GlassCard className="p-8 h-full border-white/5 hover:border-brand-red/30 transition-all duration-500 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500 text-2xl">
                                    {source.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{source.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {source.desc}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrafficSources;
