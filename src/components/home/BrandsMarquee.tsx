"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const brands = [
  { name: 'Albert', logo: '/images/albert.jpeg' },
  { name: 'Betterment', logo: '/images/betterment.jpeg' },
  { name: 'FloatMe', logo: '/images/floatme.jpeg' },
  { name: 'Remitly', logo: '/images/remitly.jpeg' },
  { name: 'Sendwave', logo: '/images/sendwave.jpeg' },
  { name: 'Super.com', logo: '/images/super.com.jpeg' },
];

const BrandLogo = ({ brand }: { brand: typeof brands[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 px-8 md:px-16 flex flex-col items-center justify-center cursor-pointer group will-change-transform"
    >
      <div className="relative w-24 h-8 md:w-32 md:h-10 flex items-center justify-center">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes="(max-width: 768px) 96px, 128px"
          className={cn(
            "object-contain transition-all duration-700 ease-out",
            isHovered 
              ? "grayscale-0 opacity-100 scale-105 brightness-110" 
              : "grayscale opacity-30 scale-100 brightness-90"
          )}
          priority
        />
        
        {/* Subtle orange glow on hover */}
        <div 
          className={cn(
            "absolute -inset-10 bg-brand-orange/10 blur-3xl rounded-full -z-10 transition-opacity duration-700",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="mt-5 h-4 flex items-center justify-center">
        <span 
          className={cn(
            "text-[8px] md:text-[9px] font-medium text-white/40 uppercase tracking-[0.4em] whitespace-nowrap transition-all duration-700",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          {brand.name}
        </span>
      </div>
    </div>
  );
};

export const BrandsMarquee = () => {
  // Use a doubled array for the groups to ensure they are wider than any screen
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="bg-black relative overflow-hidden border-y border-white/5 py-24 md:py-36">
      {/* Background Polish - Minimal top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-6 mb-16 md:mb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="text-brand-orange/60 text-[9px] font-bold uppercase tracking-[0.6em] mb-4 block">
            Institutional Trust
          </span>
          <h2 className="text-xl md:text-2xl font-light text-white/90 uppercase tracking-[0.15em] leading-tight max-w-2xl mx-auto">
            Powering Global App <span className="text-white/20 italic font-serif">Growth Entities</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden flex items-center pause-on-hover">
        {/* Side Fades for Premium Depth */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-80 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <div className="flex animate-marquee will-change-transform">
          {/* First Group */}
          <div className="flex flex-nowrap items-center">
            {marqueeBrands.map((brand, idx) => (
              <BrandLogo key={`brand-1-${idx}`} brand={brand} />
            ))}
          </div>
          {/* Second Group (Identical for seamless loop) */}
          <div className="flex flex-nowrap items-center">
            {marqueeBrands.map((brand, idx) => (
              <BrandLogo key={`brand-2-${idx}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Floor Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/10 to-transparent" />
    </section>
  );
};
