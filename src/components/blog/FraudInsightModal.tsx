"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, AlertTriangle, ShieldAlert, Cpu, Activity, Info, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui';

interface FraudInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FraudInsightModal({ isOpen, onClose }: FraudInsightModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[2rem] bg-[#0B0B0B] border border-white/10 shadow-2xl custom-scrollbar"
          >
            <div className="p-8 sm:p-12">
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="max-w-[650px] mx-auto">
                {/* Header */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
                      <ShieldAlert size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">Ad-Tech Intelligence</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 leading-tight uppercase italic">
                    How Fraud Impacts Performance <br />
                    <span className="text-gradient">Marketing (And How to Stop It)</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Ad fraud is a multi-billion dollar problem that siphons budgets, skews data, and destroys ROI. Understanding its mechanics is the first step toward building a truly scalable growth engine.
                  </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                  {/* Common Types */}
                  <section>
                    <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6 uppercase tracking-tight italic">
                      <AlertTriangle size={18} className="text-brand-red" />
                      Common Types of Ad Fraud
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: "Click Injection", desc: "A sophisticated form of fraud where a click is triggered right before an app install is completed to steal attribution." },
                        { title: "Bot Traffic", desc: "Automated scripts designed to simulate human interactions, creating fake clicks, installs, and registrations." },
                        { title: "Device Farms", desc: "Physical locations with thousands of devices used to manually generate fake app engagement and installs." },
                        { title: "SDK Spoofing", desc: "Malware that generates fake app installs without any real app being downloaded or used." }
                      ].map((item, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                          <h4 className="text-sm font-black text-white uppercase mb-2">{item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* How Detection Works */}
                  <section className="p-8 rounded-[2rem] bg-brand-red/[0.02] border border-brand-red/10">
                    <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6 uppercase tracking-tight italic">
                      <Cpu size={18} className="text-brand-red" />
                      How Fraud Detection Works
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Effective fraud detection isn't about simple blacklists. It requires real-time analysis of hundreds of data points, identifying patterns that deviate from normal human behavior.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Real-time IP and device fingerprinting",
                        "Time-to-Install (TTI) distribution analysis",
                        "Behavioral pattern recognition (Heatmaps, Scroll depth)",
                        "OS and hardware version verification"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="text-brand-red w-4 h-4 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Our Approach */}
                  <section>
                    <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6 uppercase tracking-tight italic">
                      <ShieldCheck size={18} className="text-brand-red" />
                      Our Approach
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      At Adsgrind, we employ a <strong>Zero-Trust Attribution</strong> model. Every conversion is verified through three layers of technical validation before it is attributed to a source.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      We focus on post-install quality metrics (LTV, Retention, ROAS) as the ultimate truth. Fraudulent traffic can simulate installs, but it can never simulate real user lifetime value.
                    </p>
                  </section>

                  {/* Why It Matters */}
                  <section className="border-t border-white/5 pt-12">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight italic">Why It Matters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <span className="text-brand-red font-black text-2xl tracking-tighter">100%</span>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Verified Human Traffic</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-brand-red font-black text-2xl tracking-tighter">0%</span>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Budget Wastage</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-brand-red font-black text-2xl tracking-tighter">3.5x</span>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Average ROI Lift</p>
                        </div>
                    </div>
                  </section>

                  {/* Final Takeaway */}
                  <section className="bg-white/5 p-8 rounded-2xl text-center">
                    <p className="text-white text-lg font-bold italic uppercase tracking-tight mb-4">
                      "Clean traffic is the only foundation for scalable growth."
                    </p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                        Adsgrind Technical Strategy, 2026
                    </p>
                  </section>

                  {/* Footer CTA */}
                  <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Info size={16} className="text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Trust-driven attribution</span>
                    </div>
                    <Button
                        onClick={onClose}
                        variant="liquid"
                        className="w-full sm:w-auto px-10 border-white/10 hover:border-brand-red/50 group"
                    >
                        Return to Insights
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CheckCircle({ className, ...props }: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}
