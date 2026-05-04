"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Zap, CheckCircle2, ArrowRight, TrendingUp, Gamepad2, Users, Trophy, Activity, Layers, PlayCircle, Cpu, Globe2 } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

interface GamingEngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "Objective",
    icon: <Target className="text-brand-purple" />,
    content: "Focused on aggressive Cost-Per-Engagement (CPE) optimization rather than simple installs, ensuring every dollar spent drives meaningful in-game interactions.",
    metrics: ["Primary Focus: CPE Efficiency"]
  },
  {
    title: "Engagement Acquisition Model",
    icon: <Gamepad2 className="text-brand-primary" />,
    content: "A precise funnel tracking the journey from Install to First Gameplay, culminating in deep level-completion optimization logic.",
    bullets: ["Install → Interaction tracking", "Engagement-based bid logic", "Deep-funnel signal mapping"]
  },
  {
    title: "Multi-Layer Funnel System",
    icon: <Layers className="text-brand-purple" />,
    content: "A three-tier approach to user flow: Global Acquisition, Activation Layer for first-interaction optimization, and a Retention Layer for repeat gameplay loops.",
    bullets: ["Global Acquisition Layer", "Activation Optimization", "Retention Loop Engineering"]
  },
  {
    title: "Engagement Optimization Engine",
    icon: <Activity className="text-brand-success" />,
    content: "Real-time bidding based on level completion velocity and traffic quality scoring derived from sophisticated in-game behavior analysis.",
    bullets: ["Level-completion bidding", "Behavioral quality scoring", "Creative-to-game alignment"]
  },
  {
    title: "Creative Strategy System",
    icon: <PlayCircle className="text-brand-purple" />,
    content: "Utilizing real gameplay footage, challenge-based hooks, and progress-driven storytelling to align ad creative with the actual user experience.",
    bullets: ["Real gameplay assets", "Challenge-based hooks", "Progressive storytelling"]
  },
  {
    title: "Global Scaling System",
    icon: <Globe2 className="text-brand-orange" />,
    content: "Executing simultaneous multi-region launches with real-time budget redistribution and market-specific optimization loops for peak efficiency.",
    bullets: ["Multi-region execution", "Real-time redistribution", "Regional optimization loops"]
  },
  {
    title: "Performance Intelligence Layer",
    icon: <Cpu className="text-brand-primary" />,
    content: "Sophisticated cohort tracking (D0–D3 engagement), drop-off heatmaps, and automated traffic quality filtering to ensure scale stability.",
    bullets: ["D0–D3 Cohort analysis", "Drop-off heatmap mapping", "Automated quality filters"]
  }
];

export function GamingEngagementModal({ isOpen, onClose }: GamingEngagementModalProps) {
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#050508] border-l border-white/10 h-full shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Header */}
            <div className="p-8 sm:p-12 border-b border-white/5 bg-gradient-to-br from-brand-purple/20 via-[#080508] to-transparent relative z-10">
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
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple mb-4 block">Intelligence Dashboard</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                  Engagement System <br />
                  <span className="text-gradient">Global Game Launch</span>
                </h2>
                
                {/* KPI Highlight Chips */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {["500K+ Level Completions", "7-Day Global Launch", "High-Intensity Scaling"].map((chip, idx) => (
                    <span key={chip} className="px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[9px] font-bold text-brand-purple uppercase tracking-wider">
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar space-y-12 relative z-10">
              {/* Results Highlight */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Engagement", value: "500K+", sub: "Level Completions", color: "text-brand-purple" },
                  { label: "Launch Velocity", value: "Explosive", sub: "Global Dominance", color: "text-brand-orange" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-default"
                  >
                    <GlassCard className="p-5 border-white/5 bg-white/[0.03] group transition-all duration-500 hover:border-brand-purple/30">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">{stat.label}</div>
                      <div className={`text-xl font-bold italic group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all ${stat.color}`}>{stat.value}</div>
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
                    className="relative group"
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-brand-purple/50 group-hover:bg-brand-purple/10">
                          {section.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider font-display italic group-hover:text-brand-purple transition-colors">{section.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                          {section.content}
                        </p>
                        
                        {section.metrics && (
                          <div className="flex flex-wrap gap-2">
                            {section.metrics.map(m => (
                              <span key={m} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-brand-purple/60 uppercase font-bold tracking-tight">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        {section.bullets && (
                          <ul className="space-y-2">
                            {section.bullets.map((b, i) => (
                              <li key={i} className="flex items-center gap-3 text-xs text-slate-500">
                                <CheckCircle2 size={12} className="text-brand-purple/50" />
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-brand-purple/20 to-transparent border border-brand-purple/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={80} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase italic">Global Outcome</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The campaign established a new benchmark for AAA mobile gaming launches. By bridging the gap between high-volume acquisition and deep-funnel engagement loops, we delivered a massive, active player base that sustained momentum long after the initial launch window.
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
