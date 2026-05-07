"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, TrendingUp, Zap, Shield, Globe2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { useModals } from '@/context/ModalContext';
import Image from 'next/image';
import Link from 'next/link';

const ARTICLES = [
  {
    id: 1,
    title: "The 2026 Guide to Scalable User Acquisition",
    excerpt: "Break down the core strategies that drive massive user growth in the current mobile ecosystem while maintaining efficient CPAs.",
    category: "Strategy",
    readTime: "12 min",
    image: "/images/blog_ua_guide.png",
    icon: <Zap size={18} />,
    featured: true,
    slug: "fintech-cpa-mastery" // Redirecting to high-quality case study for now
  },
  {
    id: 2,
    title: "Mastering CPA: Pay Only for Performance",
    excerpt: "Learn how to optimize your offer funnel to ensure every conversion delivered is high-quality and verified.",
    category: "Performance",
    readTime: "8 min",
    image: "/images/blog_cpa_mastery.png",
    icon: <TrendingUp size={18} />,
    slug: "fintech-cpa-mastery"
  },
  {
    id: 3,
    title: "Fraud Prevention in Performance Marketing",
    excerpt: "How Adsgrind uses proprietary detection technology to ensure 100% human traffic and safeguard budgets.",
    category: "Ad-Tech",
    readTime: "10 min",
    image: "/images/blog_fraud_prevention.png",
    icon: <Shield size={18} />,
    slug: "gaming-fraud-prevention"
  },
  {
    id: 4,
    title: "Global Traffic Trends: Beyond Tier 1 Markets",
    excerpt: "Exploring the hyper-growth opportunities in India, SEA, and the Middle East for mobile app developers.",
    category: "Market Entry",
    readTime: "15 min",
    image: "/images/blog_global_traffic.png",
    icon: <Globe2 size={18} />,
    slug: "saas-global-expansion"
  }
];

