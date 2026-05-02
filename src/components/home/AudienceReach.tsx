"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Counter, cn } from '@/components/ui';
import dynamic from 'next/dynamic';

const InteractiveGlobe = dynamic(() => import('./InteractiveGlobe').then(mod => mod.InteractiveGlobe), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/10 animate-pulse rounded-3xl" />
});

const RegionCard = ({ region, reach, topMarkets }: { region: string; reach: number; topMarkets: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ translateY: -4 }}
            className="group"
        >
            <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-5 transition-all duration-300 group-hover:border-brand-orange/40 group-hover:shadow-[0_0_20px_rgba(255,88,0,0.1)]">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[#A0A0A0] text-sm font-medium uppercase tracking-wider">{region}</span>
                    <span className="text-2xl font-bold text-brand-orange">
                        <Counter value={reach} />%
                    </span>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] block">Top Markets</span>
                    <p className="text-xs text-slate-400 font-medium">{topMarkets}</p>
                </div>
            </div>
        </motion.div>
    );
};

const AudienceReach = () => {
    const geoData = [
        { region: 'India', reach: 95, topMarkets: 'Mumbai, Delhi, Bangalore' },
        { region: 'Southeast Asia', reach: 70, topMarkets: 'Indonesia, Vietnam, Thailand' },
        { region: 'Latin America', reach: 85, topMarkets: 'Brazil, Mexico, Argentina' },
        { region: 'Middle East', reach: 75, topMarkets: 'UAE, Saudi Arabia, Egypt' },
        { region: 'United States', reach: 90, topMarkets: 'New York, California, Texas' },
        { region: 'Europe', reach: 80, topMarkets: 'Germany, France, UK' },
    ];

    return (
        <section className="section-padding bg-[#050505] relative overflow-hidden">
            {/* Pulsing Grid Background */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-6">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Live Network</span>
                        </div>
                        <h2 className="font-display font-bold text-4xl md:text-6xl uppercase italic text-white leading-tight">
                            LIVE <span className="text-gradient">NETWORK</span>
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm md:text-base">Real-time global performance distribution across key markets.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">
                    {/* Visual Globe Column */}
                    <div className="lg:col-span-6 xl:col-span-7">
                        <div className="relative aspect-square md:aspect-video lg:aspect-square xl:aspect-video w-full rounded-3xl overflow-hidden bg-[#080808] border border-white/5">
                            <InteractiveGlobe />
                            {/* Overlay to ensure no text/clutter on globe as requested */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>

                    {/* Region Performance Grid Column */}
                    <div className="lg:col-span-6 xl:col-span-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {geoData.map((geo) => (
                                <RegionCard key={geo.region} {...geo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AudienceReach;
