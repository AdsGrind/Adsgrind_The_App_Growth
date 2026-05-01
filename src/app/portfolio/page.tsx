"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight } from 'lucide-react';
import { GlassCard, Button } from '@/components/ui';

const PROJECTS = [
  {
    id: 1,
    title: "Fintech CPA Hero",
    category: "CPA Campaign",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "Scaled a US-based Fintech app's user base with a focus on high-LTV verified actions, achieving 38k+ conversions in 30 days.",
    result: "38K+ Conversions",
  },
  {
    id: 2,
    title: "Eco-Retail Growth",
    category: "CPI Scale",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    description: "Multi-channel app install campaign across SEA market, reducing eCPI by 35% while increasing retention by 20%.",
    result: "35% Lower eCPI",
  },
  {
    id: 3,
    title: "Global Game Launch",
    category: "CPE Strategy",
    image: "https://images.unsplash.com/photo-1552824236-0736c8430a6c?auto=format&fit=crop&q=80&w=800",
    description: "Engineered a Cost-Per-Engagement strategy for a AAA mobile title, driving 500k+ level completions within the first week.",
    result: "500K Engagement",
  },
  {
    id: 4,
    title: "SaaS Market Entry",
    category: "Direct UA",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Strategic European market entry for a B2B productivity app, achieving a 5x Return on Ad Spend (ROAS) through premium OEM traffic.",
    result: "5x ROAS",
  }
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
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
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
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
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="object-cover w-full h-full"
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
