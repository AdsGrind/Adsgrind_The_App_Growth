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
    <div className="pt-32 pb-20 bg-[#000000] min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-5xl mb-32 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/20 pb-2">Institutional Support</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-5xl md:text-8xl mb-12 uppercase leading-[0.95] text-white tracking-[-0.04em]"
          >
            Connect With<br />
            <span className="text-white/40">Growth Hub.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto"
          >
            Connect with our performance specialists to deploy enterprise-grade UA strategies at global scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10 mb-40">
          {/* Contact Info Grid */}
          <div className="lg:col-span-1 grid grid-cols-1 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="p-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10 text-white">
                  <Mail size={20} />
                </div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] mb-4">Email Infrastructure</div>
                <div className="text-xl font-bold text-white uppercase tracking-tight">business@adsgrind.com</div>
            </div>

            <div className="p-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10 text-white">
                  <MessageCircle size={20} />
                </div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] mb-4">Direct Comms</div>
                <div className="text-xl font-bold text-white uppercase tracking-tight">+91 96259 82835</div>
            </div>

            <a 
              href="https://www.linkedin.com/company/adsgrindpvt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors block"
            >
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C13.93,9.94 13,10.63 12.31,11.47V10.16H9.17V18.5H12.31V12.93C12.31,12.26 12.51,11.7 13.06,11.14C13.59,10.42 14.12,10.42 14.7,10.42C15.93,10.42 16.36,11.3 16.36,12.55V18.5H18.5M4.93,10.16V18.5H8.07V10.16H4.93M6.5,5.64C5.5,5.64 4.69,6.45 4.69,7.45C4.69,8.45 5.5,9.26 6.5,9.26C7.5,9.26 8.31,8.45 8.31,7.45C8.31,6.45 7.5,5.64 6.5,5.64Z" /></svg>
                </div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] mb-4">Institutional Profile</div>
                <div className="text-xl font-bold text-white uppercase tracking-tight">Adsgrind The App Growth</div>
            </a>

            <div className="p-12 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10 text-white">
                    <Send size={20} />
                </div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] mb-4">Global Network</div>
                <div className="text-xl font-bold text-white uppercase tracking-tight">@Adsgrind_The_App_Growth</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-12 md:p-16">
              {isSubmitSuccessful ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 border border-white/20 flex items-center justify-center mb-10">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-white uppercase tracking-tight">Transmission Received</h2>
                  <p className="text-white/40 text-lg mb-12 max-w-sm">
                    Strategic inquiry logged. A growth specialist will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => reset()} 
                    className="px-12 py-5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                  >
                    Send New Transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Full Identity</label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Verified Name"
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-white placeholder:text-white/10 text-lg"
                      />
                      {errors.name && <p className="text-white/50 text-[10px] uppercase tracking-widest">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Network Address</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Corporate Email"
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-white placeholder:text-white/10 text-lg"
                      />
                      {errors.email && <p className="text-white/50 text-[10px] uppercase tracking-widest">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Organization</label>
                      <input
                        {...register('company')}
                        type="text"
                        placeholder="App/Enterprise Name"
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-white placeholder:text-white/10 text-lg"
                      />
                      {errors.company && <p className="text-white/50 text-[10px] uppercase tracking-widest">{errors.company.message}</p>}
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Operational Scale</label>
                      <select
                        {...register('budget')}
                        className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors text-white/50 appearance-none cursor-pointer text-lg"
                      >
                        <option value="" className="bg-[#000000]">Select Range</option>
                        <option value="1k-5k" className="bg-[#000000]">$1k - $5k</option>
                        <option value="5k-20k" className="bg-[#000000]">$5k - $20k</option>
                        <option value="20k+" className="bg-[#000000]">$20k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Mission Objectives</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Specify growth targets..."
                      className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-white transition-colors resize-none text-white placeholder:text-white/10 text-lg"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white/90 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Transmitting...' : 'Initiate Protocol'}
                  </button>
                </form>
              )}
          </div>
        </div>

        {/* Interactive Map */}
        <section className="mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 block">Global HQ</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-none">Operational Hub.</h2>
            </div>

            <div className="relative group border border-white/10 h-[600px] bg-[#050505] grayscale brightness-50 contrast-125 invert-[0.9] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13998.403565656565!2d77.2625!3d28.7058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb63897d9e87%3A0x6444444444444444!2sBhajanpura%2C%20Delhi%20110053!5e0!3m2!1sen!2sin!4v1714690000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              ></iframe>

              {/* HQ Marker */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none invert mix-blend-difference">
                <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
                        <MapPin className="text-black" size={24} />
                    </div>
                    <div className="mt-4 px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em]">HQ_BHAJANPURA</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
