"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, BarChart3, Globe2, MessageSquare, Zap, Star, CheckCircle2 } from 'lucide-react';
import { Button, GlassCard, cn, Counter } from '@/components/ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useModals } from '@/context/ModalContext';

const ThreeHero = dynamic(() => import('./ThreeHero').then((mod) => mod.ThreeHero), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-950 transition-colors duration-500" />
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

const partners = [
  { name: 'Partner 1', logo: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2,18L7,12L2,6H8.5L12,10.5L15.5,6H22L17,12L22,18H15.5L12,13.5L8.5,18H2Z" /></svg> },
  { name: 'Partner 2', logo: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 12,6Z" /></svg> },
  { name: 'FloatMe', logo: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" /></svg> },
  { name: 'Handshake', logo: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14M4,8V19H20V8H4M12,10L15,13L12,16L9,13L12,10Z" /></svg> },
  { name: 'Scribd', logo: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11,4H13V15.5A3.5,3.5 0 0,1 9.5,19A3.5,3.5 0 0,1 6,15.5H8A1.5,1.5 0 0,0 9.5,17A1.5,1.5 0 0,0 9.5,14V4M18,15.5A3.5,3.5 0 0,1 14.5,19A3.5,3.5 0 0,1 11,15.5H13A1.5,1.5 0 0,0 14.5,17A1.5,1.5 0 0,0 16,15.5V4H18V15.5Z" /></svg> },
  { name: 'Partner 6', logo: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7,2H17L13.5,9H17L10,22V14H7V2Z" /></svg> },
];

export const HeroSection = () => {
  const { openGetStarted } = useModals();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#050505]">
      <div className="hidden md:block absolute inset-0 -z-10">
        <ThreeHero />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-bold tracking-widest uppercase mb-6 text-brand-primary animate-pulse">
            Click. Conversion. Growth.
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-7xl lg:text-8xl tracking-tight mb-8 leading-[1.3] md:leading-[1.1] !text-slate-50 uppercase italic drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
            <span className="!text-slate-50">Global User</span> <br />
            <span className="text-gradient">Acquisition</span> <span className="!text-slate-50">Marketing</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Helping mobile apps grow through scalable, high-performance user acquisition campaigns that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Button variant="liquid" size="lg" className="w-full sm:w-auto gap-2 px-8 md:px-12" onClick={openGetStarted}>
              Get Started <ArrowRight size={20} />
            </Button>
            <a 
              href="https://adsgrind.offer18.com/m/signup_self_aff?r=&am=" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full px-8 md:px-12 border-brand-orange/20 text-brand-orange hover:bg-brand-orange/5 hover:scale-105 hover:-translate-y-1 transition-all">
                Become a Publisher
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const StatsSection = () => {
  const stats = [
    { label: 'Users Reached', value: 50, suffix: '+ Millions' },
    { label: 'Verified Conversions', value: 38000, suffix: '+' },
    { label: 'Conversion Rate', value: 4.8, suffix: '%', decimals: 1 },
    { label: 'GEO Coverage', value: 'Global', isStatic: true },
  ];

  return (
    <section className="py-24 bg-slate-950 transition-colors duration-500 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="text-2xl md:text-5xl font-display font-bold text-gradient mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                {typeof stat.value === 'number' ? (
                  <>
                    <Counter value={stat.value} decimals={stat.decimals} />
                    {stat.suffix}
                  </>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[8px] md:text-sm font-bold uppercase tracking-widest leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ServicesPreview = () => {
  const advertiserServices = [
    { title: 'App Install Campaigns (CPI)', desc: 'High-quality user acquisition at scale.', icon: <Zap /> },
    { title: 'Cost Per Action (CPA)', desc: 'Pay only for verified user actions.', icon: <CheckCircle2 /> },
    { title: 'Mobile User Acquisition', desc: 'Targeted reach across top platforms.', icon: <Globe2 /> },
    { title: 'Global App Marketing', desc: 'Strategic expansion into new markets.', icon: <ArrowRight /> },
  ];

  const publisherServices = [
    { title: 'High-Converting Offers', desc: 'Access to premium worldwide campaigns.', icon: <Star /> },
    { title: 'Competitive Payouts', desc: 'Best-in-class rates for your traffic.', icon: <BarChart3 /> },
    { title: 'Real-Time Reporting', desc: 'Monitor performance with sub-second lag.', icon: <Zap /> },
    { title: 'Fraud Protection', desc: 'Advanced detection to safeguard revenue.', icon: <CheckCircle2 /> },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#080808]/50 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 text-center lg:text-left">
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-6xl mb-6 text-white uppercase italic">Leading Solutions</h2>
          <p className="text-slate-400 text-base md:text-lg">We provide end-to-end performance marketing technology for the entire mobile ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Advertisers */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-primary flex items-center gap-3 uppercase tracking-wider">
              <span className="w-8 h-[2px] bg-brand-primary"></span> For Advertisers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {advertiserServices.map((service, idx) => (
                <GlassCard key={service.title} className="p-6 md:p-8 border-brand-primary/10 hover:border-brand-primary/40 group transition-all duration-500 text-left">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 md:mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-base md:text-lg font-bold mb-2 text-white">{service.title}</h4>
                  <p className="text-slate-400 text-xs md:text-sm">{service.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Publishers */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-orange flex items-center gap-3 uppercase tracking-wider">
              <span className="w-8 h-[2px] bg-brand-orange"></span> For Publishers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publisherServices.map((service, idx) => (
                <GlassCard key={service.title} className="p-8 border-brand-orange/10 hover:border-brand-orange/40 group transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/5 dark:bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-base md:text-lg font-bold mb-2 text-white">{service.title}</h4>
                  <p className="text-slate-400 text-sm">{service.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechFlow",
      body: "Adsgrind transformed our digital presence. Our organic traffic grew by 300% in just 6 months.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager, GlobalEdu",
      body: "The most technical and results-driven agency we've ever worked with. Truly a partner in our growth.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-slate-950 border-y border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4 text-white">Client Success Stories</h2>
          <p className="text-slate-500 dark:text-slate-400">Trusted by leading companies worldwide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <GlassCard key={idx} className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#7C3AED" color="#7C3AED" />
                ))}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">"{t.body}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-brand"></div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export const CTASection = () => {
  const { openGetStarted } = useModals();
  return (
    <section className="py-32 bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent-start/10 dark:bg-brand-accent-start/20 blur-[150px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6">
        <GlassCard className="max-w-5xl mx-auto p-12 md:p-20 text-center relative overflow-hidden border-brand-accent-start/10 dark:border-brand-accent-start/20">
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-8 leading-[1.2] text-white overflow-visible">Ready to Scale Your <br /><span className="text-gradient inline-block pb-1">Brand to New Heights?</span></h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Stop guessing and start growing. Our data-driven strategies are waiting for you. Get a free audit and consultation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-12" onClick={openGetStarted}>Contact Sales</Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-success" /> No Credit Card Required</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-success" /> 24-Hour Response Guarantee</span>
          </div>
        </GlassCard>
      </div>
    </section>
  )
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
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-12 tracking-tight text-white uppercase italic">
            REACH OUT TO US
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <motion.a
              href="https://wa.me/919625982835"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-black rounded-full font-bold transition-all shadow-lg hover:shadow-[#25D366]/20 text-center"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 15.5 17.38 18.23 13.88 18.23C13.83 18.23 13.78 18.23 13.73 18.23C13.68 18.23 13.64 18.21 13.59 18.19L11.53 17.53L10.94 17.9L8.46 19.49L9.12 17.06L9.36 16.17L8.74 15.42C7.81 14.3 7.32 12.92 7.32 11.92C7.32 8.41 10.21 5.51 13.72 5.51" />
              </svg>
              <span>WhatsApp: 96259 82835</span>
            </motion.a>

            <motion.a
              href="https://t.me/Adsgrind_The_App_Growth?text=Hi%20AdsGrind%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-[#0088cc] text-white rounded-full font-bold transition-all shadow-lg hover:shadow-[#0088cc]/20"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12.05C2.75,11.75 2.75,11.14 3.83,10.72L19.82,4.54C20.56,4.27 21.2,4.71 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
              </svg>
              Message on Telegram
            </motion.a>
          </div>

          <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a5a6f6]">Follow Us</span>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)', color: '#a5a6f6', borderColor: '#a5a6f6' }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 transition-all cursor-pointer"
                  aria-label={`Follow us on ${link.name}`}
                >
                  <div className="w-5 h-5">
                    {link.icon}
                  </div>
                </motion.a>
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
    { title: "Scalable Campaigns", icon: <TrendingUp className="text-brand-red" />, desc: "Growth strategies built to scale vertically without efficiency loss." },
    { title: "Measurable ROI", icon: <Target className="text-brand-orange" />, desc: "Data-driven decisions backed by sub-second attribution tracking." },
    { title: "Global Vision", icon: <Eye className="text-brand-purple" />, desc: "Connecting advertisers with prime publishers on a global scale." },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block"
            >
              Who We Are
            </motion.span>
            <h2 className="font-display font-bold text-2xl md:text-6xl mb-6 md:mb-8 uppercase italic text-white leading-tight">
              A Performance <br />
              <span className="text-gradient">Marketing</span> Powerhouse
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Adsgrind is a global user acquisition company helping mobile apps achieve scalable growth. We bridge the gap between premium advertisers and high-performing publishers through proprietary technology and strategic campaign management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    {v.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="md:aspect-square h-auto rounded-[2rem] overflow-hidden glass-card p-6 md:p-8 relative border-white/5 bg-white/[0.02] flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Performance Data</span>
                </div>
                <div className="text-[10px] font-bold text-brand-red uppercase tracking-widest">+124% Growth</div>
              </div>

              <div className="flex-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-white"></div>
                  ))}
                </div>

                {/* Performance Graph SVG */}
                <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="graphGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#EE1D23" />
                      <stop offset="50%" stopColor="#FF5800" />
                      <stop offset="100%" stopColor="#9D50BB" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <motion.path
                    d="M 0 180 Q 50 170 80 140 T 150 120 T 220 60 T 300 80 T 400 20"
                    fill="none"
                    stroke="url(#graphGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />

                  {/* Animated Data Point */}
                  <motion.circle
                    cx="400"
                    cy="20"
                    r="6"
                    fill="#9D50BB"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  />
                  <motion.circle
                    cx="400"
                    cy="20"
                    r="12"
                    stroke="#9D50BB"
                    strokeWidth="2"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ delay: 2, repeat: Infinity, duration: 2 }}
                  />
                </svg>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="text-3xl md:text-4xl font-display font-black text-white italic tracking-tighter">RESULTS DRIVEN</div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-2">Data-Backed Excellence</p>
              </div>
            </motion.div>
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
