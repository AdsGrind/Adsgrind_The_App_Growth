"use client";

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Target, BarChart3, ShieldCheck, Zap, Globe2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { useModals } from '@/context/ModalContext';

export default function GuidePage() {
  const { openStrategy } = useModals();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-brand-red selection:text-white">
      {/* SEO Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-[10px] font-bold text-brand-red tracking-widest uppercase mb-6 inline-block">
                Comprehensive Guide
              </span>
              <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mb-6 uppercase italic leading-tight">
                The 2026 Guide to <br />
                <span className="text-gradient">Scalable User Acquisition</span>
              </h1>
              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
                Learn how to scale app installs with proven CPI strategies, multi-channel acquisition, and advanced fraud prevention techniques in the modern mobile ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <article className="container mx-auto px-6 py-20">
        <div className="max-w-[750px] mx-auto">
          
          {/* Introduction */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 uppercase italic tracking-tight">Introduction</h2>
            <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
              <p>
                In 2026, user acquisition is no longer just about volume. It's about engineering sustainable growth. As the mobile landscape becomes increasingly fragmented across new GEOs and devices, the ability to scale while maintaining a healthy ROI has become the ultimate competitive advantage.
              </p>
              <p>
                Scalable user acquisition is the process of consistently growing your app's user base using systems that can handle increased investment without diminishing returns. This guide breaks down the framework we use at Adsgrind to deliver millions of high-quality installs for global category leaders.
              </p>
            </div>
          </section>

          {/* What is Scalable User Acquisition */}
          <section className="mb-20 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase italic tracking-tight">What is Scalable User Acquisition?</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              At its core, scalability in UA means your growth isn't tied to manual effort or a single, limited traffic source. It is defined by three key pillars:
            </p>
            <ul className="space-y-4">
              {[
                "Predictability: Knowing exactly what a $10k vs. $100k investment will return.",
                "Diversity: Leveraging multiple channels (OEM, In-app, Social) simultaneously.",
                "Automation: Using AI-driven systems to optimize campaigns in real-time."
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 text-slate-300">
                  <CheckCircle2 className="text-brand-red flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Core Strategy Framework */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 uppercase italic tracking-tight">Core Strategy Framework</h2>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
                    <Target size={16} />
                  </div>
                  Targeting & Market Intelligence
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Before launching any CPI campaign, you must identify your "Ideal User Profile" across specific regions. Market intelligence allows you to understand localized behavior and cultural nuances.
                </p>
                <ul className="list-disc list-inside text-slate-500 text-sm space-y-2 ml-4">
                  <li>Tier-based GEO segmentation</li>
                  <li>Competitor landscape analysis</li>
                  <li>Device and OS version targeting</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
                    <Globe2 size={16} />
                  </div>
                  Multi-Channel Acquisition
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Don't rely solely on one network. A scalable strategy utilizes premium OEM inventories, native in-app placements, and specialized social channels to reach users where they are most active.
                </p>
                <ul className="list-disc list-inside text-slate-500 text-sm space-y-2 ml-4">
                  <li>Direct Publisher access (1000+)</li>
                  <li>OEM pre-installs and recommendations</li>
                  <li>Contextual in-app ad placements</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
                    <BarChart3 size={16} />
                  </div>
                  Performance Optimization
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Optimization happens at the sub-publisher level. By tracking post-install events (CPA) alongside CPI metrics, we reallocate budgets to the highest-LTV sources automatically.
                </p>
                <ul className="list-disc list-inside text-slate-500 text-sm space-y-2 ml-4">
                  <li>Real-time sub-source filtering</li>
                  <li>Creative A/B testing at scale</li>
                  <li>Automated bid management</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20">
                    <ShieldCheck size={16} />
                  </div>
                  Fraud Prevention
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Scalability is impossible without quality control. We implement multi-layered fraud detection to identify bot traffic, click injection, and SDK spoofing in real-time.
                </p>
                <ul className="list-disc list-inside text-slate-500 text-sm space-y-2 ml-4">
                  <li>Proprietary bot detection tech</li>
                  <li>Transparency-first publisher audits</li>
                  <li>100% human traffic verification</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Metrics Section */}
          <section className="mb-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 uppercase italic tracking-tight">Key Metrics to Track</h2>
            </div>
            {[
              { label: "CPI", desc: "Cost Per Install. The baseline cost of your acquisition." },
              { label: "CPA", desc: "Cost Per Action. The true cost of a valuable user event." },
              { label: "LTV", desc: "Lifetime Value. The total revenue a user generates." },
              { label: "ROAS", desc: "Return on Ad Spend. The ultimate measure of profitability." }
            ].map((metric) => (
              <div key={metric.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-brand-red font-black text-2xl mb-2">{metric.label}</div>
                <p className="text-slate-400 text-sm">{metric.desc}</p>
              </div>
            ))}
          </section>

          {/* Common Mistakes */}
          <section className="mb-20 p-8 rounded-3xl bg-brand-red/5 border border-brand-red/10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 uppercase italic tracking-tight flex items-center gap-3">
                <AlertCircle className="text-brand-red" />
                Common Scaling Mistakes
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-4">
                <span className="text-brand-red font-bold">01.</span>
                <span>Focusing only on CPI while ignoring retention and LTV.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-brand-red font-bold">02.</span>
                <span>scaling too fast without verifying traffic quality.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-brand-red font-bold">03.</span>
                <span>Neglecting localized creative assets for global GEOs.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-brand-red font-bold">04.</span>
                <span>Relying on a single traffic source (platform risk).</span>
              </li>
            </ul>
          </section>

          {/* Adsgrind Approach */}
          <section className="mb-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase italic tracking-tight">The Adsgrind Approach</h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              We don't just sell traffic. We partner with apps to build sustainable growth engines. By combining our network of 1000+ publishers with proprietary performance engineering, we deliver scale that sticks.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "1000+", sub: "Publishers" },
                    { label: "Tier 1", sub: "GEO Focus" },
                    { label: "Quality", sub: "Guarantee" },
                    { label: "24/7", sub: "Support" }
                ].map(stat => (
                    <div key={stat.label} className="flex flex-col">
                        <span className="text-xl font-bold text-white">{stat.label}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.sub}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* Final Takeaway */}
          <section className="mb-32">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 uppercase italic tracking-tight text-center">Final Takeaway</h2>
            <p className="text-slate-400 text-center text-lg leading-relaxed italic">
              "Scalability is the bridge between a good app and a market leader. In 2026, those who master data-driven acquisition will own the future of the mobile ecosystem."
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center pb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-red/20 blur-[100px] -z-10"></div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 uppercase italic">Ready to Scale?</h2>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto">
                Join 100+ global brands that use Adsgrind to drive consistent, high-quality user growth.
              </p>
              <Button 
                variant="liquid" 
                size="lg" 
                className="px-12 py-8 text-lg uppercase italic font-black group"
                onClick={openStrategy}
              >
                Start Your CPI Campaign
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
          </section>

        </div>
      </article>

      {/* Footer Navigation */}
      <footer className="py-10 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em]">© 2026 Adsgrind Strategy Resources</p>
      </footer>
    </div>
  );
}
