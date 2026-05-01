"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  budget: z.string().min(1, 'Budget selection is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <span className="py-1 px-4 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-bold uppercase tracking-widest text-brand-red">Global Support</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-5xl md:text-7xl mb-8 uppercase italic"
          >
            Scale Your <span className="text-gradient">Growth</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Ready to reach the next level? Connect with our performance experts and discover how Adsgrind can transform your UA strategy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <GlassCard className="p-8 border-white/5 hover:border-brand-red/30 transition-all duration-300">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                        <Mail size={28} />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email Us</div>
                        <div className="text-lg font-bold text-white">hello@adsgrind.com</div>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 hover:border-brand-orange/30 transition-all duration-300">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                        <MessageCircle size={28} />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">WhatsApp</div>
                        <div className="text-lg font-bold text-white">96259 82835</div>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 hover:border-brand-purple/30 transition-all duration-300">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                        <Send size={28} />
                    </div>
                    <div>
                    <a href="https://t.me/Adsgrind_The_App_Growth?text=Hi%20AdsGrind%2C%20I%27d%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition-colors">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Telegram</div>
                        <div className="text-lg font-bold text-white">@Adsgrind_The_App_Growth</div>
                    </a>
                    </div>
                </div>
            </GlassCard>

            <div className="p-10 border border-dashed border-white/10 rounded-[2rem] bg-white/[0.01]">
                <div className="flex items-center gap-3 mb-6 text-brand-success font-bold text-sm uppercase tracking-wider">
                    <Clock size={18} /> Rapid Response Gear
                </div>
                <p className="text-sm text-slate-500 leading-relaxed italic">
                    "Our account managers are technical specialists available 24/7 across global time zones to ensure consistent campaign performance."
                </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard className="p-12 h-full border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-[100px] -z-10"></div>
              
              {isSubmitSuccessful ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-10"
                >
                    <div className="w-24 h-24 rounded-full bg-brand-success/20 flex items-center justify-center mb-8 border border-brand-success/30">
                        <CheckCircle2 size={48} className="text-brand-success" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-white uppercase italic">Strategy Received!</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-sm">
                        Thank you for reaching out. A growth engineer from Adsgrind will review your goals and contact you within 24 hours.
                    </p>
                    <Button variant="outline" size="lg" onClick={() => reset()} className="px-12 border-white/10 text-white">Send Another Message</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                      <input 
                        {...register('name')}
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 placeholder:text-white/10 focus:outline-none focus:border-brand-red transition-colors text-white"
                      />
                      {errors.name && <p className="text-brand-red text-[10px] pl-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Work Email</label>
                      <input 
                        {...register('email')}
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 placeholder:text-white/10 focus:outline-none focus:border-brand-red transition-colors text-white"
                      />
                      {errors.email && <p className="text-brand-red text-[10px] pl-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Company Name</label>
                      <input 
                        {...register('company')}
                        type="text" 
                        placeholder="Your App/Agency"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 placeholder:text-white/10 focus:outline-none focus:border-brand-red transition-colors text-white"
                      />
                      {errors.company && <p className="text-brand-red text-[10px] pl-1">{errors.company.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Monthly Budget</label>
                        <select 
                            {...register('budget')}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors text-white/50 appearance-none cursor-pointer"
                        >
                            <option value="" className="bg-slate-900">Select Budget Range</option>
                            <option value="1k-5k" className="bg-slate-900">$1,000 - $5,000</option>
                            <option value="5k-20k" className="bg-slate-900">$5,000 - $20,000</option>
                            <option value="20k+" className="bg-slate-900">$20,000+</option>
                        </select>
                        {errors.budget && <p className="text-brand-red text-[10px] pl-1">{errors.budget.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Message</label>
                    <textarea 
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us about your growth goals..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 placeholder:text-white/10 focus:outline-none focus:border-brand-red transition-colors resize-none text-white"
                    ></textarea>
                    {errors.message && <p className="text-brand-red text-[10px] pl-1">{errors.message.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    variant="liquid" 
                    className="w-full py-5 text-xl font-bold uppercase italic tracking-widest gap-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Strategy...' : (
                        <>Inquire Now <Send size={20} /></>
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[500px] w-full rounded-[3rem] overflow-hidden glass-card p-0 relative group">
            <div className="absolute inset-0 bg-brand-red/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-1000"></div>
            <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-20 grayscale brightness-50 contrast-125">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Global Operations" />
                </div>
                <div className="relative z-20 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-brand-red flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(238,29,35,0.6)]">
                        <MapPin size={40} className="text-white" />
                    </div>
                    <div className="mt-6 px-10 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-brand-red/30 font-display font-black text-lg text-white uppercase italic tracking-widest">
                        AdsGrind HQ
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
