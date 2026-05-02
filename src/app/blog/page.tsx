"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, Tag } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

const POSTS = [
  {
    id: 1,
    title: "The 2026 Guide to Scalable User Acquisition",
    excerpt: "Break down the core strategies that drive massive user growth in the current mobile ecosystem while maintaining efficient CPAs.",
    date: "April 15, 2026",
    author: "Growth Expert",
    category: "UA Strategy",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a5f97b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Mastering CPA: Pay Only for Performance",
    excerpt: "Learn how to optimize your offer funnel to ensure every conversion delivered is high-quality and verified.",
    date: "April 12, 2026",
    author: "Lead Strategist",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Global Traffic Trends: Beyond Tier 1 Markets",
    excerpt: "Exploring the hyper-growth opportunities in India, SEA, and the Middle East for mobile app developers.",
    date: "April 10, 2026",
    author: "Global Markets",
    category: "Market Entry",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Fraud Prevention in Performance Marketing",
    excerpt: "How Adsgrind uses proprietary detection technology to ensure 100% human traffic and safeguard advertiser budgets.",
    date: "April 08, 2026",
    author: "Technical Team",
    category: "Ad-Tech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  }
];

export default function BlogPage() {
  const { openGetStarted, openStrategy, openMarket, openFraudInsight } = useModals();

  return (
    <div className="pt-24 pb-20 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-[850px] mx-auto mb-12 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-purple mb-6 block opacity-80">Industry Intelligence</span>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 uppercase italic text-white leading-[1.1] tracking-tight">
                Performance <br />
                <span className="text-gradient inline-block mt-2">Insights</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-[1.6] opacity-90">
                The latest trends, technical guides, and growth strategies from the Adsgrind performance engineering team.
            </p>
          </motion.div>
        </div>

        {/* Featured Post 1 - UA Strategy */}
        <div className="mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <GlassCard className="p-0 overflow-hidden border-brand-purple/20 bg-white/[0.03] hover:border-brand-purple/40 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="flex-1 p-8 sm:p-16 lg:pr-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-bold text-brand-purple tracking-widest uppercase">
                                    Featured Guide
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">April 15, 2026</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                                The 2026 Guide to <br />
                                <span className="text-gradient">Scalable User Acquisition</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                                Break down the core strategies that drive massive user growth in the current mobile ecosystem while maintaining efficient CPAs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Button 
                                    variant="liquid" 
                                    size="lg" 
                                    className="px-10 group w-full sm:w-auto h-14 md:h-16 text-lg font-bold uppercase italic"
                                    onClick={() => window.location.href = '/guide/scalable-user-acquisition-2026'}
                                >
                                    Read Full Guide
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full lg:w-1/2 p-8 lg:p-12">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(157,80,187,0.2)] border border-white/10 group-hover:border-brand-purple/30 transition-colors"
                            >
                                <img src="/images/ua-growth-guide.png" alt="UA Guide" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </motion.div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>

        {/* Featured Post 2 - Mastering CPA */}
        <div className="mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <GlassCard className="p-0 overflow-hidden border-brand-orange/20 bg-white/[0.03] hover:border-brand-orange/40 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="flex-1 p-8 sm:p-16 lg:pr-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange tracking-widest uppercase">
                                    Performance Deep-Dive
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">April 12, 2026</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                                Mastering CPA: <br />
                                <span className="text-gradient-orange">Pay Only for Performance</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                                Learn how to optimize your offer funnel to ensure every conversion delivered is high-quality and verified.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Button variant="liquid" size="lg" className="px-10 group w-full sm:w-auto h-14 md:h-16 text-lg font-bold uppercase italic" onClick={openStrategy}>
                                    Get Strategy
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full lg:w-1/2 p-8 lg:p-12">
                            <motion.div
                                animate={{ x: [0, 5, 0], y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,88,0,0.15)] border border-white/10 group-hover:border-brand-orange/30 transition-colors"
                            >
                                <img src="/images/cpa-performance-guide.png" alt="CPA Guide" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </motion.div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>

        {/* Featured Post 3 - Global Trends */}
        <div className="mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <GlassCard className="p-0 overflow-hidden border-brand-red/20 bg-white/[0.03] hover:border-brand-red/40 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="flex-1 p-8 sm:p-16 lg:pr-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-[10px] font-bold text-brand-red tracking-widest uppercase">
                                    Market Intelligence
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">April 10, 2026</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                                Global Traffic Trends: <br />
                                <span className="text-gradient">Beyond Tier 1 Markets</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                                Exploring the hyper-growth opportunities in India, SEA, and the Middle East.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Button variant="liquid" size="lg" className="px-10 group w-full sm:w-auto h-14 md:h-16 text-lg font-bold uppercase italic" onClick={openMarket}>
                                    Market Strategy
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full lg:w-1/2 p-8 lg:p-12">
                            <motion.div
                                animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(238,29,35,0.15)] border border-white/10 group-hover:border-brand-red/30 transition-colors"
                            >
                                <img src="/images/global-market-growth.png" alt="Global Trends" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <motion.div 
                                    animate={{ opacity: [0, 0.4, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 bg-brand-red/10 pointer-events-none"
                                />
                            </motion.div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>

        {/* Featured Post 4 - Fraud Prevention */}
        <div className="mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <GlassCard className="p-0 overflow-hidden border-brand-red/20 bg-white/[0.03] hover:border-brand-red/40 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="flex-1 p-8 sm:p-16 lg:pr-8">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-[10px] font-bold text-brand-red tracking-widest uppercase">
                                    Ad-Tech Intelligence
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">April 08, 2026</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                                Fraud Prevention in <br />
                                <span className="text-gradient">Performance Marketing</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                                How Adsgrind uses proprietary detection technology to ensure 100% human traffic.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Button 
                                    variant="liquid" 
                                    size="lg" 
                                    className="px-10 group w-full sm:w-auto h-14 md:h-16 text-lg font-bold uppercase italic border-white/10"
                                    onClick={openFraudInsight}
                                >
                                    Read More
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full lg:w-1/2 p-8 lg:p-12">
                            <motion.div
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(238,29,35,0.15)] border border-white/10 group-hover:border-brand-red/30 transition-colors"
                            >
                                <img src="/images/fraud-prevention-tech.png" alt="Fraud Prevention" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <motion.div 
                                    animate={{ top: ['-10%', '110%'], opacity: [0, 0.5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent shadow-[0_0_20px_rgba(238,29,35,1)] z-10"
                                />
                            </motion.div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>

        {/* Other Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {POSTS.filter(p => p.id > 4).map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <GlassCard className="p-0 overflow-hidden border-white/5 group-hover:border-brand-purple/50 transition-all duration-500 bg-white/[0.02]">
                <div className="flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-bold mb-4 text-white uppercase italic group-hover:text-brand-purple transition-colors leading-tight">
                        {post.title}
                    </h3>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
