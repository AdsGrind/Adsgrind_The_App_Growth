"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Building2, User, Mail, ChevronDown, Target, Globe2, MapPin, Zap, TrendingUp, BarChart3, Rocket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, cn } from '@/components/ui';
import { sendContactEmail } from '@/app/actions/contact';

const marketSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid work email'),
  markets: z.array(z.string()).min(1, 'Please select at least one target market'),
  budget: z.string().min(1, 'Please select your budget range'),
  goal: z.string().min(1, 'Please select your primary goal'),
  message: z.string().optional(),
});

type MarketFormData = z.infer<typeof marketSchema>;

interface MarketStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_MARKETS = [
  { id: 'india', label: 'India' },
  { id: 'sea', label: 'SEA (Southeast Asia)' },
  { id: 'me', label: 'Middle East' },
  { id: 'other', label: 'Other Regions' },
];

export function MarketStrategyModal({ isOpen, onClose }: MarketStrategyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MarketFormData>({
    resolver: zodResolver(marketSchema),
    defaultValues: {
      markets: [],
    }
  });

  const selectedMarkets = watch('markets');

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

  const toggleMarket = (marketLabel: string) => {
    const current = selectedMarkets || [];
    const updated = current.includes(marketLabel)
      ? current.filter(m => m !== marketLabel)
      : [...current, marketLabel];
    setValue('markets', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: MarketFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendContactEmail({
        ...data,
        message: data.message || "Requested market entry strategy.",
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
        setError(result.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="relative w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-[2rem] bg-[#000000] border border-white/10 shadow-2xl custom-scrollbar"
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-12">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-white">
                            <Globe2 size={24} />
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">
                            MARKET ENTRY.
                        </h2>
                      </div>
                      <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-8">
                        Expand into high-growth markets with a data-driven acquisition plan tailored to your app's unique value proposition.
                      </p>
                      <div className="flex flex-wrap gap-8 py-6 border-y border-white/5">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">
                            <MapPin size={14} className="text-white/20" /> INDIA_FOCUS
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">
                            <Zap size={14} className="text-white/20" /> SEA_GROWTH
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">
                            <TrendingUp size={14} className="text-white/20" /> ME_EXPANSION
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Full Identity</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <input
                              {...register('name')}
                              placeholder="Enter your name"
                              className={cn(
                                "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all uppercase tracking-widest",
                                errors.name && "border-white/20"
                              )}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Organization</label>
                          <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <input
                              {...register('company')}
                              placeholder="e.g. GlobalApp Inc."
                              className={cn(
                                "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all uppercase tracking-widest",
                                errors.company && "border-white/20"
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Network Address</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <input
                            {...register('email')}
                            placeholder="name@company.com"
                            className={cn(
                              "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all uppercase tracking-widest",
                              errors.email && "border-white/20"
                            )}
                          />
                        </div>
                      </div>

                      {/* Target Markets Selection */}
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Target Markets</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {AVAILABLE_MARKETS.map((market) => (
                            <button
                              key={market.id}
                              type="button"
                              onClick={() => toggleMarket(market.label)}
                              className={cn(
                                "p-3 border text-[10px] font-bold transition-all text-center tracking-widest uppercase",
                                selectedMarkets.includes(market.label)
                                  ? "bg-white text-black border-white"
                                  : "bg-white/[0.02] border-white/10 text-white/40 hover:border-white/20"
                              )}
                            >
                              {market.label}
                            </button>
                          ))}
                        </div>
                        {errors.markets && <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest ml-1">{errors.markets.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Operational Scale</label>
                          <div className="relative group">
                            <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <select
                              {...register('budget')}
                              className="w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer uppercase tracking-widest"
                            >
                              <option value="">Select range</option>
                              <option value="<$10K">Less than $10K</option>
                              <option value="$10K–$50K">$10K – $50K</option>
                              <option value="$50K–$100K">$50K – $100K</option>
                              <option value="$100K+">$100K+</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Primary Objective</label>
                          <div className="relative group">
                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                            <select
                              {...register('goal')}
                              className="w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3 text-sm text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer uppercase tracking-widest"
                            >
                              <option value="">Select objective</option>
                              <option value="Market Entry">Market Entry</option>
                              <option value="Scale Existing">Scale Existing</option>
                              <option value="User Quality">User Quality / ROAS</option>
                              <option value="Branding">Local Branding</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Value Section */}
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mt-8">
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Mission Deliverables</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { icon: <MapPin size={14} />, text: "Market acquisition plan" },
                            { icon: <Target size={14} />, text: "GEO targeting strategy" },
                            { icon: <Globe2 size={14} />, text: "Local traffic insights" },
                            { icon: <Rocket size={14} />, text: "Expansion roadmap" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[10px] text-white/20 uppercase tracking-[0.2em]">
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
                              Get My Market Strategy
                              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </Button>
                        <p className="text-center text-[9px] text-white/20 mt-6 uppercase tracking-[0.2em] leading-relaxed">
                            Encrypted Transmission. Zero Commitment.
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
                    <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase tracking-tighter">PROTOCOL LOGGED.</h3>
                    <p className="text-white/40 text-sm max-w-sm uppercase tracking-widest leading-relaxed">
                      Our global markets team is analyzing your dataset. Transmission of localized insights is imminent.
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
