"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';

const TEAM = [
  { name: "Alex Rivera", role: "Founder & CEO", image: "https://i.pravatar.cc/150?u=alex" },
  { name: "Jessica Bloom", role: "Head of Strategy", image: "https://i.pravatar.cc/150?u=jessica" },
  { name: "David Chen", role: "SEO Director", image: "https://i.pravatar.cc/150?u=david" },
  { name: "Sarah Miller", role: "Creative Lead", image: "https://i.pravatar.cc/150?u=sarah" },
];

const VALUES = [
  { title: "Integrity", icon: <ShieldCheck className="text-brand-accent-start" />, desc: "We believe in transparent, honest partnerships with our clients." },
  { title: "Innovation", icon: <Eye className="text-brand-accent-start" />, desc: "We stay ahead of the curve, utilizing AI and cutting-edge tech." },
  { title: "Impact", icon: <Target className="text-brand-accent-start" />, desc: "Results matter. We drive growth that you can see and measure." },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="py-1 px-4 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-bold uppercase tracking-widest text-brand-red animate-pulse">Our DNA</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl mb-10 leading-tight text-white uppercase italic"
          >
            Scaling the <br />
            <span className="text-gradient">Mobile Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl leading-relaxed"
          >
            Adsgrind is a high-performance user acquisition company dedicated to bridging the gap between premium advertisers and high-performing publishers. We leverage proprietary technology to drive measurable, scalable, and sustainable growth for the world's most ambitious mobile apps.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <GlassCard className="h-full p-12 overflow-hidden relative group border-brand-red/10 hover:border-brand-red/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-red/10 blur-[60px]"></div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                    <Target className="text-brand-red" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-6 uppercase italic text-white">Our Mission</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    To empower advertisers and publishers by providing a transparent, performance-driven marketplace that maximizes ROI and global reach through technical excellence and strategic innovation.
                </p>
             </GlassCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <GlassCard className="h-full p-12 overflow-hidden relative group border-brand-orange/10 hover:border-brand-orange/30 transition-all duration-500">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[60px]"></div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                    <Eye className="text-brand-orange" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-6 uppercase italic text-white">Our Vision</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    To redefine user acquisition for the next billion smartphone users, becoming the most trusted global partner for mobile growth through scalable architectures and human-centric expertise.
                </p>
             </GlassCard>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-32 text-center">
            <h2 className="text-4xl font-bold mb-16 uppercase italic text-white">The Adsgrind Standard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((v, i) => (
                    <motion.div 
                        key={v.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center group"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-brand-purple/20 group-hover:border-brand-purple/50 transition-all">
                            <div className="text-brand-purple">
                                {v.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wider">{v.title}</h3>
                        <p className="text-slate-500 max-w-xs">{v.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Milestones / Timeline */}
        <div className="mb-32">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold mb-4 uppercase italic text-white">Our Journey</h2>
                <p className="text-slate-500">Milestones that define our commitment to performance.</p>
            </div>
            <div className="relative border-l border-white/10 ml-8 md:ml-0 md:flex md:border-l-0 md:border-t md:justify-between items-start gap-8 max-w-5xl mx-auto">
                {[
                    { year: "2021", event: "Founded with a mission to simplify UA." },
                    { year: "2022", event: "Reached 10M+ users across global markets." },
                    { year: "2023", event: "Launched proprietary fraud protection AI." },
                    { year: "2024", event: "Expanded to 50+ premium publisher partners." }
                ].map((m, i) => (
                    <div key={i} className="relative pl-8 md:pl-0 md:pt-8 mb-12 md:mb-0">
                        <div className="absolute left-[-5px] md:top-[-5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_10px_rgba(238,29,35,0.8)]"></div>
                        <div className="text-2xl font-black text-brand-red mb-2 italic tracking-tighter">{m.year}</div>
                        <p className="text-sm text-slate-500 max-w-[150px]">{m.event}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Global Reach CTA */}
        <GlassCard className="p-16 text-center border-brand-red/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-red/5 blur-[100px] rounded-full -z-10 translate-y-1/2"></div>
             <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase italic text-white">Ready to Join the Growth Revolution?</h2>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="liquid" size="lg" className="px-12">Become a Partner</Button>
                <Button variant="outline" size="lg" className="px-12">Contact Our Experts</Button>
             </div>
        </GlassCard>
      </div>
    </div>
  );
}
