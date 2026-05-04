"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Globe, Scale, AlertTriangle, Terminal, UserCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui';

const TermsPage = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <Terminal size={20} />,
      content: "By accessing or using Adsgrind’s website, services, or platform, you agree to be bound by these Terms of Service. If you do not agree, you must not use our services."
    },
    {
      title: "2. Services Overview",
      icon: <Globe size={20} />,
      content: "Adsgrind provides performance marketing, app growth, affiliate marketing, and related digital services for brands, agencies, and publishers. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice."
    },
    {
      title: "3. Eligibility",
      icon: <UserCheck size={20} />,
      content: "You must be at least 18 years old to use our services. By using Adsgrind, you confirm that you have the legal authority to enter into this agreement."
    },
    {
      title: "4. User Responsibilities",
      icon: <Shield size={20} />,
      content: "You agree to: provide accurate and complete information; use the services only for lawful purposes; not engage in fraudulent, deceptive, or misleading practices; and not attempt to interfere with or disrupt platform functionality."
    },
    {
      title: "5. Account & Data",
      icon: <Lock size={20} />,
      content: "If you submit information via forms or communication channels: you are responsible for the accuracy of the data; you grant us permission to use the data for business communication. We take reasonable measures to protect your data but do not guarantee absolute security."
    },
    {
      title: "6. Payments & Billing",
      icon: <Scale size={20} />,
      content: "All pricing, fees, and payment terms are defined in individual agreements or contracts. Payments must be made as per agreed timelines. Late payments may result in suspension or termination of services."
    },
    {
      title: "7. Intellectual Property",
      icon: <FileText size={20} />,
      content: "All content on Adsgrind, including but not limited to: Text, graphics, logos, UI design, and branding are the property of Adsgrind and protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any content without written permission."
    },
    {
      title: "8. Confidentiality",
      icon: <Lock size={20} />,
      content: "Both parties agree to keep confidential any proprietary or sensitive business information shared during the course of engagement."
    },
    {
      title: "9. Limitation of Liability",
      icon: <AlertTriangle size={20} />,
      content: "Adsgrind shall not be liable for: Any indirect, incidental, or consequential damages; Loss of profits, revenue, or data; Performance variations due to third-party platforms (e.g., ad networks, app stores). All services are provided on an 'as is' and 'as available' basis."
    },
    {
      title: "10. Third-Party Services",
      icon: <Globe size={20} />,
      content: "Our services may involve third-party platforms (such as advertising networks or analytics tools). We are not responsible for: Their policies, changes, or downtime; Any losses caused by third-party actions."
    },
    {
      title: "11. Termination",
      icon: <Terminal size={20} />,
      content: "We reserve the right to: Suspend or terminate access to our services at any time; Remove any user or client engaging in harmful or unethical behavior."
    },
    {
      title: "12. Indemnification",
      icon: <Shield size={20} />,
      content: "You agree to indemnify and hold Adsgrind harmless from any claims, damages, or liabilities arising from your use of the services or violation of these terms."
    },
    {
      title: "13. Governing Law",
      icon: <Scale size={20} />,
      content: "These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of courts in Delhi."
    },
    {
      title: "14. Changes to Terms",
      icon: <FileText size={20} />,
      content: "We may update these Terms at any time. Continued use of the services after changes implies acceptance of the revised terms."
    },
    {
      title: "15. Contact Information",
      icon: <Globe size={20} />,
      content: "For any questions regarding these Terms, contact us at: business@adsgrind.com"
    },
    {
      title: "16. Entire Agreement",
      icon: <FileText size={20} />,
      content: "These Terms constitute the entire agreement between you and Adsgrind regarding the use of our services and supersede any prior agreements."
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
            <span className="section-label">Legal Infrastructure</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-7xl mb-8 uppercase text-white tracking-tight"
          >
            Terms of <span className="text-brand-orange">Service.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Please review the governing protocols for the Adsgrind platform. 
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
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                      {section.content}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-20 text-center">
          <p className="text-slate-600 text-sm">
            By continuing to use our services, you acknowledge that you have read and understood these protocols.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
