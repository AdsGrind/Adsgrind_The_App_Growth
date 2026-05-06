"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign, Zap, Shield, BarChart2, Globe } from 'lucide-react';
import { Button, GlassCard, cn } from '@/components/ui';
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
      badgeColor: 'bg-white/5 border-white/20 text-white',
      title: 'Fintech CPA Campaign',
      subtitle: 'United States · 30 Days',
      description: 'Scaled a US-based Fintech app\'s user base with a focus on high-LTV verified actions across Native and Video traffic channels, crushing the client\'s CPA targets.',
      metrics: [
        { label: 'Verified Conversions', value: '38K+', color: 'text-white' },
        { label: 'Avg. CPA', value: '$4.20', color: 'text-white/60' },
        { label: 'Conversion Rate', value: '4.8%', color: 'text-white/40' },
        { label: 'CAC Reduction', value: '42%', color: 'text-white' },
      ],
      tags: ['CPA', 'Fintech', 'Native', 'Video'],
      onView: () => setIsFintechModalOpen(true),
    },
    {
      id: 'gaming',
      badge: 'CPE Engineering',
      badgeColor: 'bg-white/5 border-white/20 text-white',
      title: 'Global Game Launch CPE',
      subtitle: 'Southeast Asia · Week 1',
      description: 'Engineered a Cost-Per-Engagement strategy for a AAA mobile title, driving 500k+ level completions within the first week with aggressive publisher activation.',
      metrics: [
        { label: 'Total Completions', value: '500K+', color: 'text-white' },
        { label: 'Day-7 Retention', value: '+28%', color: 'text-white/60' },
        { label: 'Publisher Reach', value: '150+', color: 'text-white/40' },
        { label: 'Fraud Rate', value: '0.1%', color: 'text-white' },
      ],
      tags: ['CPE', 'Gaming', 'SEA', 'Retention'],
      onView: () => setIsGamingModalOpen(true),
    },
    {
      id: 'eco',
      badge: 'CPI Scale',
      badgeColor: 'bg-white/5 border-white/20 text-white',
      title: 'Eco-Retail App Growth',
      subtitle: 'Southeast Asia · Multi-Channel',
      description: 'Multi-channel app install campaign across SEA market, reducing eCPI by 35% while increasing D30 retention by 20% through intelligent audience segmentation.',
      metrics: [
        { label: 'eCPI Reduction', value: '35%↓', color: 'text-white' },
        { label: 'D30 Retention', value: '+20%', color: 'text-white/60' },
        { label: 'GEOs Reached', value: '8', color: 'text-white/40' },
        { label: 'Total Installs', value: '120K+', color: 'text-white' },
      ],
      tags: ['CPI', 'E-Commerce', 'Retention', 'SEA'],
      onView: () => setIsEcoModalOpen(true),
    },
    {
      id: 'saas',
      badge: 'OEM Traffic',
      badgeColor: 'bg-white/5 border-white/20 text-white',
      title: 'SaaS Market Entry',
      subtitle: 'Europe · B2B Productivity',
      description: 'Strategic European market entry for a B2B productivity app using premium OEM traffic, achieving a 5x Return on Ad Spend through precise demographic targeting.',
      metrics: [
        { label: 'ROAS', value: '5x', color: 'text-white' },
        { label: 'Market Reach', value: '12 EU', color: 'text-white/60' },
        { label: 'OEM Partners', value: '18+', color: 'text-white/40' },
        { label: 'Trial Conversion', value: '31%', color: 'text-white' },
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
    <div className="bg-[#000000] min-h-screen overflow-x-hidden">
      {/* Modals */}
      <FintechStrategyModal isOpen={isFintechModalOpen} onClose={() => setIsFintechModalOpen(false)} />
      <EcoRetailFrameworkModal isOpen={isEcoModalOpen} onClose={() => setIsEcoModalOpen(false)} />
      <GamingEngagementModal isOpen={isGamingModalOpen} onClose={() => setIsGamingModalOpen(false)} />
      <SaaSStrategyModal isOpen={isSaaSModalOpen} onClose={() => setIsSaaSModalOpen(false)} />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/20 pb-2">Evidence of Impact</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-5xl md:text-8xl mb-12 uppercase leading-[0.95] text-white tracking-[-0.04em]"
          >
            Performance<br />
            <span className="text-white/40">Case Studies.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto"
          >
            Explosive growth for world-class mobile apps. Data-driven success stories across Fintech, Gaming, SaaS, and E-commerce.
          </motion.p>

          {/* Aggregate stats strip - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              { icon: <Users size={16} />, label: '538K+ Total Installs' },
              { icon: <TrendingUp size={16} />, label: '42% Avg. CAC Reduction' },
              { icon: <Shield size={16} />, label: '< 0.2% Avg. Fraud Rate' },
              { icon: <Globe size={16} />, label: '20+ GEOs Reached' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                <span className="text-white/20">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Cards Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10"
          >
            {caseStudies.map((cs, idx) => (
              <motion.div 
                key={cs.id} 
                variants={cardVariants} 
                className={cn(
                    "group cursor-pointer p-12 hover:bg-white/[0.02] transition-all duration-500",
                    idx % 2 === 0 && "md:border-r border-white/10",
                    idx < 2 && "border-b border-white/10",
                    idx >= 2 && "border-b md:border-b-0 border-white/10"
                )}
                onClick={cs.onView}
              >
                  {/* Top row: badge + title */}
                  <div className="flex flex-col gap-6 mb-10">
                    <span className="self-start text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/20 pb-1">
                      {cs.badge}
                    </span>
                    <div>
                      <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                        {cs.title}
                      </h2>
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-4">{cs.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed mb-12 max-w-md">{cs.description}</p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    {cs.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="text-3xl font-bold text-white tracking-tighter mb-2">{m.value}</div>
                        <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-4">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-white/20 border border-white/10 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mid-page proof strip */}
      <section className="py-24 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: '38K+', label: 'CPA Conversions', icon: <BarChart2 size={20} /> },
              { value: '5x', label: 'Avg. ROAS', icon: <DollarSign size={20} /> },
              { value: '500K+', label: 'CPE Completions', icon: <Zap size={20} /> },
              { value: '42%', label: 'Lower CAC', icon: <TrendingUp size={20} /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/40">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.5em] text-white/30">
              Inquiry Protocol
            </span>
            <h2 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-[-0.04em] leading-none">
              Deploy Your<br />
              <span className="text-white/40">Success Case.</span>
            </h2>
            <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed">
              Join the apps already scaling with Adsgrind infrastructure. Get a free strategy session and see how we can replicate these results for your growth goals.
            </p>
            <div className="flex justify-center pt-8">
              <button 
                className="px-20 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white/90" 
                onClick={openGetStarted}
              >
                Initiate Growth Audit
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
