"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Albert', logo: '/images/albert.jpeg' },
  { name: 'Betterment', logo: '/images/betterment.jpeg' },
  { name: 'FloatMe', logo: '/images/floatme.jpeg' },
  { name: 'Remitly', logo: '/images/remitly.jpeg' },
  { name: 'Sendwave', logo: '/images/sendwave.jpeg' },
  { name: 'Super.com', logo: '/images/super.com.jpeg' },
];

export const BrandsMarquee = () => {
  return (
    <section className="py-12 md:py-20 bg-[#030303] relative overflow-hidden">
      {/* Background Subtle Noise/Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="container mx-auto px-6 mb-10 text-center relative z-10">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-3 block opacity-60">Trusted by Global Leaders</span>
      </div>

      <div className="relative z-10 w-full group">
        {/* Infinite Scrolling Row */}
        <div className="flex overflow-hidden relative">
            <motion.div
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40,
                        ease: "linear",
                    },
                }}
                className="flex flex-nowrap gap-10 md:gap-16 py-10 px-6 items-center"
            >
                {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
                <motion.div
                    key={`${brand.name}-${idx}`}
                    whileHover={{ 
                        y: -4, 
                        scale: 1.05,
                        transition: { duration: 0.35, ease: [0.25, 1, 0.3, 1] }
                    }}
                    className="flex-shrink-0 relative group/brand"
                >
                    {/* Glow Layer */}
                    <div className="absolute -inset-4 bg-white/5 rounded-[20px] blur-2xl opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative flex flex-col items-center group/brand">
                        <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl px-5 py-4 md:px-9 md:py-7 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.03)] transition-all duration-500 group-hover/brand:bg-white/[0.06] group-hover/brand:border-white/[0.15] group-hover/brand:translate-y-[-4px] overflow-hidden min-w-[140px] md:min-w-[200px]">
                            {/* Logo - Full Visibility Always */}
                            <div className="relative h-6 w-16 md:h-10 md:w-32 flex items-center justify-center transition-all duration-500">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    sizes="(max-width: 768px) 60px, 120px"
                                    className="object-contain transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Glossy Brand Name - Below Box Reveal */}
                        <div className="mt-4 opacity-0 group-hover/brand:opacity-100 translate-y-2 group-hover/brand:translate-y-0 transition-all duration-500 text-center">
                            <span 
                                className="text-[10px] font-bold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/60 animate-shine"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #eaeaea 30%, #ffffff 60%, #cccccc 100%)',
                                    backgroundSize: '200% auto',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 0 10px rgba(255,255,255,0.2)'
                                }}
                            >
                                {brand.name}
                            </span>
                        </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>
        </div>

        {/* Side Fades for Scroll Hint */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
};
