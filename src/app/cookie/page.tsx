"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart, Zap, Globe, Info, Mail, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui';

const CookiePolicyPage = () => {
  const sections = [
    {
      title: "1. What Are Cookies",
      icon: <Cookie size={20} />,
      content: "Cookies are small text files stored on your device when you visit a website. They help websites function properly, improve user experience, and provide information to the website owners."
    },
    {
      title: "2. How We Use Cookies",
      icon: <Settings size={20} />,
      content: (
        <div className="space-y-2">
          <p>Adsgrind uses cookies to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ensure the website functions correctly</li>
            <li>Improve performance and user experience</li>
            <li>Analyze traffic and user behavior</li>
            <li>Support marketing and advertising efforts</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Types of Cookies We Use",
      icon: <Zap size={20} />,
      content: (
        <div className="space-y-6">
          <div>
            <span className="text-white font-bold block mb-1">a. Essential Cookies</span>
            <p className="text-sm">These cookies are necessary for the website to function properly. They enable core features like page navigation and secure access.</p>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">b. Performance & Analytics Cookies</span>
            <p className="text-sm">These cookies help us understand how visitors interact with the website by collecting anonymous information such as pages visited and time spent.</p>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">c. Functional Cookies</span>
            <p className="text-sm">These cookies remember your preferences (such as language or region) to provide a more personalized experience.</p>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">d. Advertising & Targeting Cookies</span>
            <p className="text-sm">These cookies may be used to deliver relevant ads and track the effectiveness of marketing campaigns.</p>
          </div>
        </div>
      )
    },
    {
      title: "4. Third-Party Cookies",
      icon: <Globe size={20} />,
      content: "We may allow third-party services (such as analytics providers or advertising platforms) to place cookies on your device. These third parties have their own privacy and cookie policies, which we do not control."
    },
    {
      title: "5. Managing Cookies",
      icon: <Settings size={20} />,
      content: (
        <div className="space-y-2">
          <p>You can control or disable cookies through your browser settings. Most browsers allow you to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View stored cookies</li>
            <li>Delete cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all cookies entirely</li>
          </ul>
          <p className="mt-4 text-xs italic text-slate-500">Note: disabling cookies may affect the functionality of certain parts of our website.</p>
        </div>
      )
    },
    {
      title: "6. Consent",
      icon: <ShieldCheck size={20} />,
      content: "By continuing to use our website, you consent to our use of cookies as described in this policy. Where required by law, we will request your consent before placing non-essential cookies on your device."
    },
    {
      title: "7. Updates to This Policy",
      icon: <Info size={20} />,
      content: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date."
    },
    {
      title: "8. Contact Us",
      icon: <Mail size={20} />,
      content: "If you have any questions about our use of cookies, please contact us at: business@adsgrind.com"
    },
    {
      title: "9. More Information",
      icon: <BarChart size={20} />,
      content: "For more details on how we handle personal data, please refer to our Privacy Policy."
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="section-label">Tracking Protocols</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-7xl mb-8 uppercase text-white tracking-tight"
          >
            Cookie <span className="text-brand-orange">Policy.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Managing the digital crumbs. Learn how we use tracking technologies to optimize your experience.
            Last updated: May 2026.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="p-8 border-white/5 hover:border-brand-orange/20 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0 mt-1">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-3">{section.title}</h2>
                    <div className="text-slate-400 leading-relaxed text-sm md:text-base">
                      {section.content}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-20 text-center">
          <p className="text-slate-600 text-sm">
            Optimized for performance, built for privacy.
          </p>
        </div>
      </div>
    </main>
  );
};

export default CookiePolicyPage;
