"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Zap, CheckCircle2, ArrowRight, TrendingUp, Globe2, BarChart3, Repeat, PlayCircle } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

interface EcoRetailFrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "Objective",
    icon: <Target className="text-brand-success" />,
    content: "The primary focus was to drastically reduce effective CPI while simultaneously increasing long-term retention quality across highly competitive Southeast Asia markets.",
    metrics: ["Goal: -30% eCPI", "Retention target: +15%"]
  },
  {
    title: "Traffic Layering System",
    icon: <Globe2 className="text-brand-primary" />,
    content: "We deployed a three-tier traffic architecture to ensure balanced growth: High-intent core users, mid-funnel engagement layers, and broad-scale expansion layers.",
    bullets: ["Multi-GEO SEA clustering", "Tiered inventory allocation", "Contextual channel mapping"]
  },
  {
    title: "CPI Efficiency Engine",
    icon: <BarChart3 className="text-brand-success" />,
    content: "Our engine uses real-time post-install signals to optimize bids and prune underperforming placements using strict quality filters.",
    bullets: ["Sub-source placement pruning", "Automated bid optimization", "Creative fatigue detection"]
  },
  {
    title: "Retention Optimization",
    icon: <Repeat className="text-brand-purple" />,
    content: "Focusing on post-install event-based optimization logic to minimize funnel drop-offs and establish sustainable re-engagement loops.",
    bullets: ["Event-based re-targeting", "Drop-off analysis loops", "High-LTV source weighting"]
  },
  {
    title: "Geo Scaling Strategy",
    icon: <Zap className="text-brand-success" />,
    content: "Localized scaling across Indonesia, Vietnam, Thailand, and Philippines using region-specific creative adaptation and time-zone optimized delivery.",
    bullets: ["Market-specific creative variants", "Local time-zone scheduling", "Regional category dominance"]
  },
  {
    title: "Creative System",
    icon: <PlayCircle className="text-brand-primary" />,
    content: "High-frequency testing cycles focused on UGC and short-form video content, specifically optimized for '3-second hook' retention.",
    bullets: ["UGC & Video-first approach", "Rapid iteration cycles", "Native-style performance ads"]
  }
];

export function EcoRetailFrameworkModal({ isOpen, onClose }: EcoRetailFrameworkModalProps) {
  // ESC key handler
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#050805] border-l border-white/10 h-full shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 sm:p-12 border-b border-white/5 bg-gradient-to-br from-brand-success/10 via-transparent to-transparent">
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/10"
              >
                <X size={20} />
              </button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-success mb-4 block">Growth Framework</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 uppercase italic leading-tight">
                  Scale Framework <br />
                  <span className="text-gradient">Eco-Retail Growth</span>
                </h2>
                <p className="text-slate-400 font-medium text-sm sm:text-base">
                  SEA Multi-Channel CPI Optimization System
                </p>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar space-y-12">
              {/* KPI Section */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Cost Efficiency", value: "35% Lower", sub: "Relative eCPI Reduction" },
                  { label: "Retention", value: "+20%", sub: "Higher Engagement" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <GlassCard className="p-5 border-white/5 bg-white/[0.03]">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">{stat.label}</div>
                      <div className="text-xl font-bold text-brand-success italic">{stat.value}</div>
                      <div className="text-[10px] text-white/40 font-medium">{stat.sub}</div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Sections Staggered */}
              <div className="space-y-12">
                {SECTIONS.map((section, idx) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:border-brand-success/50">
                          {section.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider font-display italic">{section.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                          {section.content}
                        </p>
                        
                        {section.metrics && (
                          <div className="flex flex-wrap gap-2">
                            {section.metrics.map(m => (
                              <span key={m} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-brand-success/60 uppercase font-bold tracking-tight">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        {section.bullets && (
                          <ul className="space-y-2">
                            {section.bullets.map((b, i) => (
                              <li key={i} className="flex items-center gap-3 text-xs text-slate-500">
                                <CheckCircle2 size={12} className="text-brand-success/50" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Outcome Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-brand-success/20 to-transparent border border-brand-success/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={80} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase italic">Framework Outcome</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  By implementing the Multi-Channel Scale Framework, we achieved category dominance in the SEA retail sector, proving that technical layering and region-specific optimization are the keys to sustainable mobile growth.
                </p>
              </motion.div>
            </div>

            {/* No Footer CTA */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
