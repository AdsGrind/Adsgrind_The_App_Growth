"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] overflow-hidden">
      
      {/* 1. BACKGROUND LAYER (z-0) - Aerospace / Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Cinematic Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.04] blur-[140px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Aerospace Grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />

        {/* Particles */}
        <div className="absolute inset-0">
          {mounted && [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full opacity-[0.12]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. CONTENT LAYER (z-10) - Brand & Identity */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 mb-5 flex-shrink-0 rounded-full overflow-hidden"
        >
          <img 
            src="/logo/2ccbcd53-e176-41fc-b3cb-70c3f0620511.jpg" 
            alt="ADSGRIND"
            className="w-full h-full object-contain grayscale brightness-[2.5] contrast-[1.5] mix-blend-screen rounded-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))' }}
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-display font-bold text-2xl sm:text-4xl tracking-[0.3em] text-white uppercase mb-[10px]"
        >
          ADSGRIND
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[10px] sm:text-[11px] font-bold tracking-[0.4em] text-[#888888] uppercase mb-5"
        >
          THE APP GROWTH
        </motion.p>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="text-[9px] font-bold text-white uppercase tracking-[0.8em] mt-[10px] mb-10"
        >
          Initializing Adsgrind System
        </motion.div>

        {/* 3. UI LAYER (z-20) - Progress Indicator */}
        <div className="z-20 flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-white/40"
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      </div>
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
