"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';

const AdFormats = () => {
    const formats = [
        { title: "Interstitial Ads", desc: "Full-screen placements for maximum impact.", type: "Display" },
        { title: "Native Ads", desc: "Seamless integration within app content.", type: "Content" },
        { title: "Banner Ads", desc: "Classic visibility across top publishers.", type: "Display" },
        { title: "Rewarded Video", desc: "Value-driven ads that foster loyalty.", type: "Engagement" },
        { title: "Push Notification", icon: "Bell", desc: "Direct-to-user real-time alerts.", type: "Direct" },
        { title: "In-App Video", desc: "High-engagement cinematic experiences.", type: "Video" },
        { title: "Playable Ads", desc: "Interactive demos to drive quality users.", type: "Gaming" },
        { title: "Rich Media Ads", desc: "Dynamic, multi-format ad creative.", type: "Custom" }
    ];

    return (
        <section className="section-padding bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-brand-purple mb-4 block"
                        >
                            Creative Formats
                        </motion.span>
                        <h2 className="font-display font-bold text-4xl md:text-6xl uppercase italic text-white leading-tight">
                            High-Conversion <br />
                            <span className="text-gradient">Ad Formats</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 text-lg max-w-sm mb-2 italic">
                        Engaging users with the right format at the strategic moment.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {formats.map((format, idx) => (
                        <motion.div
                            key={format.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <GlassCard className="p-8 h-full border-white/5 bg-white/[0.02] hover:bg-brand-purple/5 transition-all duration-500 overflow-hidden group">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-purple mb-4 py-1 px-3 bg-brand-purple/10 inline-block rounded-full">
                                    {format.type}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{format.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-8">
                                    {format.desc}
                                </p>
                                
                                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 bg-brand-purple opacity-20"></div>
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 1.5, delay: idx * 0.1 }}
                                        className="h-full bg-brand-purple"
                                    />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdFormats;
