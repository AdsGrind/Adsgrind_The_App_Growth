"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, BarChart3, Globe2, Zap, Star, CheckCircle2, 
  Activity, ChevronRight, Target, Eye, TrendingUp, 
  ShieldCheck, ArrowUpRight, MousePointer2,
  LineChart, PieChart, Layers, Database, Shield, Cpu
} from 'lucide-react';
import { Button, GlassCard, cn, Counter, GrowthIndex } from '@/components/ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useModals } from '@/context/ModalContext';
import Link from 'next/link';

// --- Background Components ---

const DataPulseBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-brand-orange/5 blur-[160px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-brand-orange/10 blur-[140px] rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }} />
      
      {/* Subtle Grid Infrastructure */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Animated Data Points (Floating Particles) */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-brand-orange/40 rounded-full blur-[1px] will-change-transform"
          />
        ))}
      </div>

      {/* Faint Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-orange)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-brand-orange)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-brand-orange)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path 
          d="M 0 20 Q 50 50 100 80" 
          stroke="url(#lineGrad)" 
          strokeWidth="0.1" 
          fill="none" 
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ strokeDasharray: "10 10" }}
        />
        <motion.path 
          d="M 100 10 Q 50 50 0 90" 
          stroke="url(#lineGrad)" 
          strokeWidth="0.1" 
          fill="none" 
          animate={{ strokeDashoffset: [0, 200] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ strokeDasharray: "15 15" }}
        />
      </svg>
    </div>
  );
};

export { BrandsMarquee } from './BrandsMarquee';
import MarketOpportunity from './MarketOpportunity';
import TrafficSources from './TrafficSources';
import AdFormats from './AdFormats';
import AudienceReach from './AudienceReach';
import CaseStudy from './CaseStudy';
import WhyChooseUs from './WhyChooseUs';
import FAQSection from './FAQSection';

const LinkedinIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- Hero Section ---
const HeroSection = () => {
  const { openGetStarted } = useModals();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#000000] section-padding">
      {/* Premium Subtle Background */}
      <DataPulseBackground />

      {/* Floating Operational Indicators - Premium Depth */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute top-[28%] left-[8%] p-5 bg-surface-2/20 backdrop-blur-md border border-white/5 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Deployment Velocity</span>
          </div>
          <div className="text-xl font-bold text-white">12.4K <span className="text-[10px] text-white/40">ops/s</span></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="absolute bottom-[30%] right-[8%] p-5 bg-surface-2/20 backdrop-blur-md border border-white/5 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield size={12} className="text-brand-orange" />
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Fraud Shield Active</span>
          </div>
          <div className="text-xl font-bold text-white">99.9% <span className="text-[10px] text-green-500">Secure</span></div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-5xl mx-auto will-change-[transform,opacity]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="px-5 py-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] inline-block">
              Click. Conversion. Growth
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-[-0.04em] mb-8 leading-[0.95] text-white will-change-[transform,opacity]"
          >
            Scale Your App to <span className="text-brand-orange">100K+</span><br />
            High-Quality Users<br />
            <span className="text-white/40 font-light italic block mt-6 md:mt-4">Not Just Installs.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Data-driven CPI & CPA campaigns engineered for ROI, low CAC, and zero fraud. 
            We replace generic advertising with precision growth protocols.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <button
              onClick={openGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-brand-orange text-black text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-brand-orange-light hover:-translate-y-1 shadow-orange-glow"
            >
              Get Free Growth Audit
            </button>
            <button
              className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1 backdrop-blur-sm"
            >
              Performance Data
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1"><Counter value={538} />K+</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Installs Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1"><Counter value={42} />%</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Avg CAC Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">&lt;0.2%</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">Fraud Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1"><Counter value={20} />+</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">GEOs Reached</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Live Intelligence Section ---
const LiveIntelligenceSection = () => {
  return (
    <section className="bg-[#000000] relative overflow-hidden section-padding">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Performance Intel</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tight leading-[0.95]">
              Real-Time<br /><span className="text-white/40">Optimization.</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              We provide total transparency into every growth vector. 
              Our infrastructure is built to monitor, filter, and scale your app budget with extreme precision.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Node-Level Attribution", value: "Verified Installs" },
                { title: "Dynamic CAC Control", value: "Unit Economics" },
                { title: "GEO Performance Heatmap", value: "Global Scale" },
                { title: "Zero-Fraud Protection", value: "Real-time Filtering" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-2 border border-white/5 group hover:border-brand-orange/20 transition-all">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-black transition-all">
                    <Activity size={18} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm uppercase tracking-tight">{item.title}</div>
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative">
             <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] rounded-full" />
             
             {/* Dashboard Mockup */}
             <div className="relative bg-surface-2 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-orange-glow p-1">
                <div className="bg-black/40 p-6 border-b border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                      </div>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest ml-4">CAMPAIGN_OPS_v4.2</span>
                   </div>
                   <div className="text-brand-orange text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                      Optimizing
                   </div>
                </div>
                
                <div className="p-8 space-y-8">
                   {/* Metrics Row */}
                   <div className="grid grid-cols-3 gap-6">
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                         <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">ROI Index</div>
                         <div className="text-xl font-bold text-white">+218%</div>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                         <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">CAC Target</div>
                         <div className="text-xl font-bold text-white">-42.5%</div>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                         <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-1">Live Nodes</div>
                         <div className="text-xl font-bold text-white">500+</div>
                      </div>
                   </div>

                   {/* Graph Area */}
                   <div className="h-64 relative border-b border-l border-white/10 flex items-end gap-1.5 px-4 pb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/5 to-transparent pointer-events-none" />
                      {[40, 60, 45, 85, 55, 95, 75, 88, 65, 92, 80, 98].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                          className="flex-1 bg-brand-orange/20 rounded-t-sm relative group will-change-[height]"
                        >
                           <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-40 transition-opacity" />
                        </motion.div>
                      ))}
                      
                      {/* Floating Indicator */}
                      <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute top-[20%] right-[10%] bg-brand-orange/10 border border-brand-orange/20 backdrop-blur-md px-4 py-2 rounded-xl"
                      >
                         <div className="text-[9px] text-brand-orange font-bold uppercase tracking-widest mb-1">Status</div>
                         <div className="text-sm font-bold text-white">Scaling Active</div>
                      </motion.div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Trust Section ---
const TrustSection = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Head of Growth",
      company: "FinStream",
      result: "42% CAC Reduction",
      image: "https://i.pravatar.cc/150?u=alex",
      content: "Adsgrind helped us scale from 5K to 50K installs in 30 days while cutting CAC by 42%. Their data-first approach is unmatched."
    },
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "PlayNexus",
      result: "5.4x ROAS",
      image: "https://i.pravatar.cc/150?u=sarah",
      content: "The quality of users delivered surpassed all our previous partners. Real high-LTV users, zero fraud, and absolute transparency."
    },
    {
      name: "Marcus Thorne",
      role: "Founder",
      company: "HealthTrack",
      result: "Global Scale",
      image: "https://i.pravatar.cc/150?u=marcus",
      content: "Transitioning to 20+ GEOs was seamless with Adsgrind's automated optimization engine. They understand performance deeply."
    }
  ];

  return (
    <section className="bg-surface-1 section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Proven Performance</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Trusted by Growth-Focused Apps</h2>
        </div>

        {/* Realistic Logo Slider handled by BrandsMarquee component */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-surface-2 border border-white/5 rounded-[2.5rem] hover:border-brand-orange/20 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 blur-3xl group-hover:bg-brand-orange/10 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />)}
              </div>
              
              <p className="text-white/70 text-lg mb-10 italic leading-relaxed">"{t.content}"</p>
              
              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden grayscale">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-white tracking-tight">{t.name}</div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{t.role}, {t.company}</div>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-brand-orange/5 text-brand-orange text-[10px] font-bold rounded-full border border-brand-orange/20 uppercase tracking-widest">
                  {t.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Why Clients Stay Section ---
const WhyClientsStaySection = () => {
  const points = [
    {
      title: "Attribution Transparency",
      desc: "Every install and event is verified. No black-box algorithms, only raw performance data you can trust.",
      icon: <Database size={24} />
    },
    {
      title: "Real-time Optimization",
      desc: "Our engine optimizes campaigns every 60 seconds, re-routing budget away from low-quality nodes instantly.",
      icon: <Zap size={24} />
    },
    {
      title: "Zero-Fraud Commitment",
      desc: "Military-grade fingerprinting blocks 99.8% of bot activity. We ensure every dollar spent is directed at real humans.",
      icon: <ShieldCheck size={24} />
    },
    {
      title: "Direct Scaling Support",
      desc: "Work with performance experts who understand the technical nuances of global app expansion and unit economics.",
      icon: <Globe2 size={24} />
    }
  ];

  return (
    <section className="bg-surface-1 relative overflow-hidden section-padding">
       <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Values</span>
             <h2 className="text-4xl md:text-7xl font-bold uppercase text-white tracking-tight leading-none">Built for<br /><span className="text-white/40 font-light italic">Performance.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {points.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-surface-2 border border-white/5 rounded-3xl hover:border-brand-orange/20 hover:bg-surface-3 transition-all duration-300 group flex flex-col"
                >
                   <div className="w-14 h-14 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-8 group-hover:scale-110 transition-transform">
                      {p.icon}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">{p.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">{p.desc}</p>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

// --- Data Performance / Global Network ---
const DataPerformanceSection = () => {
  return (
    <section className="relative bg-[#000000] overflow-hidden section-padding">
      {/* Infrastructure Atmosphere */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-orange/[0.02] blur-[160px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-px bg-brand-orange/30" />
               <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">Infrastructure Layer</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tighter leading-[0.9]">
              Direct Publisher<br />
              <span className="text-white/40 italic font-light">Network.</span>
            </h2>
            <p className="text-white/30 text-xl max-w-xl mb-16 leading-relaxed">
              Deploy performance across 20+ Tier-1 and Tier-2 GEOs. Our infrastructure is integrated directly into the world's most high-quality publisher nodes for verified scale.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { label: "US Region", val: "Active", status: "Optimal", icon: <Target size={14} /> },
                 { label: "India Node", val: "Scaling", status: "High Cap", icon: <Activity size={14} /> },
                 { label: "SEA Reach", val: "Live", status: "Real-time", icon: <Globe2 size={14} /> },
                 { label: "Fraud Filter", val: "Active", status: "99.8% Sec", icon: <ShieldCheck size={14} /> }
               ].map((s, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -5, borderColor: 'rgba(255, 107, 0, 0.3)' }}
                   className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl relative group overflow-hidden transition-all duration-500"
                 >
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center justify-between mb-4 relative z-10">
                       <div className="text-brand-orange/40 group-hover:text-brand-orange transition-colors">
                          {s.icon}
                       </div>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
                          <div className="w-1 h-1 rounded-full bg-brand-orange animate-pulse" />
                          <span className="text-[7px] text-brand-orange font-bold uppercase tracking-widest">{s.val}</span>
                       </div>
                    </div>
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mb-1 relative z-10">{s.label}</div>
                    <div className="text-xl font-bold text-white mb-2 relative z-10 uppercase tracking-tight">{s.status}</div>
                    
                    {/* Animated Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 </motion.div>
               ))}
            </div>
          </div>
          
          <div className="relative group">
             {/* Global Atmosphere */}
             <div className="absolute inset-0 bg-brand-orange/5 blur-[120px] rounded-full group-hover:bg-brand-orange/10 transition-all duration-700 pointer-events-none" />
             
             {/* World Map Dashboard */}
             <div className="relative bg-surface-2 border border-white/10 p-1 rounded-[3.5rem] h-[550px] shadow-orange-glow overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Globe2 size={320} className="text-brand-orange/10 animate-pulse-slow" />
                </div>
                
                {/* Traffic Flow Layers (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
                   {/* Node Connections */}
                   {[
                     { d: "M 150 250 Q 250 150 350 250", dur: 3 },
                     { d: "M 100 200 Q 250 50 400 200", dur: 4 },
                     { d: "M 120 300 Q 250 350 380 300", dur: 5 }
                   ].map((path, i) => (
                     <motion.path 
                       key={i}
                       d={path.d}
                       fill="none" 
                       stroke="rgba(255, 107, 0, 0.2)" 
                       strokeWidth="1" 
                       strokeDasharray="4 6"
                       animate={{ strokeDashoffset: [0, -40] }}
                       transition={{ repeat: Infinity, duration: path.dur, ease: "linear" }}
                     />
                   ))}
                   
                   {/* Pulsing Nodes */}
                   {[
                     { x: 150, y: 250, label: "US_NODE" },
                     { x: 350, y: 250, label: "EU_HUB" },
                     { x: 250, y: 150, label: "META_LAY" },
                     { x: 300, y: 350, label: "SEA_PIPE" }
                   ].map((node, i) => (
                     <g key={i}>
                        <circle cx={node.x} cy={node.y} r="3" fill="#FF6B00" />
                        <motion.circle 
                          cx={node.x} cy={node.y} r="8" 
                          fill="none" stroke="#FF6B00" strokeWidth="0.5"
                          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                        />
                     </g>
                   ))}
                </svg>

                {/* Live Intelligence Overlays */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-[15%] left-[10%] p-5 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl z-20 group/card pointer-events-none"
                >
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Global Throughput</span>
                   </div>
                   <div className="text-xl font-bold text-white tracking-tighter">42.4M <span className="text-[10px] text-white/40">OPS/S</span></div>
                   <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['20%', '80%', '40%', '90%'] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="h-full bg-brand-orange shadow-orange-glow"
                      />
                   </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[15%] right-[10%] p-5 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl z-20 pointer-events-none"
                >
                   <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck size={14} className="text-brand-orange" />
                      <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Zero-Fraud Protocol</span>
                   </div>
                   <div className="text-lg font-bold text-white tracking-tight">Active & Scaling</div>
                   <div className="text-[8px] text-green-500 font-bold uppercase mt-1 tracking-widest">99.8% Verification</div>
                </motion.div>

                {/* Center Node Data Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                   <div className="relative">
                      <div className="w-48 h-48 border border-brand-orange/10 rounded-full animate-spin-slow" />
                      <div className="absolute inset-0 border border-brand-orange/5 rounded-full rotate-45" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Case Studies Section ---
const CaseStudiesSection = () => {
  const cases = [
    {
      industry: "Fintech",
      title: "Mastering CPA ROI",
      campaign: "CPA (Funded Account)",
      spend: "Budget Optimized",
      installs: "38K+ Verified",
      reduction: "42%",
      roi: "3.4x",
      slug: "fintech-cpa-mastery",
      color: "from-blue-500/20 to-brand-orange/20",
      outcome: "Scaled to Tier-1 GEOs with zero-fraud protocol enabled."
    },
    {
      industry: "Gaming",
      title: "Fraud Audit Engine",
      campaign: "CPI + Audit",
      spend: "Budget Optimized",
      installs: "120K+ Verified",
      reduction: "0.2% Fraud",
      roi: "61%",
      slug: "gaming-fraud-prevention",
      color: "from-purple-500/20 to-brand-orange/20",
      outcome: "Eliminated bot traffic and click spam across global clusters."
    },
    {
      industry: "SaaS",
      title: "Global GEO Scaling",
      campaign: "CPA (Expansion)",
      spend: "Budget Optimized",
      installs: "500K+ Scale",
      reduction: "53% CPI",
      roi: "31%",
      slug: "saas-global-expansion",
      color: "from-emerald-500/20 to-brand-orange/20",
      outcome: "Activated 20+ GEO nodes with localized growth funnels."
    }
  ];

  return (
    <section className="py-32 bg-surface-1">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Social Proof</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-none">Evidence of Impact.</h2>
          </div>
          <button className="px-10 py-5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Performance Data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <Link href={`/case-studies/${c.slug}`} key={idx} className="flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-2 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-brand-orange/30 transition-all duration-500 flex flex-col w-full"
            >
              <div className={cn("h-56 relative overflow-hidden bg-gradient-to-br flex items-center justify-center", c.color)}>
                 <div className="absolute inset-0 bg-grid opacity-20" />
                 <BarChart3 size={120} className="text-white/10 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute top-8 left-8 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                   {c.industry}
                 </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{c.title}</h4>
                <div className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-8">{c.campaign}</div>
                
                <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-black/30 rounded-2xl border border-white/5">
                   <div>
                      <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">Scale</div>
                      <div className="text-lg font-bold text-white">{c.installs}</div>
                   </div>
                   <div>
                      <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">Efficiency</div>
                      <div className="text-lg font-bold text-brand-orange">-{c.reduction} CAC</div>
                   </div>
                   <div>
                      <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">ROI</div>
                      <div className="text-lg font-bold text-white">{c.roi}</div>
                   </div>
                   <div>
                      <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">Status</div>
                      <div className="text-xs font-bold text-white/40">{c.spend}</div>
                   </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-10 flex-1">
                   {c.outcome}
                </p>

                <button className="w-full py-5 rounded-2xl border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest group-hover:bg-brand-orange group-hover:text-black group-hover:border-brand-orange transition-all flex items-center justify-center gap-2">
                  Read Investigation <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Services Section ---
const ServicesSection = () => {
  const services = [
    {
      title: 'Performance UA',
      desc: 'Precision CPI & CPA deployment across premium publisher nodes.',
      solve: 'Solves non-scalable CAC and low-retention traffic leaks.',
      outcome: 'Measurable growth with 99.8% human-traffic guarantee.',
      icon: <Zap size={24} />
    },
    {
      title: 'Retention Engineering',
      desc: 'Deep-funnel multi-event optimization for LTV maximization.',
      solve: 'Solves post-install churn and weak monetization signals.',
      outcome: '2.5x higher Day-30 retention through optimization.',
      icon: <Target size={24} />
    },
    {
      title: 'Anti-Fraud Protocol',
      desc: 'Proprietary military-grade detection and real-time filtering.',
      solve: 'Solves budget wastage and attribution data pollution.',
      outcome: 'Total budget integrity with zero-fraud protocols.',
      icon: <ShieldCheck size={24} />
    },
    {
      title: 'Direct Inventory',
      desc: 'Exclusive integration with top publishers and app stores.',
      solve: 'Solves network fatigue and standard ad banner blindness.',
      outcome: 'High-intent acquisition on direct publisher layers.',
      icon: <Layers size={24} />
    },
  ];

  return (
    <section className="py-32 bg-[#000000] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Solutions</span>
          <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tight leading-[0.9]">Growth<br /><span className="text-white/40">Engineered.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 bg-surface-2 border border-white/5 rounded-[2.5rem] hover:bg-surface-3 transition-all duration-300 group"
            >
              <div className="mb-10 p-5 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl w-fit text-brand-orange group-hover:bg-brand-orange group-hover:text-black transition-all duration-500">
                {s.icon}
              </div>
              <h4 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">{s.title}</h4>
              <p className="text-white/50 text-xl mb-10 leading-relaxed">{s.desc}</p>
              
              <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex gap-6">
                  <div className="text-[10px] font-bold text-brand-orange uppercase tracking-widest w-24 shrink-0">Problem</div>
                  <div className="text-xs text-white/30 uppercase tracking-[0.1em] font-medium">{s.solve}</div>
                </div>
                <div className="flex gap-6">
                  <div className="text-[10px] font-bold text-brand-orange uppercase tracking-widest w-24 shrink-0">Outcome</div>
                  <div className="text-xs text-white/30 uppercase tracking-[0.1em] font-medium">{s.outcome}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Conversion Section ---
const ConversionSection = () => {
  const { openGetStarted } = useModals();
  return (
    <section className="py-32 bg-[#000000] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-brand-orange/5 blur-[120px] rounded-full translate-x-1/2" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Next Steps</span>
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-10 uppercase tracking-tight leading-[0.85]">Get Your<br /><span className="text-white/40 italic font-light">Growth Audit.</span></h2>
            <p className="text-white/50 text-xl mb-16 max-w-lg leading-relaxed font-medium">
               We'll identify scale bottlenecks and engineer a custom ROI roadmap for your app.
            </p>
            
            <div className="space-y-8 mb-16">
               {[
                 "Full CAC & unit economic analysis",
                 "Zero-fraud vulnerability assessment",
                 "Custom global scaling roadmap",
                 "Direct publisher node review"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 text-white/40 group">
                   <div className="w-8 h-8 rounded-full bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-black transition-all">
                     <CheckCircle2 size={16} />
                   </div>
                   <span className="text-sm font-bold uppercase tracking-widest">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-surface-2 border border-white/5 p-12 md:p-16 rounded-[3rem] shadow-orange-glow relative group">
             <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <form className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-brand-orange transition-all outline-none" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">App URL</label>
                  <input 
                    type="url" 
                    placeholder="https://yourapp.com"
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:border-brand-orange transition-all outline-none" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Budget</label>
                    <select className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange transition-all outline-none appearance-none cursor-pointer">
                      <option className="bg-black">$5k - $20k</option>
                      <option className="bg-black">$20k - $50k</option>
                      <option className="bg-black">$50k - $100k</option>
                      <option className="bg-black">$100k+</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Goal</label>
                    <select className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-brand-orange transition-all outline-none appearance-none cursor-pointer">
                      <option className="bg-black">Scale Installs</option>
                      <option className="bg-black">Optimize ROI/ROAS</option>
                      <option className="bg-black">Fraud Prevention</option>
                      <option className="bg-black">Global Expansion</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-brand-orange text-black font-bold py-6 rounded-2xl uppercase tracking-[0.3em] text-[11px] hover:bg-brand-orange-light transition-all shadow-orange-glow mt-4">
                  Request Audit
                </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export {
  MarketOpportunity,
  TrafficSources,
  AdFormats,
  AudienceReach,
  CaseStudy,
  WhyChooseUs,
  FAQSection,
  HeroSection,
  LiveIntelligenceSection,
  TrustSection,
  WhyClientsStaySection,
  DataPerformanceSection,
  CaseStudiesSection,
  ServicesSection,
  ConversionSection
};