export default function BlogPage() {
  const { openGetStarted } = useModals();
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const featured = ARTICLES.find(a => a.featured);
  const others = ARTICLES.filter(a => !a.featured);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      // Simulate/Call API
      setTimeout(() => {
        setIsSubscribed(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-black min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* ... existing hero and featured sections ... */}

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] inline-block mb-8">
              Intelligence Feed
            </span>
            <h1 className="font-display font-bold text-5xl md:text-8xl mb-10 uppercase text-white leading-none tracking-tight">
              Growth<br /><span className="text-white/40 font-light italic">Insights.</span>
            </h1>
            <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
              Data-backed strategies, technical guides, and industry updates from the Adsgrind performance engineering team.
            </p>
          </motion.div>
        </div>

        {/* Featured Article */}
        {featured && (
          <Link href={`/case-studies/${featured.slug}`}>
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-32 group cursor-pointer"
            >
            <div className="bg-surface-2 border border-white/5 rounded-[3rem] overflow-hidden hover:bg-surface-3 transition-all duration-700 relative">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                     <motion.div
                       whileHover={{ scale: 1.05, filter: 'brightness(1.15)' }}
                       transition={{ duration: 0.8, ease: "easeOut" }}
                       className="relative w-full h-full"
                     >
                       <Image 
                         src={featured.image} 
                         alt={featured.title} 
                         fill 
                         className="object-cover grayscale-[30%] md:grayscale group-hover:grayscale-0 transition-all duration-700" 
                       />
                     </motion.div>
                     <div className="absolute inset-0 bg-brand-orange/5 mix-blend-color group-hover:opacity-0 transition-opacity" />
                     {/* Glossy Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-10 lg:p-20 flex flex-col justify-center relative">
                     {/* Orange Glow on Hover */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-orange/5 blur-[100px] opacity-40 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                     
                     <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                           {featured.icon}
                        </div>
                        <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.4em]">{featured.category}</span>
                        <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                           <Clock size={12} /> {featured.readTime}
                        </div>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-none mb-8 group-hover:text-brand-orange transition-colors duration-500 relative z-10">
                        {featured.title}
                     </h2>
                     <p className="text-white/40 text-lg leading-relaxed mb-12 relative z-10">
                        {featured.excerpt}
                     </p>
                     <div className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs relative z-10">
                        Read Investigation <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                     </div>
                  </div>
               </div>
            </div>
          </motion.section>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-48">
           {others.map((article, idx) => (
             <Link href={`/case-studies/${article.slug}`} key={article.id} className="flex">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="group cursor-pointer bg-surface-2 border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-surface-3 transition-all duration-500 flex flex-col relative w-full"
             >
                <div className="relative aspect-[16/10] overflow-hidden">
                   <motion.div
                     whileHover={{ scale: 1.08, filter: 'brightness(1.2)' }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="relative w-full h-full"
                   >
                     <Image 
                       src={article.image} 
                       alt={article.title} 
                       fill 
                       className="object-cover grayscale-[30%] md:grayscale group-hover:grayscale-0 transition-all duration-700" 
                     />
                   </motion.div>
                   <div className="absolute inset-0 bg-brand-orange/5 mix-blend-color" />
                </div>
                <div className="p-8 flex flex-col flex-1 relative">
                   {/* Glow Effect */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-3xl opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                         <div className="text-brand-orange">{article.icon}</div>
                         <span className="text-brand-orange text-[10px] font-bold uppercase tracking-widest">{article.category}</span>
                      </div>
                      <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{article.readTime}</div>
                   </div>
                   <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-6 group-hover:text-brand-orange transition-colors relative z-10">
                     {article.title}
                   </h3>
                   <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1 relative z-10">
                     {article.excerpt}
                   </p>
                   <div className="pt-6 border-t border-white/5 flex items-center justify-between group/more relative z-10">
                      <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Case Study</span>
                      <ArrowRight size={16} className="text-white/20 group-hover/more:text-brand-orange group-hover/more:translate-x-2 transition-all" />
                   </div>
                </div>
             </motion.div>
             </Link>
           ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="bg-surface-2 border border-white/5 px-6 py-16 sm:p-20 md:p-32 rounded-[3rem] text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="relative z-10 max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  {!isSubscribed ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.5em] mb-12 block">Stay Integrated</span>
                      <h2 className="text-[1.85rem] sm:text-5xl md:text-7xl font-black mb-10 uppercase text-white tracking-tight leading-[1.1] md:leading-[0.9] max-w-[15ch] md:max-w-none mx-auto">
                        Stay <br className="md:hidden" />
                        ahead of <br className="md:hidden" />
                        <span className="text-white/20 italic lowercase tracking-normal md:tracking-tighter mr-2">the</span>
                        performance <br className="md:hidden" />
                        curve.
                      </h2>
                      <p className="text-white/50 text-xs sm:text-base md:text-lg mb-12 max-w-sm sm:max-w-lg mx-auto leading-relaxed">Get exclusive performance engineering insights delivered to your inbox once a month.</p>
                      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-5 max-w-md mx-auto mt-8">
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange outline-none transition-all text-sm"
                        />
                        <button 
                          disabled={isSubmitting}
                          className="px-10 py-4 bg-brand-orange text-black text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-brand-orange-light shadow-orange-glow transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? 'Joining...' : 'Join Insights'}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-10">
                        <CheckCircle2 size={32} />
                      </div>
                      <h2 className="text-5xl md:text-7xl font-bold mb-6 uppercase text-white tracking-tight">You're In.</h2>
                      <p className="text-white/50 text-lg mb-10">Thanks for subscribing to Adsgrind Insights.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left w-full max-w-md mx-auto">
                        {[
                          "Performance trends",
                          "App growth strategies",
                          "Campaign intelligence",
                          "Scaling insights"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-widest">
                            <div className="w-1 h-1 rounded-full bg-brand-orange" />
                            {item}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => setIsSubscribed(false)}
                        className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-black transition-all"
                      >
                        Back to Website
                      </button>

                      {/* Success Ambient Glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/20 blur-[100px] rounded-full pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
        </div>
      </div>
    </main>
  );
}
