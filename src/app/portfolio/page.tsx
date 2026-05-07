"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign, Zap, Shield, BarChart2, Globe, Filter } from 'lucide-react';
import { Button, cn, Counter } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

type Industry = 'All' | 'Fintech' | 'Gaming' | 'SaaS';

interface CaseStudy {
  id: string;
  industry: Industry;
  campaignType: string;
  budgetRange: string;
  geos: string;
  title: string;
  description: string;
  metrics: { label: string; value: string; trend?: string }[];
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-scale',
    industry: 'Fintech',
    campaignType: 'CPA / High-LTV Acquisition',
    budgetRange: '$50k - $200k / mo',
    geos: 'USA, UK, Canada',
    title: 'Scaling Neo-Bank to 38K Verified Users',
    description: 'We engineered a deep-funnel CPA strategy targeting verified KYC completions. By bypassing low-intent traffic nodes and focusing on OEM inventory, we crushed the initial CAC target by 42%.',
    metrics: [
      { label: 'Total Installs', value: '38,000+' },
      { label: 'CAC Reduction', value: '42%', trend: 'down' },
      { label: 'ROI Multiple', value: '3.8x' },
    ],
    tags: ['CPA', 'OEM Inventory', 'KYC Optimization'],
  },
  {
    id: 'gaming-launch',
    industry: 'Gaming',
    campaignType: 'CPE / Engagement Scaling',
    budgetRange: '$100k+ / mo',
    geos: 'SEA, Brazil, India',
    title: 'Global AAA Launch: 500K Level Completions',
    description: 'For a major mobile RPG launch, we deployed a Cost-Per-Engagement protocol. The campaign drove half a million level-10 completions within 7 days, ensuring top-tier store ranking.',
    metrics: [
      { label: 'Level Completions', value: '500,000+' },
      { label: 'Day-7 Retention', value: '+28%', trend: 'up' },
      { label: 'Fraud Rate', value: '<0.1%' },
    ],
    tags: ['CPE', 'Hyper-Growth', 'Store Ranking'],
  },
  {
    id: 'saas-b2b',
    industry: 'SaaS',
    campaignType: 'Direct-Response / ROAS',
    budgetRange: '$20k - $80k / mo',
    geos: 'Germany, France, Nordics',
    title: 'B2B Productivity: 5x ROAS via Direct DSP',
    description: 'Strategic European market entry for an AI-driven productivity suite. Utilizing direct DSP nodes and custom creative optimization, we achieved a sustainable 5x return on ad spend.',
    metrics: [
      { label: 'ROAS', value: '5.2x' },
      { label: 'Trial Conversion', value: '31%', trend: 'up' },
      { label: 'Active Markets', value: '12 EU' },
    ],
    tags: ['ROAS', 'DSP Scaling', 'B2B'],
  }
];

