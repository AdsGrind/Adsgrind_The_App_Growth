"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, ShieldCheck, TrendingUp, BarChart3, Globe2, Activity, Zap, Shield, Cpu, ArrowUpRight } from 'lucide-react';
import { Button, Counter } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

const VALUES = [
  { 
    title: "Zero-Fraud Infrastructure", 
    icon: <ShieldCheck size={20} />, 
    desc: "Military-grade detection blocking 99.8% of bot traffic before it hits your budget." 
  },
  { 
    title: "Institutional Intelligence", 
    icon: <BarChart3 size={20} />, 
    desc: "Every campaign is backed by granular attribution data and real-time optimization." 
  },
  { 
    title: "Global Scalability", 
    icon: <Globe2 size={20} />, 
    desc: "Direct access to 500+ premium publisher nodes across 20+ Tier-1 & Tier-2 GEOs." 
  },
];

const PerformanceIntelligenceDashboard = () => {
  return (
    <div className="relative bg-surface-3 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-orange-glow p-1">
      {/* Header */}
      <div className="bg-black/40 p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-500/30" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
            <div className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
          <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest ml-2 truncate">
            <span className="sm:hidden">CORE INTEL v9.1</span>
            <span className="hidden sm:inline">CORE_PERF_INTEL_v9.1</span>
          </span>
        </div>
        <div className="px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex-shrink-0">
           <span className="text-[8px] text-brand-orange font-bold uppercase tracking-widest animate-pulse">Live Optimization</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-brand-orange/30 transition-all flex justify-between items-center sm:block">
            <div className="flex flex-col sm:block">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-brand-orange" />
                <span className="text-[8px] text-green-500 font-bold">+18.4%</span>
              </div>
              <div className="text-xl sm:text-lg font-bold text-white tracking-tight">4.82x</div>
              <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mt-1">Target ROAS</div>
            </div>
            <ArrowUpRight size={18} className="text-brand-orange opacity-40 sm:hidden" />
          </div>
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-brand-orange/30 transition-all flex justify-between items-center sm:block">
            <div className="flex flex-col sm:block">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-brand-orange" />
                <span className="text-[8px] text-brand-orange font-bold">Active</span>
              </div>
              <div className="text-xl sm:text-lg font-bold text-white tracking-tight">99.8%</div>
              <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mt-1">Fraud Filter</div>
            </div>
            <ShieldCheck size={18} className="text-brand-orange opacity-40 sm:hidden" />
          </div>
        </div>

        {/* Dynamic Scale Graph */}
        <div className="relative h-48 sm:h-52 bg-black/20 rounded-2xl border border-white/5 flex items-end gap-1.5 px-4 pb-4 overflow-hidden group/chart">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/5 to-transparent pointer-events-none" />
          
          {/* Chart Label - Positioned for no overlap */}
          <div className="absolute top-4 left-4 z-10">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Throughput Index</span>
             </div>
             <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">4.2M Ops/Sec</div>
          </div>

          {[30, 50, 45, 85, 60, 95, 75, 88, 65, 92].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h * 0.7}%` }}
              transition={{ delay: i * 0.05 + 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 bg-brand-orange/20 rounded-t-sm relative group/bar will-change-[height]"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-brand-orange shadow-[0_0_10px_#FF6B00] group-hover/bar:bg-white transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Status Log */}
        <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/5">
           {[
             { label: "GEO_US_NODE", status: "Scaling", time: "2ms" },
             { label: "FRAUD_SHIELD", status: "Active", time: "Real-time" }
           ].map((log, i) => (
             <div key={i} className="flex items-center justify-between group/log">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_5px_#FF6B00]" />
                   <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest group-hover/log:text-white transition-colors">{log.label}</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[9px] text-green-500 font-bold uppercase">{log.status}</span>
                   <span className="text-[9px] text-white/20 font-mono">{log.time}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const { openGetStarted } = useModals();
  
  return (
    <main className="bg-black min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] inline-block">
              Institutional Profile
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-8xl mb-8 leading-[0.95] text-white uppercase tracking-tight"
          >
            Built for Performance.<br />
            <span className="text-white/40 font-light italic">Backed by Data.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Adsgrind is an elite performance marketing infrastructure dedicated to solving the most critical bottlenecks in mobile app growth.
          </motion.p>
        </div>

        {/* The Why (Story) Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-48 items-center">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-surface-2 group"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-grid opacity-10" />
              
              {/* Abstract Operational Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    <div className="w-64 h-64 border border-brand-orange/10 rounded-full animate-spin-slow" />
                    <div className="absolute inset-0 border border-white/5 rounded-full rotate-45" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Target size={80} className="text-brand-orange/20" />
                    </div>
                 </div>
              </div>
              
              {/* Floating Pulse Points */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-orange rounded-full shadow-orange-glow"
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full"
              />
           </motion.div>
           <div>
              <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">The Mission</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tight leading-none">Solving the<br />Growth Gap.</h2>
              <div className="space-y-6 text-white/50 text-lg leading-relaxed">
                <p>
                  The mobile advertising industry is plagued by low-quality installs, wasted budgets, and sophisticated ad fraud. Generic agencies focus on vanity metrics; we focus on unit economics.
                </p>
                <p>
                  Adsgrind was founded to bridge the gap between massive ad spend and actual revenue. We don't just deliver traffic—we engineer scalable ROI machines that turn users into high-LTV assets.
                </p>
              </div>
           </div>
        </div>

        {/* Founder Section - UPGRADED WITH DASHBOARD */}
        <section className="mb-48 bg-surface-2 border border-white/5 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[50%] h-full bg-brand-orange/5 blur-[120px] rounded-full translate-x-1/2" />
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                 <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">The Leadership</span>
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">Rohit Yadav</h2>
                 <p className="text-brand-orange text-sm font-bold uppercase tracking-widest mb-8">Founder & Chief Performance Officer</p>
                 <div className="space-y-6 text-white/50 text-lg mb-12">
                    <p>
                      With nearly a decade of experience in the global performance marketing ecosystem, Rohit has scaled campaigns for major fintech hubs, gaming studios, and AI enterprises across 20+ countries.
                    </p>
                    <p>
                      His philosophy is simple: <span className="text-white">"We don't sell traffic. We scale revenue."</span> Every campaign under his leadership is audited for zero fraud and optimized for maximum LTV.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-12 py-10 border-t border-white/10">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1"><Counter value={538} />K+</div>
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Installs Delivered</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1"><Counter value={42} />%</div>
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Avg CAC Reduction</div>
                    </div>
                 </div>
              </div>
              
              <div className="relative group">
                 <PerformanceIntelligenceDashboard />
                 {/* Floating Badge */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 6 }}
                   className="absolute -top-10 -right-10 hidden xl:flex flex-col items-center justify-center w-32 h-32 bg-brand-orange text-black rounded-full shadow-orange-glow z-20"
                 >
                    <Zap size={24} className="mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-center">ROI<br/>Engineered</span>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* Philosophy & Proof */}
        <div className="mb-48">
            <div className="text-center mb-24">
              <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our DNA</span>
              <h2 className="text-4xl md:text-7xl font-bold uppercase text-white tracking-tight leading-none">Institutional Integrity.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((v, i) => (
                    <motion.div 
                        key={v.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 bg-surface-2 border border-white/5 rounded-3xl hover:bg-surface-3 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8 text-brand-orange group-hover:scale-110 transition-transform">
                            {v.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-tight">{v.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Scale Metrics */}
        <div className="mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                  <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">The Edge</span>
                  <h2 className="text-4xl md:text-6xl font-bold uppercase text-white leading-none tracking-tight mb-8">
                    Market Reach.<br />
                    <span className="text-white/40">Verified Scale.</span>
                  </h2>
                  <p className="text-white/50 text-lg mb-12">
                    Our performance index is built on a decade of proprietary data and direct relationships with the world's most high-quality publisher nodes.
                  </p>
                  <div className="grid grid-cols-2 gap-10">
                    {[
                        { label: "Active Brands", value: 100, suffix: "+" },
                        { label: "Publisher Nodes", value: 500, suffix: "+" },
                        { label: "Annual Installs", value: 12, suffix: "M+" },
                        { label: "Zero Fraud", value: 100, suffix: "%" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl font-bold text-white mb-2 tracking-tight">
                                <Counter value={stat.value} />{stat.suffix}
                            </div>
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="bg-surface-3 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <div className="flex items-center justify-between mb-10 relative z-10">
                      <div>
                        <div className="text-white font-bold text-lg">Network Throughput</div>
                        <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">Institutional Deployment Velocity</div>
                      </div>
                      <div className="px-4 py-1.5 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-brand-orange text-[9px] font-bold uppercase tracking-widest">
                        Live 2026 Index
                      </div>
                   </div>
                   <div className="h-[350px] relative">
                      <div className="absolute inset-0 bg-brand-orange/5 blur-3xl rounded-full" />
                      {/* Growth Index visualization component */}
                      <div className="relative h-full w-full border-b border-l border-white/10 flex items-end gap-2 px-6 pb-6 overflow-hidden">
                         <div className="absolute inset-0 bg-grid opacity-10" />
                         {[40, 65, 45, 85, 60, 95, 75, 88, 98, 85, 92, 100].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             viewport={{ once: true }}
                             transition={{ delay: i * 0.05, duration: 1 }}
                             className="flex-1 bg-brand-orange/20 rounded-t-sm group-hover:bg-brand-orange/40 transition-all relative"
                           >
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-orange shadow-[0_0_10px_#FF6B00]" />
                           </motion.div>
                         ))}
                      </div>
                   </div>
                </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="bg-surface-2 border border-white/5 p-16 md:p-32 rounded-[3rem] text-center relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-full bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.5em] mb-10 block">Protocol Initiation</span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-12 uppercase text-white tracking-tight leading-[1.1] sm:leading-[0.9] max-w-[280px] sm:max-w-none mx-auto">
                  Ready to engineer<br />
                  <span className="text-white/40 italic">your growth?</span>
                </h2>
                <button 
                    className="px-12 py-5 bg-brand-orange text-black text-[12px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-brand-orange-light shadow-orange-glow" 
                    onClick={openGetStarted}
                >
                    Get Free Growth Audit
                </button>
             </div>
        </div>
      </div>
    </main>
  );
}
