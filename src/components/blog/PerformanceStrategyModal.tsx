"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Building2, User, Mail, MessageSquare, ChevronDown, Target, Zap, TrendingUp, Globe2, Layers } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, cn } from '@/components/ui';
import { sendContactEmail } from '@/app/actions/contact';

const strategySchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  company: z.string().min(2, 'Company or App name is required'),
  email: z.string().email('Please enter a valid work email'),
  budget: z.string().min(1, 'Please select a budget range'),
  goal: z.string().min(1, 'Please select your primary goal'),
  message: z.string().optional(),
});

type StrategyFormData = z.infer<typeof strategySchema>;

interface PerformanceStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PerformanceStrategyModal({ isOpen, onClose }: PerformanceStrategyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StrategyFormData>({
    resolver: zodResolver(strategySchema),
  });

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

  const onSubmit = async (data: StrategyFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendContactEmail({
        ...data,
        message: data.message || "Requested custom performance strategy.",
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setIsSuccess(false);
            reset();
          }, 500);
        }, 4000);
      } else {
        setError(result.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B0B0B] border border-white/10 shadow-2xl custom-scrollbar"
          >
            <div className="p-8 sm:p-12">
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="mb-10 text-center sm:text-left">
                      <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 uppercase italic">
                        Get Your Custom <span className="text-brand-orange">Strategy</span>
                      </h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Tell us about your app and goals — we'll build a data-driven acquisition plan tailored for you.
                      </p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-4 inline-block">
                        No guesswork. No generic plans. Just growth.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-orange transition-colors" size={16} />
                            <input
                              {...register('name')}
                              placeholder="Enter your full name"
                              className={cn(
                                "w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all",
                                errors.name && "border-red-500/50"
                              )}
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Company / App Name</label>
                          <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-orange transition-colors" size={16} />
                            <input
                              {...register('company')}
                              placeholder="e.g. FitTrack App"
                              className={cn(
                                "w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all",
                                errors.company && "border-red-500/50"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-orange transition-colors" size={16} />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="name@company.com"
                            className={cn(
                              "w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all",
                              errors.email && "border-red-500/50"
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Budget */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Monthly Budget</label>
                          <div className="relative group">
                            <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-orange transition-colors" size={16} />
                            <select
                              {...register('budget')}
                              className="w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer"
                            >
                              <option value="">Select range</option>
                              <option value="<$5K">Less than $5K</option>
                              <option value="$5K–$20K">$5K – $20K</option>
                              <option value="$20K–$50K">$20K – $50K</option>
                              <option value="$50K+">$50K+</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={16} />
                          </div>
                        </div>

                        {/* Goal */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Primary Goal</label>
                          <div className="relative group">
                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-orange transition-colors" size={16} />
                            <select
                              {...register('goal')}
                              className="w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer"
                            >
                              <option value="">Select objective</option>
                              <option value="App Installs">App Installs</option>
                              <option value="Registrations">Registrations</option>
                              <option value="Purchases">Purchases</option>
                              <option value="Other">Other / Branding</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Value Section */}
                      <div className="p-6 rounded-2xl bg-brand-orange/[0.03] border border-brand-orange/10 mt-8">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-4">What You'll Receive</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { icon: <Zap size={14} />, text: "Custom CPI / CPA strategy" },
                            { icon: <Globe2 size={14} />, text: "GEO targeting map" },
                            { icon: <Layers size={14} />, text: "Optimized channel mix" },
                            { icon: <TrendingUp size={14} />, text: "Scaling roadmap" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                              <span className="text-brand-orange">{item.icon}</span>
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-black h-14 rounded-xl shadow-xl shadow-brand-orange/20 transition-all text-sm uppercase italic flex items-center justify-center gap-2 group"
                        >
                          {isSubmitting ? (
                            <Loader2 size={20} className="animate-spin" />
                          ) : (
                            <>
                              Get My Strategy
                              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </Button>
                        <p className="text-center text-[10px] text-slate-600 mt-4 uppercase tracking-widest">
                            No spam. No commitments. Just a clear growth plan.
                        </p>
                      </div>

                      {error && (
                        <p className="text-red-400 text-[10px] font-bold text-center uppercase tracking-tighter">{error}</p>
                      )}
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase italic">Strategy Requested</h3>
                    <p className="text-slate-400 max-w-sm">
                      Thanks! Our strategy team is analyzing your data and will reach out with your custom growth plan shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
