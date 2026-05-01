"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';

const POSTS = [
  {
    id: 1,
    title: "The 2026 Guide to Scalable User Acquisition",
    excerpt: "Break down the core strategies that drive massive user growth in the current mobile ecosystem while maintaining efficient CPAs.",
    date: "April 15, 2026",
    author: "Growth Expert",
    category: "UA Strategy",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a5f97b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Mastering CPA: Pay Only for Performance",
    excerpt: "Learn how to optimize your offer funnel to ensure every conversion delivered is high-quality and verified.",
    date: "April 12, 2026",
    author: "Lead Strategist",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Global Traffic Trends: Beyond Tier 1 Markets",
    excerpt: "Exploring the hyper-growth opportunities in India, SEA, and the Middle East for mobile app developers.",
    date: "April 10, 2026",
    author: "Global Markets",
    category: "Market Entry",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Fraud Prevention in Performance Marketing",
    excerpt: "How Adsgrind uses proprietary detection technology to ensure 100% human traffic and safeguard advertiser budgets.",
    date: "April 08, 2026",
    author: "Technical Team",
    category: "Ad-Tech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-purple mb-4 block">Industry Intelligence</span>
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-8 uppercase italic text-white leading-tight">
                Performance <br /><span className="text-gradient">Insights</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
                The latest trends, technical guides, and growth strategies from the Adsgrind performance engineering team.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <GlassCard className="p-0 overflow-hidden border-white/5 group-hover:border-brand-purple/50 transition-all duration-500 bg-white/[0.02]">
                <div className="flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-brand-purple tracking-widest uppercase">
                            <Tag size={12} /> {post.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/10"></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white uppercase italic group-hover:text-brand-purple transition-colors leading-tight">
                        {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
                                <User size={14} className="text-brand-purple" />
                            </div>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-purple font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Read Now <ArrowRight size={14} />
                        </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
            <Button variant="outline" size="lg" className="px-12 border-white/10 text-white hover:border-brand-purple/50">Load More Articles</Button>
        </div>
      </div>
    </div>
  );
}
