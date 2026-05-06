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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="bg-[#000000] border border-white/10 p-8 transition-all duration-300 group-hover:bg-white/[0.03]">
                <div className="flex justify-between items-start mb-6">
                    <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">{region}</span>
                    <span className="text-3xl font-bold text-white tracking-tighter">
                        <Counter value={reach} suffix="%" />
                    </span>
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block mb-2">Market Hubs</span>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">{topMarkets}</p>
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
        <section className="py-40 bg-[#000000] border-y border-white/10">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Global Distribution</span>
                    </div>
                    <h2 className="font-display font-bold text-5xl md:text-7xl uppercase text-white tracking-[-0.03em] leading-none">
                        Live Network.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
                    {/* Visual Globe Column */}
                    <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="relative aspect-square w-full bg-[#000000] flex items-center justify-center p-12">
                            <InteractiveGlobe />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Region Performance Grid Column */}
                    <div className="lg:col-span-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                            {geoData.map((geo, idx) => (
                                <div key={geo.region} className={cn(
                                    idx % 2 === 0 && "sm:border-r border-white/10",
                                    idx < 4 && "border-b border-white/10",
                                    idx >= 4 && "border-b sm:border-b-0 border-white/10"
                                )}>
                                    <RegionCard {...geo} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AudienceReach;
