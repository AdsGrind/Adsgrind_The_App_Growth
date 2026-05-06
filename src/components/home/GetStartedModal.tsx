"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Building2, User, Mail, MessageSquare, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, cn } from '@/components/ui';
import { sendContactEmail } from '@/app/actions/contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent scroll when modal is open
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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendContactEmail({
        ...data,
        budget: data.budget || 'Not Specified',
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          // Reset states after animation finishes
          setTimeout(() => {
            setIsSuccess(false);
            reset();
          }, 500);
        }, 3000);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[500px] overflow-hidden rounded-2xl sm:rounded-[2rem] bg-[#000000] border border-white/10 shadow-2xl"
          >
            {/* Institutional Backdrop: White/Grey Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative p-6 sm:p-10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-tighter">
                        GET STARTED.
                      </h2>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">
                        Specify your growth objective.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <input
                            {...register('name')}
                            type="text"
                            placeholder="John Doe"
                            className={cn(
                              "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-all uppercase tracking-widest",
                              errors.name && "border-white/20"
                            )}
                          />
                        </div>
                        {errors.name && <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest ml-1">{errors.name.message}</p>}
                      </div>

                      {/* Company Field */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Company Name</label>
                        <div className="relative group">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <input
                            {...register('company')}
                            type="text"
                            placeholder="AdsGrind Inc."
                            className={cn(
                              "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-all uppercase tracking-widest",
                              errors.company && "border-white/20"
                            )}
                          />
                        </div>
                        {errors.company && <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest ml-1">{errors.company.message}</p>}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Email Address</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="john@example.com"
                            className={cn(
                              "w-full bg-white/[0.02] border border-white/10 rounded-xl px-12 py-3.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-all uppercase tracking-widest",
                              errors.email && "border-white/20"
                            )}
                          />
                        </div>
                        {errors.email && <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest ml-1">{errors.email.message}</p>}
                      </div>

                      {/* Budget Field */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Monthly Budget (Optional)</label>
                        <div className="relative group">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <select
                            {...register('budget')}
                            className={cn(
                              "w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-3.5 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-all appearance-none cursor-pointer uppercase tracking-widest",
                              errors.budget && "border-white/20"
                            )}
                          >
                            <option value="" className="bg-[#1A1A1A]">Select your budget</option>
                            <option value="<$5k" className="bg-[#1A1A1A]">Less than $5,000</option>
                            <option value="$5k-$20k" className="bg-[#1A1A1A]">$5,000 - $20,000</option>
                            <option value="$20k-$50k" className="bg-[#1A1A1A]">$20,000 - $50,000</option>
                            <option value="$50k+" className="bg-[#1A1A1A]">$50,000+</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Message</label>
                        <div className="relative group">
                          <MessageSquare className="absolute left-4 top-4 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                          <textarea
                            {...register('message')}
                            rows={4}
                            placeholder="Tell us about your project goals..."
                            className={cn(
                              "w-full bg-[#141414] border border-white/10 rounded-xl px-12 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-all resize-none uppercase tracking-widest",
                              errors.message && "border-white/20"
                            )}
                          />
                        </div>
                        {errors.message && <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest ml-1">{errors.message.message}</p>}
                      </div>

                      {error && (
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest text-center">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white hover:bg-white/90 text-black font-bold h-14 rounded-xl shadow-2xl transition-all flex items-center justify-center gap-2 group text-[11px] uppercase tracking-[0.3em]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500"
                      >
                        <CheckCircle2 size={40} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"
                      />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 italic">MESSAGE SENT!</h3>
                    <p className="text-white/50 max-w-[280px]">
                      We'll get back to you within 24 hours. Get ready for explosive growth.
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
