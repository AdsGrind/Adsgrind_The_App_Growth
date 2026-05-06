"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui';

const AdFormats = () => {
    const formats = [
        { title: "Interstitial Ads", desc: "Full-screen placements for maximum impact.", type: "Display" },
        { title: "Native Ads", desc: "Seamless integration within app content.", type: "Content" },
        { title: "Banner Ads", desc: "Classic visibility across top publishers.", type: "Display" },
        { title: "Rewarded Video", desc: "Value-driven ads that foster loyalty.", type: "Engagement" },
        { title: "Push Notification", desc: "Direct-to-user real-time alerts.", type: "Direct" },
        { title: "In-App Video", desc: "High-engagement cinematic experiences.", type: "Video" },
        { title: "Playable Ads", desc: "Interactive demos to drive quality users.", type: "Gaming" },
        { title: "Rich Media Ads", desc: "Dynamic, multi-format ad creative.", type: "Custom" }
    ];

    return (
        <section className="py-40 bg-[#000000]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block"
                        >
                            Creative Formats
                        </motion.span>
                        <h2 className="font-display font-bold text-5xl md:text-7xl uppercase text-white leading-none tracking-[-0.03em]">
                            Engineered<br />Ad Delivery.
                        </h2>
                    </div>
                    <p className="text-white/40 text-xl max-w-sm mb-2 uppercase tracking-widest leading-relaxed">
                        Precision creative execution for global scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
                    {formats.map((format, idx) => (
                        <motion.div
                            key={format.title}
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
                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-6 py-1 px-3 border border-white/10 inline-block">
                                {format.type}
                            </div>
                            <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-widest">{format.title}</h3>
                            <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-widest mb-10">
                                {format.desc}
                            </p>
                            
                            <div className="relative h-px w-full bg-white/10 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1.5, delay: idx * 0.1 }}
                                    className="h-full bg-white"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdFormats;
