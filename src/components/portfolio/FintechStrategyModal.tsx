"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Zap, CheckCircle2, ArrowRight, TrendingUp, Layers, Cpu } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

interface FintechStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "Objective",
    icon: <Target className="text-brand-orange" />,
    content: "Primary goal was to scale a US-based fintech app's user base while maintaining strict CPA targets for verified account creations. We prioritized user quality over pure volume to ensure high-LTV growth.",
    metrics: ["Goal: 30K Conversions", "CPA Cap: Strict"]
  },
  {
    title: "Core Strategy Approach",
    icon: <Cpu className="text-brand-primary" />,
    content: "Implemented a multi-layered attribution and fraud prevention system. We focused on high-intent publisher channels specifically optimized for financial services and digital banking.",
    metrics: ["100% Verified Traffic", "Direct OEM Inventory"]
  },
  {
    title: "High-Intent Traffic Layering",
    icon: <Layers className="text-brand-purple" />,
    content: "Utilized a combination of premium in-app inventory, contextual native placements, and specialized finance-focused affiliates to ensure top-of-funnel quality.",
    bullets: ["Finance-focused publisher matching", "Niche-specific channel filtering", "Real-time traffic quality audits"]
  },
  {
    title: "Scaling Methodology",
    icon: <Zap className="text-brand-orange" />,
    content: "Once the initial KPIs were stabilized, we executed an aggressive vertical scaling strategy, increasing daily volume by 400% while maintaining target CPA efficiency.",
    bullets: ["Automated bid management", "Cross-channel budget reallocation", "Aggressive vertical scaling"]
  }
];

export function FintechStrategyModal({ isOpen, onClose }: FintechStrategyModalProps) {
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

          {/* Drawer / Bottom Sheet (using responsive classes if needed, here focused on Drawer) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#080808] border-l border-white/10 h-full shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 sm:p-12 border-b border-white/5 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent">
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
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 block">Intelligence Report</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 uppercase italic leading-tight">
                  CPA Campaign <br />
                  <span className="text-gradient">Fintech Hero Strategy</span>
                </h2>
                <p className="text-slate-400 font-medium text-sm sm:text-base">
                  38K+ Conversions in 30 Days | High-LTV Acquisition System
                </p>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar space-y-12">
              {/* KPI Section */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Conversions", value: "38K+", sub: "Verified Actions" },
                  { label: "Scale Velocity", value: "Aggressive", sub: "4x Volume Increase" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <GlassCard className="p-5 border-white/5 bg-white/[0.03]">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">{stat.label}</div>
                      <div className="text-xl font-bold text-white italic">{stat.value}</div>
                      <div className="text-[10px] text-brand-orange/60 font-medium">{stat.sub}</div>
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
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:border-brand-primary/50">
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
                              <span key={m} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        {section.bullets && (
                          <ul className="space-y-2">
                            {section.bullets.map((b, i) => (
                              <li key={i} className="flex items-center gap-3 text-xs text-slate-500">
                                <CheckCircle2 size={12} className="text-brand-orange/50" />
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

              {/* Strategic Outcome */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-brand-orange/20 to-transparent border border-brand-orange/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={80} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase italic">Strategic Outcome</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The campaign established a new benchmark for US fintech acquisition. By bridging the gap between high-volume media and high-intent verification, we delivered a sustainable growth engine that continues to scale daily.
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
