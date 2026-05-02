"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, BarChart, Zap, Globe, CheckCircle2, ArrowRight, MousePointer2, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui';

export type ServiceType = 'CPI' | 'CPA' | 'GLOBAL_UA' | 'PUBLISHER';

interface StrategyStep {
  number: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  bullets: string[];
}

interface ServiceStrategy {
  title: string;
  accentTitle: string;
  subheading: string;
  steps: StrategyStep[];
  ctaText: string;
  ctaLink?: string;
}

const STRATEGIES: Record<ServiceType, ServiceStrategy> = {
  CPI: {
    title: "App Install Campaign",
    accentTitle: "Strategy (CPI)",
    subheading: "How we scale high-quality users — not just installs. A step-by-step system for global mobile growth.",
    ctaText: "Start Your CPI Campaign",
    steps: [
      {
        number: "01",
        title: "Targeting & Market Intelligence",
        icon: <Target className="text-brand-red" />,
        desc: "We analyze your app's unique value proposition and user demographics to build a data-driven foundation for acquisition.",
        bullets: ["High-intent audience profiling", "GEO-specific market insights", "Competitor landscape analysis"]
      },
      {
        number: "02",
        title: "Publisher & Channel Selection",
        icon: <Globe className="text-brand-orange" />,
        desc: "We leverage our network of 1000+ publishers to match your app with the highest-converting channels.",
        bullets: ["Premium OEM & In-app inventory", "Niche-specific channel mapping", "Real-time fraud filtering"]
      },
      {
        number: "03",
        title: "Performance Optimization",
        icon: <BarChart className="text-brand-purple" />,
        desc: "Our AI-driven systems continuously monitor and refine your campaign parameters for maximum ROI.",
        bullets: ["Sub-second KPI tracking", "Creative A/B testing", "Automated budget reallocation"]
      },
      {
        number: "04",
        title: "Scaling & Expansion",
        icon: <Zap className="text-brand-red" />,
        desc: "Once we hit your target KPIs, we vertically scale your campaign to dominate your market category.",
        bullets: ["Global GEO expansion", "Tier 1 scale stability", "Sustainable growth management"]
      }
    ]
  },
  CPA: {
    title: "Performance-Based",
    accentTitle: "Action Strategy (CPA)",
    subheading: "Drive deeper engagement. We focus on post-install actions that actually impact your bottom line.",
    ctaText: "Start Your CPA Campaign",
    steps: [
      {
        number: "01",
        title: "KPI & Goal Definition",
        icon: <MousePointer2 className="text-brand-orange" />,
        desc: "We define the high-value actions (registrations, purchases, level-ups) that matter most to your business.",
        bullets: ["Action-value mapping", "Conversion window tuning", "Event tracking audit"]
      },
      {
        number: "02",
        title: "Funnel Optimization",
        icon: <TrendingUp className="text-brand-purple" />,
        desc: "We analyze the entire user journey to eliminate friction and maximize conversion rates at every stage.",
        bullets: ["User flow analysis", "Deep-linking integration", "Attribution path verification"]
      },
      {
        number: "03",
        title: "High-Intent Sourcing",
        icon: <Target className="text-brand-red" />,
        desc: "Accessing specialized publisher inventory that consistently delivers users who complete target actions.",
        bullets: ["Niche publisher matching", "Quality-score filtering", "Post-back data enrichment"]
      },
      {
        number: "04",
        title: "ROI-Focused Scaling",
        icon: <Zap className="text-brand-orange" />,
        desc: "Scaling only the channels that meet your strict cost-per-action requirements for guaranteed profitability.",
        bullets: ["Vertical budget scaling", "LTV-based optimization", "Fraud-free action delivery"]
      }
    ]
  },
  GLOBAL_UA: {
    title: "Global User",
    accentTitle: "Acquisition Strategy",
    subheading: "Go beyond borders. We bridge the gap between your app and the next billion smartphone users.",
    ctaText: "Expand Globally Now",
    steps: [
      {
        number: "01",
        title: "GEO Research & Intelligence",
        icon: <Globe className="text-brand-purple" />,
        desc: "Identifying high-potential markets by analyzing local competition, user behavior, and market saturation.",
        bullets: ["Tier 1-3 market analysis", "Cultural trend mapping", "Localized keyword research"]
      },
      {
        number: "02",
        title: "Multi-Channel Entry",
        icon: <Zap className="text-brand-red" />,
        desc: "Deploying a diversified mix of local OEM, social, and in-app channels to ensure maximum regional visibility.",
        bullets: ["Localized OEM partnerships", "Region-specific network mapping", "Multi-platform presence"]
      },
      {
        number: "03",
        title: "Localized Creative Strategy",
        icon: <TrendingUp className="text-brand-orange" />,
        desc: "Developing and testing creative assets that resonate with local cultures and linguistic nuances.",
        bullets: ["Cultural-specific A/B testing", "Native language copywriting", "Localized visual assets"]
      },
      {
        number: "04",
        title: "Market Dominance",
        icon: <BarChart className="text-brand-purple" />,
        desc: "Steadily scaling volume to reach and maintain top category rankings in your target global regions.",
        bullets: ["Regional category scaling", "Sustained volume stability", "Global scale management"]
      }
    ]
  },
  PUBLISHER: {
    title: "Premium Publisher",
    accentTitle: "Growth Strategy",
    subheading: "Maximize your app's yield with direct access to global premium advertisers and high-eCPM offers.",
    ctaText: "Join as a Publisher",
    ctaLink: "https://adsgrind.offer18.com/m/signup_self_aff?r=&am=",
    steps: [
      {
        number: "01",
        title: "Inventory Audit & Integration",
        icon: <PieChart className="text-brand-red" />,
        desc: "We perform a technical audit of your inventory to ensure seamless offer delivery and maximum fill rates.",
        bullets: ["SDK/API integration support", "Inventory quality check", "Placement optimization"]
      },
      {
        number: "02",
        title: "High-Yield Offer Matching",
        icon: <Zap className="text-brand-orange" />,
        desc: "Connecting your specific audience with premium global offers that deliver the highest possible eCPMs.",
        bullets: ["Direct advertiser access", "Vertical-specific offers", "Exclusive global campaigns"]
      },
      {
        number: "03",
        title: "Real-Time Yield Management",
        icon: <BarChart className="text-brand-purple" />,
        desc: "Our systems monitor performance in real-time, automatically routing traffic to the highest-performing offers.",
        bullets: ["Live eCPM monitoring", "Automated offer rotation", "Fill-rate maximization"]
      },
      {
        number: "04",
        title: "Consistent Scaling & Payouts",
        icon: <TrendingUp className="text-brand-red" />,
        desc: "Driving predictable revenue growth with reliable, competitive Payouts and dedicated account management.",
        bullets: ["Competitive financial stability", "Transparent reporting", "Dedicated growth support"]
      }
    ]
  }
};

