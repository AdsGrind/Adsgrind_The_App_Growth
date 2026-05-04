"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Zap, CheckCircle2, ArrowRight, TrendingUp, Globe2, Briefcase, BarChart, Shield, Cpu, Layers } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

interface SaaSStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "Objective",
    icon: <Target className="text-brand-primary" />,
    content: "Strategic European SaaS market entry leveraging a Direct User Acquisition (UA) architecture combined with premium OEM traffic for maximum trust and conversion.",
    metrics: ["Goal: Strategic EU Entry"]
  },
  {
    title: "Premium OEM Strategy",
    icon: <Shield className="text-brand-success" />,
    content: "Positioning the app directly on premium business-tier devices to secure high-intent, device-native exposure while reducing reliance on saturated auction channels.",
    bullets: ["High-intent native positioning", "Reduced auction dependency", "Trust-first exposure system"]
  },
  {
    title: "European Market Segmentation",
    icon: <Globe2 className="text-brand-primary" />,
    content: "Clustered expansion targeting Tier 1 markets (DE, UK, FR, NL) and Tier 2 (ES, IT, Nordics) with localized efficiency clusters in Eastern Europe.",
    bullets: ["Tier 1: DE, UK, FR, NL", "Tier 2: ES, IT, Nordics", "Eastern Europe test clusters"]
  },
  {
    title: "Direct UA Engine",
    icon: <Cpu className="text-brand-primary" />,
    content: "A proprietary engine focused on high-quality intent filtering and device-based behavior scoring to ensure only the most relevant users enter the funnel.",
    bullets: ["High-quality intent filtering", "Behavior-based scoring", "Controlled scaling guardrails"]
  },
  {
    title: "ROAS Optimization System",
    icon: <TrendingUp className="text-brand-success" />,
    content: "Value-based bidding logic integrated with post-click conversion tracking to maintain strict ROI-first scaling thresholds across all regions.",
    bullets: ["Value-based bid logic", "Post-click conversion tracking", "ROI-first thresholds"]
  },
  {
    title: "Funnel Architecture",
    icon: <Layers className="text-brand-primary" />,
    content: "Streamlined architecture optimizing the journey from Acquisition to Activation, utilizing usage-based signals to drive long-term user value.",
    bullets: ["Acquisition → Value tracking", "Fast onboarding optimization", "Usage-based engagement signals"]
  },
  {
    title: "Scaling System",
    icon: <Zap className="text-brand-success" />,
    content: "Systematic market-by-market expansion using ROAS cluster analysis and OEM scaling with integrated quality guardrails.",
    bullets: ["Market-by-market expansion", "ROAS cluster redistribution", "Quality-controlled OEM scaling"]
  }
];

export function SaaSStrategyModal({ isOpen, onClose }: SaaSStrategyModalProps) {
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
            {/* Header */}
            <div className="p-8 sm:p-12 border-b border-white/5 bg-gradient-to-br from-brand-primary/20 via-[#0a0a0f] to-transparent relative z-10">
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
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-4 block">Market Blueprint</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                  Entry Strategy <br />
                  <span className="text-gradient">SaaS Market Entry</span>
                </h2>
                
                {/* KPI Highlight Chips */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {["5x ROAS Achieved", "European Market Entry", "Premium OEM Traffic"].map((chip) => (
                    <span key={chip} className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[9px] font-bold text-brand-primary uppercase tracking-wider">
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
                  { label: "Performance", value: "5x ROAS", sub: "LTV-Adjusted ROI", color: "text-brand-primary" },
                  { label: "Market Reach", value: "EU Leader", sub: "Tier-1 Penetration", color: "text-brand-success" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-default"
                  >
                    <GlassCard className="p-5 border-white/5 bg-white/[0.03] group transition-all duration-500 hover:border-brand-primary/30">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-bold">{stat.label}</div>
                      <div className={`text-xl font-bold italic group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all ${stat.color}`}>{stat.value}</div>
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
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-brand-primary/50 group-hover:bg-brand-primary/10">
                          {section.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider font-display italic group-hover:text-brand-primary transition-colors">{section.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                          {section.content}
                        </p>
                        
                        {section.metrics && (
                          <div className="flex flex-wrap gap-2">
                            {section.metrics.map(m => (
                              <span key={m} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-brand-primary/60 uppercase font-bold tracking-tight">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        {section.bullets && (
                          <ul className="space-y-2">
                            {section.bullets.map((b, i) => (
                              <li key={i} className="flex items-center gap-3 text-xs text-slate-500">
                                <CheckCircle2 size={12} className="text-brand-primary/50" />
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

              {/* Outcome Insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-brand-primary/20 to-transparent border border-brand-primary/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={80} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 uppercase italic">Market Outcome</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The SaaS Market Entry campaign proved that enterprise growth is about precision and trust. By bypassing traditional auction friction and utilizing device-native Direct UA, we achieved a sustainable, high-ROAS footprint across the most competitive European markets.
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