export default function PortfolioPage() {
  const { openGetStarted } = useModals();
  const [filter, setFilter] = useState<Industry>('All');

  const filteredStudies = filter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.industry === filter);

  return (
    <main className="bg-black min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-8">
              Evidence of Impact
            </span>
            <h1 className="font-display font-bold text-5xl md:text-8xl mb-10 uppercase text-white leading-none tracking-tight">
              Performance<br /><span className="text-white/40 font-light italic">Case Studies.</span>
            </h1>
            <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
              Institutional-grade growth for world-class mobile apps. Data-backed success stories across high-impact verticals.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
           {['All', 'Fintech', 'Gaming', 'SaaS'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f as Industry)}
               className={cn(
                 "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border",
                 filter === f 
                  ? "bg-brand-orange border-brand-orange text-black shadow-orange-glow" 
                  : "bg-surface-2 border-white/10 text-white/40 hover:text-white hover:border-white/20"
               )}
             >
               {f}
             </button>
           ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((cs, idx) => (
              <motion.div
                key={cs.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-surface-2 border border-white/5 rounded-[3rem] overflow-hidden group hover:bg-surface-3 transition-all duration-700"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                   {/* Left: Content */}
                   <div className="p-10 lg:p-16 flex flex-col justify-between">
                      <div>
                         <div className="flex items-center gap-4 mb-8">
                            <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">{cs.industry}</span>
                            <div className="w-1 h-1 bg-white/10 rounded-full" />
                            <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">{cs.campaignType}</span>
                         </div>
                         <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-none mb-8 group-hover:text-brand-orange transition-colors">
                           {cs.title}
                         </h2>
                         <p className="text-white/50 text-lg leading-relaxed mb-12">
                           {cs.description}
                         </p>
                      </div>

                      <div className="space-y-6">
                         <div className="flex flex-wrap gap-8 py-8 border-y border-white/5">
                            <div>
                               <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Budget Range</div>
                               <div className="text-white font-bold">{cs.budgetRange}</div>
                            </div>
                            <div>
                               <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">GEOs Targeted</div>
                               <div className="text-white font-bold">{cs.geos}</div>
                            </div>
                         </div>
                         <div className="flex flex-wrap gap-4">
                            {cs.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white/40 uppercase tracking-widest">
                                {tag}
                              </span>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Right: Visualization & Results */}
                   <div className="bg-black/40 p-10 lg:p-16 flex flex-col justify-center relative">
                      <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 mb-16">
                         {cs.metrics.map((m, i) => (
                           <div key={i} className="text-center lg:text-left">
                              <div className="flex items-baseline gap-1 justify-center lg:justify-start">
                                 <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">{m.value}</span>
                                 {m.trend && (
                                   <span className={cn(
                                     "text-xs font-bold uppercase",
                                     m.trend === 'up' ? "text-green-500" : "text-brand-orange"
                                   )}>
                                     {m.trend === 'up' ? '↑' : '↓'}
                                   </span>
                                 )}
                              </div>
                              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-2">{m.label}</div>
                           </div>
                         ))}
                      </div>

                      {/* Animated Graph Placeholder */}
                      <div className="relative h-[220px] w-full bg-surface-3 rounded-2xl border border-white/5 p-8 overflow-hidden">
                         <div className="absolute inset-0 bg-grid opacity-10" />
                         
                         {/* Floating Growth Index Pill */}
                         <motion.div 
                           initial={{ opacity: 0, y: -10 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ delay: 1, duration: 0.5 }}
                           className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 bg-brand-orange/10 backdrop-blur-md border border-brand-orange/20 rounded-full"
                         >
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.8)] animate-pulse" />
                            <span className="text-[9px] font-bold text-brand-orange uppercase tracking-[0.2em]">Growth Index</span>
                         </motion.div>

                         <div className="relative h-full w-full flex items-end justify-between gap-2 pt-12">
                            {[20, 40, 30, 60, 50, 80, 70, 100, 90].map((h, i) => (
                              <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h * 0.7}%` }}
                                transition={{ delay: i * 0.05 + 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                className="flex-1 bg-brand-orange/20 rounded-t-lg relative group/bar will-change-[height]"
                              >
                                 <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange group-hover:bg-brand-orange-light transition-colors" />
                              </motion.div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Differentiator */}
        <section className="mt-48 mb-32">
           <div className="text-center mb-24">
              <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Advantage</span>
              <h2 className="text-4xl md:text-7xl font-bold uppercase text-white tracking-tight leading-none">Institutional Infrastructure.</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Shield size={20} />, title: "Zero Fraud", desc: "Military-grade detection engine." },
                { icon: <TrendingUp size={20} />, title: "LTV Optimization", desc: "Targeting high-value user nodes." },
                { icon: <Globe size={20} />, title: "Global Access", desc: "Direct 500+ publisher network." },
                { icon: <BarChart2 size={20} />, title: "Live Analytics", desc: "24/7 transparent performance data." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-surface-2 border border-white/5 rounded-3xl text-center group">
                   <div className="w-12 h-12 mx-auto bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8 group-hover:scale-110 transition-transform">
                     {item.icon}
                   </div>
                   <h3 className="text-white font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                   <p className="text-white/30 text-sm">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Final CTA */}
        <div className="bg-surface-2 border border-white/5 p-16 md:p-32 rounded-[3rem] text-center relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-full bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.5em] mb-10 block">Protocol Initiation</span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-12 uppercase text-white tracking-tight leading-[1.1] sm:leading-[0.9] max-w-[280px] sm:max-w-none mx-auto">
                  Deploy Your<br />
                  <span className="text-white/40 italic">Success Case.</span>
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
