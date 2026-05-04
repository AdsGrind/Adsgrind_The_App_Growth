"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GrowthIndexProps {
  className?: string;
}

export const GrowthIndex = ({ className }: GrowthIndexProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-[2rem] bg-[#050505] border border-white/10 shadow-2xl overflow-hidden group w-full flex flex-col h-[320px] sm:h-[400px]",
        className
      )}
    >
      {/* 1. HEADER */}
      <div className="relative z-20 p-6 sm:p-8 pb-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(238,29,35,0.8)]" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Growth Intelligence</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white uppercase italic tracking-tight opacity-90">Growth Index</h3>
        <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mt-4" />
      </div>

      {/* 2. CHART AREA */}
      <div className="absolute inset-0 z-0 top-12">
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" preserveAspectRatio="none">
          {/* Subtle Grid Lines */}
          {[50, 100, 150].map((y) => (
            <line 
              key={y} 
              x1="0" y1={y} x2="400" y2={y} 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="1" 
            />
          ))}
          
          {/* Area Fill Gradient */}
          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            d="M0,180 C50,170 80,150 120,130 C160,110 200,140 250,90 C300,40 350,60 400,20 V200 H0 Z"
            fill="url(#growth-area-gradient)"
          />
          
          {/* Main Growth Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            d="M0,180 C50,170 80,150 120,130 C160,110 200,140 250,90 C300,40 350,60 400,20"
            fill="none"
            stroke="url(#growth-line-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glowing Endpoint Dot */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            cx="400" cy="20" r="4"
            fill="#EE1D23"
            className="drop-shadow-[0_0_10px_rgba(238,29,35,0.8)]"
          />
          
          <defs>
            <linearGradient id="growth-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EE1D23" />
              <stop offset="100%" stopColor="#FF5800" />
            </linearGradient>
            <linearGradient id="growth-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EE1D23" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EE1D23" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. METRICS SECTION */}
      <div className="mt-auto relative z-10">
        {/* Soft bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none" />
        
        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
          <div className="flex items-center gap-8 sm:gap-12">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Q1 Performance</span>
              <span className="text-3xl sm:text-4xl font-black text-white leading-none tracking-tight">+124%</span>
            </div>
            
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target ROI</span>
              <span className="text-3xl sm:text-4xl font-black text-brand-success leading-none tracking-tight">4.8x</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">System Status</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-success shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[11px] font-bold text-brand-success uppercase tracking-wider">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
