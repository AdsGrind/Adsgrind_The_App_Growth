"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Button, cn } from '@/components/ui';
import { Zap, Target, Globe2, ShieldCheck, BarChart3, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceStrategyModal, ServiceType } from '@/components/services/ServiceStrategyModal';
import { useModals } from '@/context/ModalContext';

const SERVICES = [
  {
    title: "App Install (CPI)",
    icon: <Zap className="text-white" size={24} />,
    desc: "Scale your user base rapidly with high-quality installs across all major platforms and global inventories.",
    features: ["Global Reach", "Quality Optimization", "Multi-Channel Delivery", "Rapid Scaling"],
    strategyType: 'CPI' as const
  },
  {
    title: "Cost Per Action (CPA)",
    icon: <Target className="text-white" size={24} />,
    desc: "Pay only for performance. We focus on driving verified user actions—from registrations to in-app purchases.",
    features: ["Verified Conversions", "Strict KPI Adherence", "Action-Based Pricing", "High Intent Users"],
    strategyType: 'CPA' as const
  },
  {
    title: "Global User Acquisition",
    icon: <Globe2 className="text-white" size={24} />,
    desc: "Break into new markets with localized UA strategies. Our global network reaches users in every major GEO.",
    features: ["Localized Campaigns", "Deep GEO Penetration", "Market Intelligence", "24/7 Monitoring"],
    strategyType: 'GLOBAL_UA' as const
  },
  {
    title: "Publisher Solutions",
    icon: <BarChart3 className="text-white" size={24} />,
    desc: "Maximize your app revenue with premium offers from worldwide advertisers and competitive Payouts.",
    features: ["High eCPM Offers", "Competitive Payouts", "Real-Time Stats", "Dedicated Support"],
    strategyType: 'PUBLISHER' as const
  }
];

export default function ServicesPage() {
  const { openGetStarted } = useModals();
  const [activeStrategy, setActiveStrategy] = React.useState<ServiceType | null>(null);

  return (
    <div className="pt-32 pb-20 bg-[#000000] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mb-32 mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
             <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/20 pb-2 mb-10 block">Infrastructure</span>
            <h1 className="font-display font-bold text-5xl md:text-8xl mb-12 uppercase text-white leading-none tracking-[-0.04em]">
              Precision<br />Infrastructure.
            </h1>
            <p className="text-white/40 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              End-to-end performance marketing technology designed for scalability and measurable growth in the global mobile ecosystem.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-16 hover:bg-white/[0.02] transition-all duration-500",
                idx % 2 === 0 && "md:border-r border-white/10",
                idx < 2 && "border-b border-white/10",
                idx >= 2 && "border-b md:border-b-0 border-white/10"
              )}
            >
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10 text-white">
                  {service.icon}
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight leading-none">{service.title}</h2>
                <p className="text-white/40 mb-12 leading-relaxed text-sm">
                  {service.desc}
                </p>
                
                <div className="space-y-4 mb-16">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-[10px] text-white/60 font-bold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-white/20" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button 
                    className="w-full py-4 border border-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black"
                    onClick={() => setActiveStrategy(service.strategyType)}
                >
                  Learn Strategy
                </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-40 border border-white/10 p-16 md:p-32 text-center hover:bg-white/[0.02] transition-all duration-500">
             <h2 className="text-4xl md:text-7xl font-bold mb-12 uppercase text-white tracking-[-0.03em] leading-none">Ready to Scale?</h2>
             <button 
                className="px-16 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/90" 
                onClick={openGetStarted}
              >
                Initiate Growth Audit
              </button>
        </div>
      </div>

      {activeStrategy && (
        <ServiceStrategyModal 
          isOpen={!!activeStrategy} 
          serviceType={activeStrategy}
          onClose={() => setActiveStrategy(null)} 
          onCtaClick={openGetStarted}
        />
      )}
    </div>
  );
}
