"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign, Zap, Shield, BarChart2, Globe } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

import { FintechStrategyModal } from '@/components/portfolio/FintechStrategyModal';
import { EcoRetailFrameworkModal } from '@/components/portfolio/EcoRetailFrameworkModal';
import { GamingEngagementModal } from '@/components/portfolio/GamingEngagementModal';
import { SaaSStrategyModal } from '@/components/portfolio/SaaSStrategyModal';

interface CaseStudy {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string; color: string }[];
  tags: string[];
  onView: () => void;
}

export default function PortfolioPage() {
  const [isFintechModalOpen, setIsFintechModalOpen] = useState(false);
  const [isEcoModalOpen, setIsEcoModalOpen] = useState(false);
  const [isGamingModalOpen, setIsGamingModalOpen] = useState(false);
  const [isSaaSModalOpen, setIsSaaSModalOpen] = useState(false);
  const { openGetStarted } = useModals();

  const caseStudies: CaseStudy[] = [
    {
      id: 'fintech',
      badge: 'Featured',
      badgeColor: 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange',
      title: 'Fintech CPA Campaign',
      subtitle: 'United States · 30 Days',
      description: 'Scaled a US-based Fintech app\'s user base with a focus on high-LTV verified actions across Native and Video traffic channels, crushing the client\'s CPA targets.',
      metrics: [
        { label: 'Verified Conversions', value: '38K+', color: 'text-brand-orange' },
        { label: 'Avg. CPA', value: '$4.20', color: 'text-brand-success' },
        { label: 'Conversion Rate', value: '4.8%', color: 'text-white' },
        { label: 'CAC Reduction', value: '42%', color: 'text-brand-purple' },
      ],
      tags: ['CPA', 'Fintech', 'Native', 'Video'],
      onView: () => setIsFintechModalOpen(true),
    },
    {
      id: 'gaming',
      badge: 'CPE Engineering',
      badgeColor: 'bg-brand-purple/10 border-brand-purple/30 text-brand-purple',
      title: 'Global Game Launch CPE',
      subtitle: 'Southeast Asia · Week 1',
      description: 'Engineered a Cost-Per-Engagement strategy for a AAA mobile title, driving 500k+ level completions within the first week with aggressive publisher activation.',
      metrics: [
        { label: 'Total Completions', value: '500K+', color: 'text-brand-purple' },
        { label: 'Day-7 Retention', value: '+28%', color: 'text-brand-success' },
        { label: 'Publisher Reach', value: '150+', color: 'text-white' },
        { label: 'Fraud Rate', value: '0.1%', color: 'text-brand-orange' },
      ],
      tags: ['CPE', 'Gaming', 'SEA', 'Retention'],
      onView: () => setIsGamingModalOpen(true),
    },
    {
      id: 'eco',
      badge: 'CPI Scale',
      badgeColor: 'bg-brand-success/10 border-brand-success/30 text-brand-success',
      title: 'Eco-Retail App Growth',
      subtitle: 'Southeast Asia · Multi-Channel',
      description: 'Multi-channel app install campaign across SEA market, reducing eCPI by 35% while increasing D30 retention by 20% through intelligent audience segmentation.',
      metrics: [
        { label: 'eCPI Reduction', value: '35%↓', color: 'text-brand-success' },
        { label: 'D30 Retention', value: '+20%', color: 'text-brand-orange' },
        { label: 'GEOs Reached', value: '8', color: 'text-white' },
        { label: 'Total Installs', value: '120K+', color: 'text-brand-purple' },
      ],
      tags: ['CPI', 'E-Commerce', 'Retention', 'SEA'],
      onView: () => setIsEcoModalOpen(true),
    },
    {
      id: 'saas',
      badge: 'OEM Traffic',
      badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      title: 'SaaS Market Entry',
      subtitle: 'Europe · B2B Productivity',
      description: 'Strategic European market entry for a B2B productivity app using premium OEM traffic, achieving a 5x Return on Ad Spend through precise demographic targeting.',
      metrics: [
        { label: 'ROAS', value: '5x', color: 'text-blue-400' },
        { label: 'Market Reach', value: '12 EU', color: 'text-brand-success' },
        { label: 'OEM Partners', value: '18+', color: 'text-white' },
        { label: 'Trial Conversion', value: '31%', color: 'text-brand-orange' },
      ],
      tags: ['OEM', 'SaaS', 'B2B', 'Europe'],
      onView: () => setIsSaaSModalOpen(true),
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  } as const;

  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden">
      {/* Modals */}
      <FintechStrategyModal isOpen={isFintechModalOpen} onClose={() => setIsFintechModalOpen(false)} />
      <EcoRetailFrameworkModal isOpen={isEcoModalOpen} onClose={() => setIsEcoModalOpen(false)} />
      <GamingEngagementModal isOpen={isGamingModalOpen} onClose={() => setIsGamingModalOpen(false)} />
      <SaaSStrategyModal isOpen={isSaaSModalOpen} onClose={() => setIsSaaSModalOpen(false)} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/6 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-5">
            <span className="py-1.5 px-4 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold uppercase tracking-widest text-brand-orange">
              Evidence of Impact
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl mb-6 uppercase italic text-white leading-tight"
          >
            Performance <span className="text-gradient">Case Studies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Explosive growth for world-class mobile apps. Data-driven success stories across Fintech, Gaming, SaaS, and E-commerce.
          </motion.p>

          {/* Aggregate stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {[
              { icon: <Users size={16} />, label: '538K+ Total Installs' },
              { icon: <TrendingUp size={16} />, label: '42% Avg. CAC Reduction' },
              { icon: <Shield size={16} />, label: '< 0.2% Avg. Fraud Rate' },
              { icon: <Globe size={16} />, label: '20+ GEOs Reached' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="text-brand-orange">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Cards Grid */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {caseStudies.map((cs) => (
              <motion.div 
                key={cs.id} 
                variants={cardVariants} 
                className="group cursor-pointer"
                onClick={cs.onView}
              >
                <GlassCard className="p-6 md:p-8 border-white/5 bg-white/[0.025] hover:bg-white/[0.04] hover:border-brand-orange/20 transition-all duration-500 h-full flex flex-col gap-5">
                  {/* Top row: badge + title */}
                  <div className="flex flex-col gap-3">
                    <span className={`self-start text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${cs.badgeColor}`}>
                      {cs.badge}
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white uppercase italic leading-tight group-hover:text-brand-orange transition-colors">
                        {cs.title}
                      </h2>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{cs.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">{cs.description}</p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {cs.metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className={`text-lg md:text-xl font-black italic ${m.color}`}>{m.value}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mid-page proof strip */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '38K+', label: 'CPA Conversions', icon: <BarChart2 size={20} /> },
              { value: '5x', label: 'Avg. ROAS', icon: <DollarSign size={20} /> },
              { value: '500K+', label: 'CPE Completions', icon: <Zap size={20} /> },
              { value: '42%', label: 'Lower CAC', icon: <TrendingUp size={20} /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-4xl font-black text-white italic">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/6 blur-[160px] rounded-full -z-10 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold uppercase tracking-widest text-brand-orange">
              Your App Is Next
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white uppercase italic leading-tight">
              Ready to Build Your <br /><span className="text-gradient">Case Study?</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Join the apps already scaling with Adsgrind. Get a free strategy session and see how we can replicate these results for your growth goals.
            </p>
            <div className="flex justify-center pt-2">
              <Button variant="liquid" size="lg" className="w-full sm:w-auto px-10 gap-2 text-base" onClick={openGetStarted}>
                Get Growth Plan <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
