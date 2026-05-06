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
            className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl bg-[#000000] border border-white/10 shadow-2xl custom-scrollbar"
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
                      <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
                        GET YOUR STRATEGY.
                      </h2>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] mb-4">
                        Data-driven acquisition planning.
                      </p>
                      <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest border-t border-white/5 pt-4 inline-block">
                        Precision engineering. zero generic output.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <input
                              {...register('name')}
                              placeholder="Enter your full name"
                              className={cn(
                                "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all uppercase tracking-widest",
                                errors.name && "border-white/20"
                              )}
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Company / App Name</label>
                          <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <input
                              {...register('company')}
                              placeholder="e.g. FitTrack App"
                              className={cn(
                                "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all uppercase tracking-widest",
                                errors.company && "border-white/20"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Work Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="name@company.com"
                            className={cn(
                              "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all uppercase tracking-widest",
                              errors.email && "border-white/20"
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Budget */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Monthly Budget</label>
                          <div className="relative group">
                            <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <select
                              {...register('budget')}
                              className="w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer uppercase tracking-widest"
                            >
                              <option value="">Select range</option>
                              <option value="<$5K">Less than $5K</option>
                              <option value="$5K–$20K">$5K – $20K</option>
                              <option value="$20K–$50K">$20K – $50K</option>
                              <option value="$50K+">$50K+</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                          </div>
                        </div>

                        {/* Goal */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Primary Goal</label>
                          <div className="relative group">
                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <select
                              {...register('goal')}
                              className="w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer uppercase tracking-widest"
                            >
                              <option value="">Select objective</option>
                              <option value="App Installs">App Installs</option>
                              <option value="Registrations">Registrations</option>
                              <option value="Purchases">Purchases</option>
                              <option value="Other">Other / Branding</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Value Section */}
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mt-8">
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4">Transmission Payload</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { icon: <Zap size={14} />, text: "Custom CPI / CPA strategy" },
                            { icon: <Globe2 size={14} />, text: "GEO targeting map" },
                            { icon: <Layers size={14} />, text: "Optimized channel mix" },
                            { icon: <TrendingUp size={14} />, text: "Scaling roadmap" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
                              <span className="text-white/20">{item.icon}</span>
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-white hover:bg-white/90 text-black font-bold h-14 rounded-xl shadow-2xl transition-all text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 group"
                        >
                          {isSubmitting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <>
                              Get My Strategy
                              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </Button>
                        <p className="text-center text-[9px] text-white/20 mt-4 uppercase tracking-[0.2em]">
                            End-to-end encryption. No commitments.
                        </p>
                      </div>

                      {error && (
                        <p className="text-white/40 text-[10px] font-bold text-center uppercase tracking-widest">{error}</p>
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
                    <div className="w-20 h-20 border border-white/20 flex items-center justify-center text-white mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase tracking-tighter">STRATEGY LOGGED.</h3>
                    <p className="text-white/40 text-sm max-w-sm uppercase tracking-widest leading-relaxed">
                      Our engineering team is analyzing your dataset. Transmission of custom growth plan is imminent.
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
