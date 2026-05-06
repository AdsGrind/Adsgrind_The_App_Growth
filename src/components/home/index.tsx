"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Globe2, Zap, Star, CheckCircle2, Activity, ChevronRight } from 'lucide-react';
import { Button, GlassCard, cn, Counter } from '@/components/ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useModals } from '@/context/ModalContext';
import { HeroParticles } from './HeroParticles';

const ThreeHero = dynamic(() => import('./ThreeHero').then((mod) => mod.ThreeHero), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#040404]" />
});

export { BrandsMarquee } from './BrandsMarquee';
import MarketOpportunity from './MarketOpportunity';
import TrafficSources from './TrafficSources';
import AdFormats from './AdFormats';
import AudienceReach from './AudienceReach';
import CaseStudy from './CaseStudy';
import WhyChooseUs from './WhyChooseUs';
import FAQSection from './FAQSection';
import { Target, Eye, TrendingUp } from 'lucide-react';
import { GrowthIndex } from '@/components/ui';

export const HeroSection = () => {
  const { openGetStarted } = useModals();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#000000]">
      {/* Canvas particle grid managed globally */}

      {/* Three.js on desktop */}
      <div className="hidden lg:block absolute inset-0">
        <ThreeHero />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] mb-6 inline-block pb-2 border-b border-white/20
              bg-gradient-to-r from-white/20 via-white to-white/20 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">
              Click. Conversion. Growth
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display font-bold text-5xl sm:text-7xl md:text-[110px] tracking-[-0.04em] mb-6 leading-[0.95] text-white uppercase"
          >
            Engineered<br />
            <span className="text-white">Growth</span>
            <br />
            <span className="text-white/40">Systems</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/50 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Institutional-grade performance marketing.
            <br />Verified CPA infrastructure for global app scaling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={openGetStarted}
              className="px-12 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/90 hover:-translate-y-1"
            >
              Get Growth Plan
            </button>
            <a href="https://wa.me/919625982835" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button className="px-12 py-5 border border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1">
                Strategy Session
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Thin divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
};

