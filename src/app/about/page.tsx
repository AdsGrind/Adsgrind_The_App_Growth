"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { GlassCard, Button, GrowthIndex, cn } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

const TEAM = [
  { name: "Alex Rivera", role: "Founder & CEO", image: "https://i.pravatar.cc/150?u=alex" },
  { name: "Jessica Bloom", role: "Head of Strategy", image: "https://i.pravatar.cc/150?u=jessica" },
  { name: "David Chen", role: "SEO Director", image: "https://i.pravatar.cc/150?u=david" },
  { name: "Sarah Miller", role: "Creative Lead", image: "https://i.pravatar.cc/150?u=sarah" },
];

const VALUES = [
  { title: "Precision", icon: <ShieldCheck className="text-white" />, desc: "We deploy verified, fraud-free user actions with aerospace-grade precision." },
  { title: "Intelligence", icon: <Eye className="text-white" />, desc: "Data-driven decisions backed by institutional attribution systems." },
  { title: "Authority", icon: <Target className="text-white" />, desc: "We drive measurable growth that defines market leadership." },
];

export default function AboutPage() {
  const { openGetStarted } = useModals();
  return (
    <div className="pt-32 pb-20 bg-[#000000] min-h-screen">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-48 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/20 pb-2">Institutional Profile</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-5xl md:text-8xl mb-12 leading-[0.95] text-white uppercase tracking-[-0.04em]"
          >
            Infrastructure For<br />
            <span className="text-white/40">Growth Scaling.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
          >
            ADSGRIND is a high-performance performance marketing infrastructure dedicated to bridging the gap between premium global brands and verified mobile inventories.
          </motion.p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 mb-48">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
             <div className="p-16 border-b md:border-b-0 md:border-r border-white/10 h-full hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10">
                    <Target className="text-white" size={20} />
                </div>
                <h2 className="text-[10px] font-bold mb-8 uppercase tracking-[0.4em] text-white/30">Mission Protocol</h2>
                <p className="text-white text-xl leading-relaxed uppercase tracking-tight font-bold mb-6">
                    Verified Global Scalability.
                </p>
                <p className="text-white/40 text-lg leading-relaxed">
                    To empower market leaders by providing a transparent, performance-driven marketplace that maximizes ROI through technical excellence.
                </p>
             </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
             <div className="p-16 h-full hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10">
                    <Eye className="text-white" size={20} />
                </div>
                <h2 className="text-[10px] font-bold mb-8 uppercase tracking-[0.4em] text-white/30">Vision Objective</h2>
                <p className="text-white text-xl leading-relaxed uppercase tracking-tight font-bold mb-6">
                    Redefining User Acquisition.
                </p>
                <p className="text-white/40 text-lg leading-relaxed">
                    To become the most trusted global partner for mobile growth through scalable architectures and fraud-free verified inventory.
                </p>
             </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-48">
            <div className="mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block">Verification Standards</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase text-white tracking-tight leading-none">Institutional Integrity.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                {VALUES.map((v, i) => (
                    <motion.div 
                        key={v.title}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          "p-16 hover:bg-white/[0.02] transition-colors",
                          i < 2 && "md:border-r border-white/10",
                          "border-b md:border-b-0 border-white/10"
                        )}
                    >
                        <div className="w-8 h-8 border border-white/20 flex items-center justify-center mb-8 text-white">
                            {v.icon}
                        </div>
                        <h3 className="text-xs font-bold mb-6 text-white uppercase tracking-[0.3em]">{v.title}</h3>
                        <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-widest">{v.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Scale Metrics */}
        <div className="mb-48">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block">Performance Index</span>
                <h2 className="text-4xl md:text-7xl font-bold uppercase text-white leading-none tracking-tighter">
                  Market Reach.<br />
                  <span className="text-white/40">Verified Scale.</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 border border-white/10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-0 border-b lg:border-b-0 lg:border-r border-white/10">
                    {[
                        { label: "Active Nodes", value: "100+", sub: "Global Brands" },
                        { label: "Inventory Access", value: "1000+", sub: "Direct Publishers" },
                        { label: "Monthly Output", value: "10M+", sub: "Verified Installs" },
                        { label: "Network Trust", value: "100%", sub: "Fraud Detection" }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className={cn(
                              "p-12 border-white/10",
                              i % 2 === 0 && "border-r",
                              i < 2 && "border-b"
                            )}
                        >
                            <div className="text-4xl font-bold text-white mb-4 tracking-tighter">
                                {stat.value}
                            </div>
                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                            <div className="text-[9px] text-white/20 uppercase tracking-[0.4em]">{stat.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Growth Visualization */}
                <div className="p-1">
                    <GrowthIndex className="border-0 h-full" />
                </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="border border-white/10 p-20 md:p-40 text-center hover:bg-white/[0.02] transition-colors duration-700 relative overflow-hidden group">
             <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-10 block">Protocol Initiation</span>
                <h2 className="text-5xl md:text-8xl font-bold mb-16 uppercase text-white tracking-[-0.04em] leading-none">Ready To Scale?</h2>
                <button 
                    className="px-20 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white/90" 
                    onClick={openGetStarted}
                >
                    Initiate Audit
                </button>
             </div>
             {/* Background decoration */}
             <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-white/20 transition-colors" />
             <div className="absolute bottom-0 right-0 w-full h-1 bg-white/5 group-hover:bg-white/20 transition-colors" />
        </div>
      </div>
    </div>
  );
}
