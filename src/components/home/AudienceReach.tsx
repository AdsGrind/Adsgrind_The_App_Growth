"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui';
import dynamic from 'next/dynamic';

const InteractiveGlobe = dynamic(() => import('./InteractiveGlobe').then(mod => mod.InteractiveGlobe), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/10 animate-pulse rounded-3xl" />
});

const AudienceReach = () => {
    const geoData = [
        { region: 'India', reach: 95 },
        { region: 'Southeast Asia', reach: 88 },
        { region: 'Middle East', reach: 82 },
        { region: 'Europe', reach: 75 },
        { region: 'United States', reach: 85 },
        { region: 'Latin America', reach: 70 },
    ];

    const deviceData = [
        { type: 'iOS', value: 55, color: '#EE1D23' },
        { type: 'Android', value: 45, color: '#9D50BB' },
    ];

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Pulsing Grid Background for the Map Area */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-24 max-w-3xl mx-auto relative z-10">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 block"
                    >
                        Global Reach
                    </motion.span>
                    <h2 className="font-display font-bold text-4xl md:text-6xl uppercase italic text-white leading-[1.1]">
                        Audience <span className="text-gradient">Scale</span> & Distribution
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* 3D Global Reach Visual */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="relative aspect-video w-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden group">
                            <InteractiveGlobe />

                            <div className="absolute top-6 left-6 z-10">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">Global Coverage</div>
                                <div className="text-xl font-display font-bold text-white italic">LIVE NETWORK</div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 md:grid-cols-6 gap-4">
                                {geoData.map((geo, i) => (
                                    <motion.div
                                        key={geo.region}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{geo.region}</div>
                                        <div className="text-lg font-bold text-brand-orange">{geo.reach}%</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Device Distribution */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                        <GlassCard className="p-10 border-white/5">
                            <h3 className="text-xl font-bold mb-10 uppercase tracking-wider">Device Distribution</h3>
                            <div className="space-y-12">
                                {deviceData.map((dev, i) => (
                                    <div key={dev.type} className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-2xl font-display font-bold italic">{dev.type}</span>
                                            <span className="text-3xl font-black text-gradient">{dev.value}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${dev.value}%` }}
                                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                                className="h-full"
                                                style={{ backgroundColor: dev.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <div className="p-8 rounded-3xl border border-dashed border-white/10 text-center italic text-sm text-slate-500">
                            "Deep penetration across all major mobile OS versions and global network operators."
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AudienceReach;
