"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { sendContactEmail } from '@/app/actions/contact';

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
    try {
      const result = await sendContactEmail(data);
      if (!result.success) {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
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
            Ready to reach the next level? Connect with our performance experts and discover how ADSGRIND can transform your UA strategy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <GlassCard className="p-6 md:p-8 border-white/5 hover:border-brand-red/30 transition-all duration-300">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Mail size={24} className="md:w-7 md:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email Us</div>
                  <div className="text-base md:text-lg font-bold text-white truncate">business@adsgrind.com</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 border-white/5 hover:border-brand-orange/30 transition-all duration-300">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <MessageCircle size={24} className="md:w-7 md:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">WhatsApp</div>
                  <div className="text-base md:text-lg font-bold text-white truncate">96259 82835</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 border-white/5 hover:border-blue-500/30 transition-all duration-300">
              <a href="https://www.linkedin.com/company/adsgrindpvt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-5 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C13.93,9.94 13,10.63 12.31,11.47V10.16H9.17V18.5H12.31V12.93C12.31,12.26 12.51,11.7 13.06,11.14C13.59,10.6 14.12,10.42 14.7,10.42C15.93,10.42 16.36,11.3 16.36,12.55V18.5H18.5M4.93,10.16V18.5H8.07V10.16H4.93M6.5,5.64C5.5,5.64 4.69,6.45 4.69,7.45C4.69,8.45 5.5,9.26 6.5,9.26C7.5,9.26 8.31,8.45 8.31,7.45C8.31,6.45 7.5,5.64 6.5,5.64Z" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">LinkedIn</div>
                  <div className="text-base md:text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">Adsgrind The App Growth</div>
                </div>
              </a>
            </GlassCard>

            <GlassCard className="p-6 md:p-8 border-white/5 hover:border-brand-purple/30 transition-all duration-300">
              <a href="https://t.me/Adsgrind_The_App_Growth?text=Hi%20AdsGrind%2C%20I%27d%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-5 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Send size={24} className="md:w-7 md:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Telegram</div>
                  <div className="text-base md:text-lg font-bold text-white break-all md:break-normal group-hover:text-brand-purple transition-colors">@Adsgrind_The_App_Growth</div>
                </div>
              </a>
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
                    Thank you for reaching out. A growth engineer from ADSGRIND will review your goals and contact you within 24 hours.
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
                    className="w-full py-4 md:py-5 text-base md:text-xl font-bold uppercase italic tracking-widest gap-2 md:gap-3 whitespace-nowrap"
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

        {/* Interactive Map Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase italic mb-4">Our <span className="text-gradient">Location</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto">Strategically positioned to manage global growth operations from our central hub.</p>
            </div>

            <div className="relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl h-[500px]">
              {/* Dark Styled Google Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13998.403565656565!2d77.2625!3d28.7058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb63897d9e87%3A0x6444444444444444!2sBhajanpura%2C%20Delhi%20110053!5e0!3m2!1sen!2sin!4v1714690000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale brightness-50 contrast-125 invert-[0.9] hue-rotate-[180deg]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* UI Suppression Shields (Hides 'Open in Maps', 'View larger map', and Google branding) */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>

              {/* Interactive Area Mask (Prevents clicks on Google branding/links while allowing pan/zoom) */}
              <div className="absolute top-0 left-0 w-48 h-20 pointer-events-auto cursor-default"></div>
              <div className="absolute bottom-0 right-0 w-48 h-12 pointer-events-auto cursor-default"></div>

              {/* Glassmorphism Overlay Filter */}
              <div className="absolute inset-0 bg-[#050505]/40 pointer-events-none"></div>

              {/* Custom HQ Marker */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center">
                  {/* Pulse Animation */}
                  <div className="absolute inset-0 -translate-y-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-red/20 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-red/10 rounded-full animate-pulse"></div>
                  </div>

                  {/* Pin Core */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-20 w-12 h-12 rounded-full bg-[#050505] border-2 border-brand-red flex items-center justify-center shadow-[0_0_30px_rgba(238,29,35,0.6)]"
                  >
                    <MapPin className="text-brand-red" size={24} />
                  </motion.div>

                  {/* HQ Label Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-4 px-6 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></div>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Adsgrind HQ</span>
                  </motion.div>
                </div>
              </div>

              {/* Map Controls Protection Overlay */}
              <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                Secure Node Location
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