interface ServiceStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCtaClick: () => void;
  serviceType: ServiceType;
}

export function ServiceStrategyModal({ isOpen, onClose, onCtaClick, serviceType }: ServiceStrategyModalProps) {
  const strategy = STRATEGIES[serviceType];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="relative w-full max-w-4xl bg-[#0B0B0B] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="p-8 sm:p-12 border-b border-white/5 relative">
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block">Proven Framework</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 uppercase italic">
                  {strategy.title} <span className="text-gradient">{strategy.accentTitle}</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  {strategy.subheading}
                </p>
              </div>
            </div>

            {/* Strategy Steps */}
            <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.01]">
              {strategy.steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-brand-red font-display italic group-hover:bg-brand-red group-hover:text-white transition-all">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                      {step.desc}
                    </p>
                    <ul className="space-y-3">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs text-slate-400">
                          <CheckCircle2 size={14} className="text-brand-red/50" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer / CTA */}
            <div className="p-8 sm:p-12 bg-white/[0.02] border-t border-white/5 text-center">
              <h4 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">Ready to dominate your category?</h4>
              <p className="text-slate-500 text-sm mb-8">Scale your performance with our data-driven systems.</p>
              <div className="flex justify-center">
                <Button 
                  variant="liquid" 
                  size="lg" 
                  className="px-12 group"
                  onClick={() => {
                    if (strategy.ctaLink) {
                      window.open(strategy.ctaLink, '_blank', 'noopener,noreferrer');
                    } else {
                      onClose();
                      onCtaClick();
                    }
                  }}
                >
                  {strategy.ctaText}
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
