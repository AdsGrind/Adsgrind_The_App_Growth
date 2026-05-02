"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Button } from '@/components/ui';
import { Zap, Target, Globe2, ShieldCheck, BarChart3, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceStrategyModal, ServiceType } from '@/components/services/ServiceStrategyModal';
import { useModals } from '@/context/ModalContext';

const SERVICES = [
  {
    title: "App Install Campaigns (CPI)",
    icon: <Zap className="text-brand-red" size={32} />,
    desc: "Scale your user base rapidly with high-quality installs across all major platforms and global inventories.",
    features: ["Global Reach", "Quality Optimization", "Multi-Channel Delivery", "Rapid Scaling"],
    color: "from-[#EE1D23]/20 to-transparent",
    strategyType: 'CPI' as const
  },
  {
    title: "Cost Per Action (CPA)",
    icon: <Target className="text-brand-orange" size={32} />,
    desc: "Pay only for performance. We focus on driving verified user actions—from registrations to in-app purchases.",
    features: ["Verified Conversions", "Strict KPI Adherence", "Action-Based Pricing", "High Intent Users"],
    color: "from-[#FF5800]/20 to-transparent",
    strategyType: 'CPA' as const
  },
  {
    title: "Global User Acquisition",
    icon: <Globe2 className="text-brand-purple" size={32} />,
    desc: "Break into new markets with localized UA strategies. Our global network reaches users in every major GEO.",
    features: ["Localized Campaigns", "Deep GEO Penetration", "Market Intelligence", "24/7 Monitoring"],
    color: "from-[#9D50BB]/20 to-transparent",
    strategyType: 'GLOBAL_UA' as const
  },
  {
    title: "Publisher Solutions",
    icon: <BarChart3 className="text-brand-red" size={32} />,
    desc: "Maximize your app revenue with premium offers from worldwide advertisers and competitive Payouts.",
    features: ["High eCPM Offers", "Competitive Payouts", "Real-Time Stats", "Dedicated Support"],
    color: "from-[#EE1D23]/20 to-transparent",
    strategyType: 'PUBLISHER' as const
  }
];

export default function ServicesPage() {
  const { openGetStarted } = useModals();
  const [activeStrategy, setActiveStrategy] = React.useState<ServiceType | null>(null);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24 text-center mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-3xl md:text-5xl mb-4 uppercase italic text-white leading-tight">
              Our <span className="text-gradient">Core Solutions</span>
            </h1>
            <div className="h-1 w-20 bg-brand-red mx-auto mb-8 rounded-full"></div>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              End-to-end performance marketing technology designed for scalability and measurable growth in the mobile app ecosystem.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-full p-10 flex flex-col relative overflow-hidden group border-white/5 hover:border-white/20 transition-all duration-500">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.color} blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-700`}></div>
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {service.icon}
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white uppercase italic">{service.title}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                
                <div className="space-y-4 mb-12 mt-auto">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                      <CheckCircle2 size={16} className="text-brand-orange" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                    variant="outline" 
                    className="w-full justify-between group/btn border-white/10 hover:border-brand-red/50 text-white"
                    onClick={() => setActiveStrategy(service.strategyType)}
                >
                  Learn Strategy <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </GlassCard>
            </motion.div>
          ))}
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
