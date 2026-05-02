"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

const TEAM = [
  { name: "Alex Rivera", role: "Founder & CEO", image: "https://i.pravatar.cc/150?u=alex" },
  { name: "Jessica Bloom", role: "Head of Strategy", image: "https://i.pravatar.cc/150?u=jessica" },
  { name: "David Chen", role: "SEO Director", image: "https://i.pravatar.cc/150?u=david" },
  { name: "Sarah Miller", role: "Creative Lead", image: "https://i.pravatar.cc/150?u=sarah" },
];

const VALUES = [
  { title: "Integrity", icon: <ShieldCheck className="text-brand-accent-start" />, desc: "We believe in transparent, honest partnerships with our clients." },
  { title: "Innovation", icon: <Eye className="text-brand-accent-start" />, desc: "We stay ahead of the curve, utilizing AI and cutting-edge tech." },
  { title: "Impact", icon: <Target className="text-brand-accent-start" />, desc: "Results matter. We drive growth that you can see and measure." },
];

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
    const [count, setCount] = React.useState(0);
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[0-9]/g, '');

    React.useEffect(() => {
        let start = 0;
        const end = numericValue;
        if (isNaN(end)) return;
        
        const totalFrames = duration * 60;
        const increment = end / totalFrames;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        
        return () => clearInterval(timer);
    }, [numericValue, duration]);

    return <span>{count}{suffix}</span>;
};

export default function AboutPage() {
  const { openGetStarted } = useModals();
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="py-1 px-4 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-bold uppercase tracking-widest text-brand-red animate-pulse">Our DNA</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl mb-10 leading-tight text-white uppercase italic"
          >
            Scaling the <br />
            <span className="text-gradient">Mobile Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl leading-relaxed"
          >
            Adsgrind is a high-performance user acquisition company dedicated to bridging the gap between premium advertisers and high-performing publishers. We leverage proprietary technology to drive measurable, scalable, and sustainable growth for the world's most ambitious mobile apps.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <GlassCard className="h-full p-12 overflow-hidden relative group border-brand-red/10 hover:border-brand-red/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-red/10 blur-[60px]"></div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                    <Target className="text-brand-red" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-6 uppercase italic text-white">Our Mission</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    To empower advertisers and publishers by providing a transparent, performance-driven marketplace that maximizes ROI and global reach through technical excellence and strategic innovation.
                </p>
             </GlassCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <GlassCard className="h-full p-12 overflow-hidden relative group border-brand-orange/10 hover:border-brand-orange/30 transition-all duration-500">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[60px]"></div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                    <Eye className="text-brand-orange" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-6 uppercase italic text-white">Our Vision</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    To redefine user acquisition for the next billion smartphone users, becoming the most trusted global partner for mobile growth through scalable architectures and human-centric expertise.
                </p>
             </GlassCard>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-32 text-center">
            <h2 className="text-4xl font-bold mb-16 uppercase italic text-white">The Adsgrind Standard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((v, i) => (
                    <motion.div 
                        key={v.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center group"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-brand-purple/20 group-hover:border-brand-purple/50 transition-all">
                            <div className="text-brand-purple">
                                {v.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wider">{v.title}</h3>
                        <p className="text-slate-500 max-w-xs">{v.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Growth & Results Section */}
        <div className="mb-32">
            <div className="text-center mb-20">
                <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block"
                >
                    Scale & Performance
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase italic text-white leading-tight">
                    Trusted by <span className="text-gradient">100+ Clients</span> Worldwide
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Driving consistent growth for apps and brands across global markets with data-backed precision.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { label: "Happy Clients", value: "100+", sub: "Global Brands" },
                        { label: "Publishers", value: "1000+", sub: "Direct Inventory" },
                        { label: "Installs", value: "10M+", sub: "Delivered & Verified" },
                        { label: "GEO Reach", value: "Tier 1", sub: "Global Expertise" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group"
                        >
                            <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-brand-red transition-colors">
                                {stat.value.match(/\d/) ? <Counter value={stat.value} /> : stat.value}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-xs text-slate-600">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Growth Graph Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative p-8 rounded-3xl bg-[#0B0B0B] border border-white/5 shadow-2xl overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Campaign Scale</span>
                        </div>
                    </div>
                    
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-1 uppercase italic">Client Growth Index</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Aggregate performance across all verticals</p>
                    </div>

                    {/* SVG Graph Component */}
                    <div className="relative h-64 w-full">
                        <svg viewBox="0 0 400 200" className="w-full h-full">
                            {/* Grid Lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <line 
                                    key={i} 
                                    x1="0" y1={i * 50} x2="400" y2={i * 50} 
                                    stroke="rgba(255,255,255,0.05)" 
                                    strokeWidth="1" 
                                />
                            ))}
                            {/* The Growth Path */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M0,180 C50,170 80,150 120,130 C160,110 200,140 250,90 C300,40 350,60 400,20"
                                fill="none"
                                stroke="url(#gradient-red)"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            {/* Area Fill */}
                            <motion.path
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                d="M0,180 C50,170 80,150 120,130 C160,110 200,140 250,90 C300,40 350,60 400,20 V200 H0 Z"
                                fill="url(#area-gradient)"
                            />
                            {/* Markers */}
                            <motion.circle 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 2 }}
                                cx="400" cy="20" r="6" fill="#EE1D23" 
                            />
                            
                            <defs>
                                <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#EE1D23" />
                                    <stop offset="100%" stopColor="#FF5800" />
                                </linearGradient>
                                <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#EE1D23" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#EE1D23" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="mt-6 flex justify-between items-end">
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Q1 2026</span>
                                <span className="text-sm font-bold text-white">+124%</span>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target ROI</span>
                                <span className="text-sm font-bold text-brand-success">4.8x</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-600 font-medium italic">Scaling without limits.</p>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Global Reach CTA */}
        <GlassCard className="p-16 text-center border-brand-red/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-red/5 blur-[100px] rounded-full -z-10 translate-y-1/2"></div>
             <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase italic text-white">Ready to Join the Growth Revolution?</h2>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="liquid" size="lg" className="px-12 w-full sm:w-auto" onClick={openGetStarted}>Start Your Growth</Button>
             </div>
        </GlassCard>
      </div>
    </div>
  );
}