export const StatsSection = () => {
  const stats = [
    { label: 'Users Reached', value: 50, suffix: 'M+' },
    { label: 'Verified Conversions', value: 38000, suffix: '+' },
    { label: 'Conversion Rate', value: 4.8, suffix: '%', decimals: 1 },
    { label: 'GEO Coverage', value: 'Global', isStatic: true },
  ];

  return (
    <section className="relative py-24 bg-[#000000]">
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "text-center py-16 px-6 relative",
                idx < 3 && "lg:border-r border-white/10",
                idx % 2 === 0 && "max-lg:border-r border-white/10",
                idx < 2 && "max-lg:border-b border-white/10"
              )}
            >
              <div className="metric-display text-4xl md:text-6xl text-white mb-4">
                {typeof stat.value === 'number' ? (
                  <><Counter value={stat.value} decimals={stat.decimals} />{stat.suffix}</>
                ) : stat.value}
              </div>
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServicesPreview = () => {
  const services = [
    { title: 'App Install (CPI)', desc: 'Enterprise-grade UA infrastructure.', icon: <Zap size={18} /> },
    { title: 'Performance CPA', desc: 'Verified actions. Guaranteed ROI.', icon: <CheckCircle2 size={18} /> },
    { title: 'In-App Engagement', desc: 'High-retention event scaling.', icon: <Activity size={18} /> },
    { title: 'Native & OEM', desc: 'Direct inventory beyond networks.', icon: <Globe2 size={18} /> },
  ];

  return (
    <section className="py-32 bg-[#000000] relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block">Capabilities</span>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white uppercase tracking-[-0.03em] leading-none">
              Performance<br />Infrastructure.
            </h2>
          </div>
          <p className="text-white/40 text-lg max-w-sm mb-2">
            Engineered systems for global app scaling. Pay only for verified conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
          {services.map((service, idx) => (
            <div key={service.title} className={cn(
              "p-12 transition-all duration-300 hover:bg-white/[0.03] group",
              idx < 3 && "lg:border-r border-white/10",
              "border-b lg:border-b-0 border-white/10"
            )}>
              <div className="text-white/20 group-hover:text-white transition-colors mb-8">
                {service.icon}
              </div>
              <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-widest">{service.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    { name: "Alex M.", role: "Growth Lead, US Fintech App", body: "Adsgrind drove 38,000+ verified CPA conversions in 30 days at a $4.20 average CPA. We've worked with 6 agencies — none came close to this ROI.", tag: "Fintech · CPA" },
    { name: "Priya K.", role: "Head of UA, SEA Gaming Studio", body: "500K level completions in week one of launch. The CPE campaign was the highest-converting we've ever run. Zero fraud, clean data.", tag: "Gaming · CPE" },
    { name: "Tom R.", role: "CMO, EU B2B Productivity App", body: "We hit 5x ROAS on OEM traffic we didn't know existed. Their market entry playbook for Europe was structured, data-driven, and fast.", tag: "SaaS · OEM" },
  ];

  return (
    <section className="py-32 bg-[#000000] border-y border-white/10">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 block">Social Proof</span>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white uppercase tracking-[-0.03em]">Market Authority.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
          {testimonials.map((t, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className={cn(
                "p-12 transition-all duration-300 hover:bg-white/[0.02]",
                idx < 2 && "md:border-r border-white/10",
                "border-b md:border-b-0 border-white/10"
              )}
            >
              <div className="flex gap-0.5 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="white" color="white" />)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-12">&ldquo;{t.body}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white font-bold text-xs">{t.name.charAt(0)}</div>
                <div>
                  <div className="font-bold text-white text-xs uppercase tracking-wider">{t.name}</div>
                  <div className="text-white/30 text-[10px] uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const CTASection = () => {
  const { openGetStarted } = useModals();
  return (
    <section className="py-40 bg-[#000000] relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto border border-white/10 p-16 md:p-32 text-center relative hover:bg-white/[0.02] transition-colors duration-500">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-8 block">Deployment</span>
          <h2 className="font-display font-bold text-5xl md:text-8xl mb-10 text-white uppercase tracking-[-0.04em] leading-[0.9]">
            Scale Your<br />Infrastructure.
          </h2>
          <p className="text-white/40 text-lg mb-16 max-w-lg mx-auto leading-relaxed">
            Get an institutional-grade growth plan. Map your path to global user acquisition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={openGetStarted}
              className="px-16 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/90"
            >
              Initiate Growth Plan
            </button>
            <a href="https://wa.me/919625982835" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button className="px-16 py-6 border border-white text-white text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black">
                Strategy Session
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ConnectSection = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C13.93,9.94 13,10.63 12.31,11.47V10.16H9.17V18.5H12.31V12.93C12.31,12.26 12.51,11.7 13.06,11.14C13.59,10.6 14.12,10.42 14.7,10.42C15.93,10.42 16.36,11.3 16.36,12.55V18.5H18.5M4.93,10.16V18.5H8.07V10.16H4.93M6.5,5.64C5.5,5.64 4.69,6.45 4.69,7.45C4.69,8.45 5.5,9.26 6.5,9.26C7.5,9.26 8.31,8.45 8.31,7.45C8.31,6.45 7.5,5.64 6.5,5.64Z" /></svg>,
      href: 'https://www.linkedin.com/company/adsgrindpvt/'
    },
    {
      name: 'Instagram',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2C22,19.4 19.4,22 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M18,4.48L17.2,4.48A1.28,1.28 0 0,0 15.92,5.76V6.56A1.28,1.28 0 0,0 17.2,7.84H18A1.28,1.28 0 0,0 19.28,6.56V5.76A1.28,1.28 0 0,0 18,4.48Z" /></svg>,
      href: 'https://www.instagram.com/adsgrind_the_app_growth?igsh=MWZqcjZuYWFxcGphNg=='
    },
    {
      name: 'Facebook',
      icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>,
      href: 'https://www.facebook.com/share/1DQZokkznf/'
    },
  ];

  return (
    <section className="py-40 bg-[#000000]">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">Reach Out</span>
          <h2 className="font-display font-bold text-4xl md:text-7xl mb-16 tracking-tight text-white uppercase leading-none">
            Institutional<br />Access.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <a
              href="https://wa.me/919625982835"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-12 py-5 border border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
            >
              WhatsApp
            </a>

            <a
              href="https://t.me/Adsgrind_The_App_Growth?text=Hi%20AdsGrind%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-12 py-5 border border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
            >
              Telegram
            </a>
          </div>

          <div className="flex flex-col items-center gap-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Market Connections</span>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                  aria-label={`Follow us on ${link.name}`}
                >
                  <div className="w-5 h-5">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export const AboutUsSection = () => {
  const values = [
    { title: "Scale Systems", icon: <TrendingUp className="text-white" />, desc: "Growth strategies built to scale without efficiency loss." },
    { title: "ROI Engineering", icon: <Target className="text-white" />, desc: "Data-driven decisions backed by attribution tracking." },
    { title: "Global Access", icon: <Eye className="text-white" />, desc: "Direct connections to prime global publisher inventory." },
  ];

  return (
    <section className="py-40 bg-[#000000] relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">Architecture</span>
            <h2 className="font-display font-bold text-5xl md:text-7xl mb-10 uppercase text-white leading-[0.95]">
              Performance<br />Infrastructure.
            </h2>
            <p className="text-white/50 text-xl mb-12 leading-relaxed">
              ADSGRIND is a precision-engineered user acquisition company. We specialized in high-LTV CPA campaigns, delivering verified, fraud-free user actions across global verticals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((v, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-8 h-8 flex items-center justify-center text-white">
                    {v.icon}
                  </div>
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">{v.title}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed uppercase tracking-wider">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative w-full">
            <GrowthIndex className="h-[400px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export {
  MarketOpportunity,
  TrafficSources,
  AdFormats,
  AudienceReach,
  CaseStudy,
  WhyChooseUs,
  FAQSection
};
