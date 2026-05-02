"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';

import { FintechStrategyModal } from '@/components/portfolio/FintechStrategyModal';
import { EcoRetailFrameworkModal } from '@/components/portfolio/EcoRetailFrameworkModal';
import { GamingEngagementModal } from '@/components/portfolio/GamingEngagementModal';
import { SaaSStrategyModal } from '@/components/portfolio/SaaSStrategyModal';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  result: string;
}

const PROJECTS: Project[] = [];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isFintechModalOpen, setIsFintechModalOpen] = useState(false);
  const [isEcoModalOpen, setIsEcoModalOpen] = useState(false);
  const [isGamingModalOpen, setIsGamingModalOpen] = useState(false);
  const [isSaaSModalOpen, setIsSaaSModalOpen] = useState(false);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <FintechStrategyModal 
        isOpen={isFintechModalOpen} 
        onClose={() => setIsFintechModalOpen(false)} 
      />
      <EcoRetailFrameworkModal
        isOpen={isEcoModalOpen}
        onClose={() => setIsEcoModalOpen(false)}
      />
      <GamingEngagementModal
        isOpen={isGamingModalOpen}
        onClose={() => setIsGamingModalOpen(false)}
      />
      <SaaSStrategyModal
        isOpen={isSaaSModalOpen}
        onClose={() => setIsSaaSModalOpen(false)}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <span className="py-1 px-4 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold uppercase tracking-widest text-brand-orange">Evidence of Impact</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-5xl md:text-7xl mb-6 uppercase italic text-white"
          >
            Performance <span className="text-gradient">Case Studies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Explosive growth for world-class mobile apps. Explore our data-driven success stories across Fintech, Gaming, and E-commerce.
          </motion.p>
        </div>

        {/* Featured Case Study 1: Fintech */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em]">
                Featured Case Study
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase italic leading-tight">
                  CPA Campaign <br />
                  <span className="text-gradient">Fintech CPA Hero</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                  Scaled a US-based Fintech app's user base with a focus on high-LTV verified actions, achieving 38k+ conversions in 30 days.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Key Impact</div>
                  <div className="text-2xl font-bold text-white italic">38K+ Conversions</div>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Scale Velocity</div>
                  <div className="text-2xl font-bold text-brand-success italic">Aggressive</div>
                </GlassCard>
              </div>

              <Button 
                variant="liquid" 
                size="lg" 
                className="px-10 group w-full sm:w-auto"
                onClick={() => setIsFintechModalOpen(true)}
              >
                View Detailed Strategy <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group order-first lg:order-last"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_30px_80px_rgba(120,180,255,0.25)] group-hover:border-white/20 aspect-video">
                <Image 
                  src="/images/fintech-cpa-hero.png" 
                  alt="Fintech CPA Hero Case Study"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
              
              {/* Decorative Glows */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/20 blur-[80px] -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Featured Case Study 2: Eco-Retail */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image (Alternated) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_30px_80px_rgba(34,197,94,0.25)] group-hover:border-white/20 aspect-video">
                <Image 
                  src="/images/eco-retail-growth.png" 
                  alt="Eco-Retail Growth Case Study"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-success/20 blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/20 blur-[80px] -z-10"></div>
            </motion.div>

            {/* Right Side: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-success/10 border border-brand-success/20 text-[10px] font-bold text-brand-success uppercase tracking-[0.2em]">
                Scaling Strategy
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase italic leading-tight">
                  CPI Scale <br />
                  <span className="text-gradient">Eco-Retail Growth</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                  Multi-channel app install campaign across SEA market, reducing eCPI by 35% while increasing retention by 20%.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Cost Efficiency</div>
                  <div className="text-2xl font-bold text-brand-success italic">35% Lower eCPI</div>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">User Quality</div>
                  <div className="text-2xl font-bold text-white italic">20% Higher Retention</div>
                </GlassCard>
              </div>

              <Button 
                variant="liquid" 
                size="lg" 
                className="px-10 group w-full sm:w-auto"
                onClick={() => setIsEcoModalOpen(true)}
              >
                Explore Scale Framework <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Featured Case Study 3: Global Game Launch */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em]">
                CPE Engineering
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase italic leading-tight">
                  Global Game <br />
                  <span className="text-gradient">Launch CPE</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                  Engineered a Cost-Per-Engagement strategy for a AAA mobile title, driving 500k+ level completions within the first week.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Total Engagement</div>
                  <div className="text-2xl font-bold text-white italic">500K+ Completions</div>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Launch Velocity</div>
                  <div className="text-2xl font-bold text-brand-orange italic">Explosive</div>
                </GlassCard>
              </div>

              <Button 
                variant="liquid" 
                size="lg" 
                className="px-10 group w-full sm:w-auto"
                onClick={() => setIsGamingModalOpen(true)}
              >
                View Engagement System <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group order-first lg:order-last"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_30px_80px_rgba(168,85,247,0.25)] group-hover:border-white/20 aspect-video">
                <Image 
                  src="/images/global-game-launch.png" 
                  alt="Global Game Launch Case Study"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/20 blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/20 blur-[80px] -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Featured Case Study 4: SaaS Market Entry */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image (Alternated) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_30px_80px_rgba(59,130,246,0.25)] group-hover:border-white/20 aspect-video">
                <Image 
                  src="/images/saas-market-entry.png" 
                  alt="SaaS Market Entry Case Study"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-primary/20 blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-success/20 blur-[80px] -z-10"></div>
            </motion.div>

            {/* Right Side: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">
                Direct UA Growth
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white uppercase italic leading-tight">
                  SaaS Market <br />
                  <span className="text-gradient">Entry Strategy</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                  Strategic European market entry for a B2B productivity app, achieving a 5x Return on Ad Spend (ROAS) through premium OEM traffic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Performance</div>
                  <div className="text-2xl font-bold text-brand-primary italic">5x ROAS</div>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 bg-white/[0.04] backdrop-blur-[10px] rounded-[14px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Scale Reach</div>
                  <div className="text-2xl font-bold text-white italic">Premium OEM</div>
                </GlassCard>
              </div>

              <Button 
                variant="liquid" 
                size="lg" 
                className="px-10 group w-full sm:w-auto"
                onClick={() => setIsSaaSModalOpen(true)}
              >
                View Entry Strategy <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {PROJECTS.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <GlassCard className="p-0 overflow-hidden border-white/5 group-hover:border-brand-orange/50 transition-all duration-500 bg-white/[0.02]">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4 py-1.5 px-4 bg-brand-orange rounded-full text-[10px] uppercase font-bold shadow-2xl">
                      {project.result}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-3">{project.category}</div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-between text-white uppercase italic">
                      {project.title} <ArrowRight size={20} className="text-white/20 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-card p-0 overflow-hidden rounded-[2.5rem] border-white/10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-brand-red transition-colors border border-white/10 text-white"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto h-full min-h-[400px]">
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center bg-[#0a0a0a]">
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4">{selectedProject.category}</div>
                  <h2 className="text-4xl font-bold mb-6 text-white uppercase italic leading-tight">{selectedProject.title}</h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Key Impact</div>
                      <div className="text-xl font-bold text-white italic">{selectedProject.result}</div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Scale Velocity</div>
                      <div className="text-xl font-bold text-white italic">Aggressive</div>
                    </div>
                  </div>

                  <Button variant="liquid" className="w-full py-5 text-lg gap-2">
                    Request Strategy Audit <ExternalLink size={18} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
