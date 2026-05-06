"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn, Counter } from './index';

interface GrowthIndexProps {
  className?: string;
}

export const GrowthIndex = ({ className }: GrowthIndexProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={cn(
        "relative bg-[#000000] border border-white/10 overflow-hidden group w-full flex flex-col h-[400px]",
        className
      )}
    >
      {/* 1. HEADER */}
      <div className="relative z-20 p-10 pb-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Protocol Verification</span>
        </div>
        <h3 className="text-3xl font-bold text-white uppercase tracking-tight leading-none">Market Intelligence.</h3>
      </div>

      {/* 2. CHART AREA (Bars + Line) */}
      <div className="absolute inset-0 z-0 top-32 flex items-end px-10 pb-32 gap-1 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
        {mounted && [...Array(40)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${20 + Math.random() * 80}%` }}
                transition={{ delay: i * 0.02, duration: 1 }}
                className="flex-1 bg-white/20"
            />
        ))}
      </div>


      {/* 3. METRICS SECTION */}
      <div className="mt-auto relative z-20 bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="p-10 flex flex-col sm:flex-row items-end justify-between gap-8">
          <div className="flex items-center gap-16">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Scale Index</span>
              <span className="text-5xl font-bold text-white tracking-tighter">
                <Counter value={124.8} decimals={1} prefix="+" suffix="%" />
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Target Multiplier</span>
              <span className="text-5xl font-bold text-white tracking-tighter">
                <Counter value={4.8} decimals={1} suffix="×" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-white/20 px-6 py-3">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Operational_Node</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
