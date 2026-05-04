"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Share2, Clock, UserCheck, Mail, Globe, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui';

const PrivacyPage = () => {
  const sections = [
    {
      title: "1. Introduction",
      icon: <Shield size={20} />,
      content: "Adsgrind respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services."
    },
    {
      title: "2. Information We Collect",
      icon: <Database size={20} />,
      content: (
        <div className="space-y-4">
          <div>
            <span className="text-white font-bold block mb-1">a. Information You Provide</span>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, email address, phone number</li>
              <li>Company details</li>
              <li>Any information submitted through contact forms or communication channels</li>
            </ul>
          </div>
          <div>
            <span className="text-white font-bold block mb-1">b. Automatically Collected Data</span>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Pages visited and time spent</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "3. How We Use Your Information",
      icon: <Eye size={20} />,
      content: (
        <div className="space-y-2">
          <p>We use your data to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to inquiries and provide support</li>
            <li>Deliver and improve our services</li>
            <li>Communicate updates, offers, or business-related information</li>
            <li>Analyze website performance and user behavior</li>
            <li>Prevent fraud and ensure platform security</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. Cookies & Tracking Technologies",
      icon: <Database size={20} />,
      content: "We use cookies and similar technologies to enhance user experience and analyze traffic. You can control or disable cookies through your browser settings. However, some features of the website may not function properly if cookies are disabled."
    },
    {
      title: "5. Data Sharing",
      icon: <Share2 size={20} />,
      content: (
        <div className="space-y-2">
          <p>We do not sell your personal data. We may share your information with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Trusted service providers (e.g., hosting, analytics, communication tools)</li>
            <li>Advertising and analytics partners (only as necessary for service delivery)</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </div>
      )
    },
    {
      title: "6. Data Retention",
      icon: <Clock size={20} />,
      content: "We retain your information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements."
    },
    {
      title: "7. Data Security",
      icon: <Lock size={20} />,
      content: "We implement reasonable technical and organizational measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security."
    },
    {
      title: "8. Your Rights",
      icon: <UserCheck size={20} />,
      content: (
        <div className="space-y-2">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent for data processing</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          <p className="mt-4">To exercise these rights, contact us at business@adsgrind.com.</p>
        </div>
      )
    },
    {
      title: "9. Third-Party Links",
      icon: <Globe size={20} />,
      content: "Our website may contain links to third-party websites or services. We are not responsible for their privacy practices or content."
    },
    {
      title: "10. Children’s Privacy",
      icon: <AlertCircle size={20} />,
      content: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal data from children."
    },
    {
      title: "11. International Data Transfers",
      icon: <Globe size={20} />,
      content: "Your information may be processed or stored in locations outside your country. By using our services, you consent to such transfers."
    },
    {
      title: "12. Changes to This Policy",
      icon: <Clock size={20} />,
      content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date."
    },
    {
      title: "13. Contact Us",
      icon: <Mail size={20} />,
      content: "If you have any questions or concerns about this Privacy Policy, contact us at: business@adsgrind.com"
    },
    {
      title: "14. Consent",
      icon: <UserCheck size={20} />,
      content: "By using Adsgrind’s website and services, you consent to the terms of this Privacy Policy."
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
            <span className="section-label">Data Protection Protocols</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-7xl mb-8 uppercase text-white tracking-tight"
          >
            Privacy <span className="text-brand-orange">Policy.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Encryption. Transparency. Integrity. Learn how we handle your information within the Adsgrind growth ecosystem.
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
            Security is engineered into every layer of our platform.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
